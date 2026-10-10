# Data-fixes log entry (DRAFT for review)

**Dataset:** Canadian Anti-Fraud Centre Fraud Reporting System Dataset, open.canada.ca, publisher Royal Canadian Mounted Police / CAFC. 75.5 MB CSV, 350,361 rows, coverage 2021-01-01 to 2025-09-30, extracted 2025-10-01, retrieved 2026-10-10. Pipeline: scripts/build_data.py produces public/data JSONs and public/data/downloads CSVs.

---

## EN

### Problems and fixes

1. **Currency-text loss field.** Dollar losses arrive as text with dollar signs and thousands separators ("$20,000.00"). Fix: a guarded parser that accepts only plain currency text ($, commas, two decimals) and quarantines anything else. Result: zero rows rejected out of 350,361, and the parse proved the field is machine-clean, which is why the quarantine log is empty.

2. **Leading-quote age bands.** Every victim age band carries a leading Excel quote: "'30 - 39. Fix: strip the leading quote and whitespace before grouping. Result: clean age bands, e.g. "'60 - 69" -> "60 - 69". The 'Not Available / non disponible variant becomes Not Available.

3. **Inconsistent province spellings.** "North West Territories" vs "Northwest Territories"; "Newfoundland And Labrador" vs "Newfoundland and Labrador". Fix: canonical spelling map applied before any province grouping. Result: one key per province, so per-capita math never splits a province in two.

4. **US-state provinces.** 2,399 rows carry Country = United States, and provinces like California, Texas, and Florida appear in the province field (plus 10 New Hampshire rows). Fix: US-state entries are kept in national totals but excluded from per-capita math, since StatCan population has no matching denominator. Result: province ranking is Canada-only and honest.

5. **No codebook shipped with the categories.** The 39 thematic categories arrive as bare labels ("Spear Phishing", "Bank Investigator"). Fix: scam-type meanings decoded from the CAFC definitions PDF published on the same catalogue record. Result: every category in the explorer is a documented fraud type, not a guess.

### Result counts

- 350,361 rows kept. 0 rows quarantined from totals (quarantine log in public/data/meta.json records the empty log plus the province-exclusion rule).
- 39 scam types ranked. 1,829 category x province x age triples. 19 quarters of trends.
- 146,263 province-known reports in the explorer slices. 82,484 rows carry no province, counted in totals only.

### Before/after examples

- "'60 - 69" -> "60 - 69" (leading quote stripped)
- "North West Territories" -> "Northwest Territories" (canonical spelling)
- "Newfoundland And Labrador" -> "Newfoundland and Labrador" (canonical spelling)
- Province "California" (652 rows, $15.7M) -> kept in national totals, excluded from per-capita
- "$20,000.00" -> 20000.00 (guarded currency parse, zero rejections in 350,361 rows)

---

## FR

### Problèmes et correctifs

1. **Champ de pertes en texte monétaire.** Les pertes arrivent en texte avec symboles de dollar et séparateurs de milliers (« $20,000.00 »). Correctif : analyseur gardé qui n'accepte que du texte monétaire simple et met en quarantaine tout le reste. Résultat : zéro ligne rejetée sur 350 361, et l'analyse a prouvé que le champ est proprement lisible par machine, d'où le journal de quarantaine vide.

2. **Apostrophes initiales des tranches d'âge.** Chaque tranche d'âge porte une apostrophe Excel initiale : « '30 - 39 ». Correctif : retrait de l'apostrophe et des espaces avant regroupement. Résultat : tranches propres, ex. « '60 - 69 » -> « 60 - 69 ». La variante « Not Available / non disponible » devient Not Available.

3. **Graphies de provinces incohérentes.** « North West Territories » contre « Northwest Territories » ; « Newfoundland And Labrador » contre « Newfoundland and Labrador ». Correctif : table de graphies canoniques avant tout regroupement par province. Résultat : une clé par province, le calcul par habitant ne coupe jamais une province en deux.

4. **Provinces d'États américains.** 2 399 lignes portent Pays = États-Unis, et des provinces comme California, Texas et Florida figurent dans le champ province (plus 10 lignes New Hampshire). Correctif : ces entrées restent dans les totaux nationaux mais sont exclues du calcul par habitant, Statistique Canada n'ayant pas de dénominateur correspondant. Résultat : le classement par province est canadien et honnête.

5. **Aucun livre de codes fourni avec les catégories.** Les 39 catégories thématiques arrivent en étiquettes nues (« Spear Phishing », « Bank Investigator »). Correctif : significations décodées du PDF de définitions du CAFC publié sur la même fiche de catalogue. Résultat : chaque catégorie de l'explorateur est un type de fraude documenté, pas une supposition.

### Comptes résultants

- 350 361 lignes conservées. 0 ligne mise en quarantaine hors des totaux (journal dans public/data/meta.json, qui consigne le journal vide plus la règle d'exclusion des provinces).
- 39 types d'arnaque classés. 1 829 triplets type, province, âge. 19 trimestres de tendances.
- 146 263 rapports à province connue dans les tranches de l'explorateur. 82 484 lignes sans province, comptées dans les totaux seulement.

### Exemples avant/après

- « '60 - 69 » -> « 60 - 69 » (apostrophe retirée)
- « North West Territories » -> « Northwest Territories » (graphie canonique)
- « Newfoundland And Labrador » -> « Newfoundland and Labrador » (graphie canonique)
- Province « California » (652 lignes, 15,7 M$) -> conservée dans les totaux nationaux, exclue du par habitant
- « $20,000.00 » -> 20000.00 (analyse monétaire gardée, zéro rejet sur 350 361 lignes)
