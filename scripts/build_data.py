#!/usr/bin/env python3
"""Build cleaned + aggregated datasets for the Canada Fraud Dashboard.

Reads:  raw/cafc.csv (CAFC open data, extracted 2025-10-01)
Writes: public/data/*.json + public/data/downloads/*.csv
Rules live in the methodology page; every cleaning rule is recorded here.
"""
import csv, json, re, os
from collections import Counter, defaultdict

RAW = os.path.join(os.path.dirname(__file__), '..', 'raw', 'cafc.csv')
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'data')
os.makedirs(OUT, exist_ok=True)
os.makedirs(os.path.join(OUT, 'downloads'), exist_ok=True)

# StatCan quarterly population estimates, July 1 2026, table 17-10-0009-01
# (quarterly release, cited in the methodology page)
POPULATION = {
    'Ontario': 16262121, 'Quebec': 9067114, 'British Columbia': 5710598,
    'Alberta': 5101050, 'Manitoba': 1517379, 'Saskatchewan': 1278402,
    'Nova Scotia': 1103419, 'New Brunswick': 883522,
    'Newfoundland and Labrador': 552462, 'Prince Edward Island': 182989,
    'Yukon': 50356, 'Northwest Territories': 45904, 'Nunavut': 43091,
}

PROV_CANON = {
    'North West Territories': 'Northwest Territories',
    'Newfoundland And Labrador': 'Newfoundland and Labrador',
}

US_STATES = {'California','New York','Florida','Texas','Washington','Massachusetts',
             'Pennsylvania','Colorado','Illinois','Oregon','Georgia','Arizona','Ohio',
             'Virginia','Nevada','New Jersey','North Carolina','Maryland','Michigan',
             'Missouri','Minnesota','Indiana','Wisconsin','Connecticut','Oklahoma',
             'Tennessee','Kansas','Iowa','Arkansas','Kentucky','Louisiana','Alabama',
             'South Carolina','Utah','Hawaii','Delaware','Idaho','Montana','Maine',
             'Vermont','Wyoming','North Dakota','South Dakota','Alaska','Rhode Island',
             'New Mexico','Mississippi','Nebraska','West Virginia','Puerto Rico',
             'District Of Columbia','Guam','Us Virgin Islands','Northern Mariana Islands',
             'New Hampshire'}

LOSS_RE = re.compile(r'^\$?([\d,]+(?:\.\d{1,2})?)$')

def parse_loss(v):
    v = (v or '').strip()
    if v == '':
        return ('quarantine', 'blank')
    m = LOSS_RE.match(v)
    if not m:
        return ('quarantine', v)
    num = float(m.group(1).replace(',', ''))
    if num < 0:
        return ('quarantine', v)
    return ('ok', num)

def clean_age(v):
    # Raw age band carries a leading Excel quote: "'30 - 39".
    v = (v or '').strip().lstrip("'").strip()
    v = v.replace('non disponible', 'Not Available')
    if v == 'Not Available / Not Available':
        return 'Not Available'
    if v == 'Deceased / Décédé':
        return 'Deceased'
    if v == 'Business / Entreprise':
        return 'Business'
    return v

rows = []
quarantine = Counter()

with open(RAW, encoding='utf-8-sig') as f:
    r = csv.DictReader(f)
    for row in r:
        kind, loss = parse_loss(row['Dollar Loss /pertes financières'])
        if kind == 'quarantine':
            quarantine[f'loss:{loss}'] += 1
            continue
        cat = (row['Fraud and Cybercrime Thematic Categories'] or '').strip()
        if not cat:
            quarantine['category:blank'] += 1
            continue
        prov_raw = (row['Province/State'] or '').strip()
        prov = PROV_CANON.get(prov_raw, prov_raw)
        loc = 'canada'
        if prov == 'Not Specified' or not prov:
            loc = 'unspecified'
        elif prov in US_STATES:
            loc = 'us-state'
        elif prov not in POPULATION:
            loc = 'other'
            quarantine[f'province:{prov}'] += 1
        d = (row['Date Received / Date reçue'] or '').strip()[:10]
        q = d[:4] + '-Q' + str((int(d[5:7]) - 1) // 3 + 1) if len(d) >= 7 else 'unknown'
        rows.append({
            'loss': loss,
            'cat': cat,
            'age': clean_age(row["Victim Age Range / Tranche d'âge des victimes"]),
            'prov': prov, 'loc': loc,
            'ct': (row['Complaint Type'] or '').strip(),
            'meth': (row['Solicitation Method'] or '').strip(),
            'q': q,
            'country': (row['Country'] or '').strip(),
        })

n_rows = len(rows)
total_loss = sum(x['loss'] for x in rows)
victim_loss = sum(x['loss'] for x in rows if x['ct'] == 'Victim')

cat_loss = Counter(); cat_rep = Counter(); cat_vic = Counter()
for x in rows:
    cat_loss[x['cat']] += x['loss']; cat_rep[x['cat']] += 1
    if x['ct'] == 'Victim' and x['loss'] > 0:
        cat_vic[x['cat']] += 1

categories = []
for c, l in cat_loss.most_common():
    categories.append({
        'category': c,
        'loss': round(l, 2),
        'reports': cat_rep[c],
        'victim_reports_with_loss': cat_vic[c],
        'avg_loss_per_victim': round(l / cat_vic[c], 2) if cat_vic[c] else 0,
        'share': round(100 * l / total_loss, 2),
    })

age_order = ['20 - 29', '30 - 39', '40 - 49', '50 - 59', '60 - 69',
             '70 - 79', '80 - 89', '10 - 19', '90 - 99']
top12 = [c['category'] for c in categories[:12]]
heatmap = []
for age in age_order:
    cells = {c: round(sum(x['loss'] for x in rows if x['age'] == age and x['cat'] == c), 2)
             for c in top12}
    band_total = sum(x['loss'] for x in rows if x['age'] == age)
    band_rep = sum(1 for x in rows if x['age'] == age and x['loss'] > 0)
    heatmap.append({
        'age': age,
        'cells': cells,
        'band_total': round(band_total, 2),
        'band_avg_per_report_with_loss': round(band_total / band_rep, 2) if band_rep else 0,
    })

provinces = []
for prov, pop in POPULATION.items():
    loss = sum(x['loss'] for x in rows if x['prov'] == prov)
    rep = sum(1 for x in rows if x['prov'] == prov)
    provinces.append({
        'province': prov,
        'loss': round(loss, 2),
        'reports': rep,
        'population': pop,
        'loss_per_capita': round(loss / pop, 2),
        'unstable': rep < 1000,
    })
provinces.sort(key=lambda p: p['loss_per_capita'], reverse=True)

qset = sorted({x['q'] for x in rows if x['q'] != 'unknown'})
trends = [{'quarter': q,
           'total': round(sum(x['loss'] for x in rows if x['q'] == q), 2),
           'by_category': {c: round(sum(x['loss'] for x in rows if x['q'] == q and x['cat'] == c), 2)
                           for c in top12}}
          for q in qset]

meth_loss = Counter(); meth_rep = Counter()
for x in rows:
    meth_loss[x['meth']] += x['loss']; meth_rep[x['meth']] += 1
methods = [{'method': m, 'loss': round(l, 2), 'reports': meth_rep[m]}
           for m, l in meth_loss.most_common()]

meta = {
    'title': 'Canadian Anti-Fraud Centre Fraud Reporting System Dataset',
    'publisher': 'Royal Canadian Mounted Police, Canadian Anti-Fraud Centre',
    'source_url': 'https://open.canada.ca/data/en/dataset/6a09c998-cddb-4a22-beff-4dca67ab892f',
    'period': '2021-01-01 to 2025-09-30 (extracted 2025-10-01)',
    'retrieved': '2026-10-10',
    'raw_rows': 350361,
    'kept_rows': n_rows,
    'total_loss': round(total_loss, 2),
    'victim_row_share_of_loss': round(100 * victim_loss / total_loss, 2),
    'quarantine': dict(quarantine),
    'quarantine_rows': sum(quarantine.values()),
    'honest_limits': [
        '37.7% of reported losses carry no victim age.',
        '19.9% of reported losses carry no province.',
        'Geographic grain is province only. No city or postal-code view is possible from this data.',
        'All reported losses come from Victim rows. Attempt rows carry $0 in this extract.',
        'Losses are reported losses, not independently verified amounts.',
    ],
}

def w(name, obj):
    with open(os.path.join(OUT, name), 'w') as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)

w('meta.json', meta)
w('category_ranking.json', categories)
w('age_heatmap.json', heatmap)
w('province_ranking.json', provinces)
w('trends.json', trends)
w('methods.json', methods)

with open(os.path.join(OUT, 'downloads', 'scam-type-ranking.csv'), 'w', newline='') as f:
    wtr = csv.writer(f)
    wtr.writerow(['scam_type', 'total_loss_cad', 'reports', 'victim_reports_with_loss',
                  'avg_loss_per_victim_cad', 'share_of_total_loss_pct'])
    for c in categories:
        wtr.writerow([c['category'], c['loss'], c['reports'], c['victim_reports_with_loss'],
                      c['avg_loss_per_victim'], c['share']])

with open(os.path.join(OUT, 'downloads', 'province-per-capita.csv'), 'w', newline='') as f:
    wtr = csv.writer(f)
    wtr.writerow(['province', 'total_loss_cad', 'reports', 'population_2026',
                  'loss_per_capita_cad', 'small_sample'])
    for p in provinces:
        wtr.writerow([p['province'], p['loss'], p['reports'], p['population'],
                      p['loss_per_capita'], p['unstable']])

with open(os.path.join(OUT, 'downloads', 'quarterly-trends.csv'), 'w', newline='') as f:
    wtr = csv.writer(f)
    wtr.writerow(['quarter', 'total_loss_cad'] + top12)
    for t in trends:
        wtr.writerow([t['quarter'], t['total']] + [t['by_category'][c] for c in top12])

with open(os.path.join(OUT, 'downloads', 'age-band-by-scam-type.csv'), 'w', newline='') as f:
    wtr = csv.writer(f)
    wtr.writerow(['age_band'] + top12)
    for h in heatmap:
        wtr.writerow([h['age']] + [h['cells'][c] for c in top12])

print('rows kept:', n_rows, '| total loss: $%.0f' % total_loss)
print('quarantine rows:', sum(quarantine.values()))
for k, v in sorted(quarantine.items()):
    print('  ', k, v)
print('wrote', OUT)
