# Showcase drafts (DRAFT for review)

Umbrella Q&A for "Fraud Losses, Tracked". Every number from public/data/*.json (extract 2025-10-01, coverage 2021-01-01 to 2025-09-30).

---

## Q1. Which scams drain the most money from Canadians?

**Quotable stat:** Investment fraud accounts for $1.38B (51.5%) of Canada's $2.687B in reported fraud losses, January 2021 to September 2025, across 18,610 victim reports.

**Mechanism:** Investment fraud is not just the top type, it leads in every victim age band from 20 to 89. Romance scams ($292.7M) and spear phishing ($281.7M) are next, each about a fifth of investment fraud's toll. The top 3 types carry 72.8% of all reported losses.

**How we know:** category_ranking.json (Investments loss 1382138342.47, share 51.43, victim_reports_with_loss 17132), age_heatmap.json (Investments is the max cell in all 9 age bands).

**Cite this:** Investment fraud accounts for $1.38B (51.5%) of Canada's $2.687B in reported fraud losses, Jan 2021-Sep 2025, across 18,610 victim reports. Source: Fraud Losses, Tracked, CAFC Fraud Reporting System Dataset extract 2025-10-01.

**Share text:** Investment fraud alone cost Canadians $1.38B, 51.5% of all reported fraud losses, and leads every age band from 20 to 89.

**FR**
Question : Quelles arnaques drainent le plus d'argent des Canadiens ?
Stat : La fraude à l'investissement représente 1,38 G$ (51,5 %) des 2,687 G$ de pertes par fraude déclarées au Canada, janv. 2021-sept. 2025, sur 18 610 rapports de victimes.
Mécanisme : La fraude à l'investissement n'est pas seulement le premier type, elle arrive en tête dans chaque tranche d'âge des victimes de 20 à 89 ans. Les arnaques sentimentales (292,7 M$) et l'hameçonnage ciblé (281,7 M$) suivent, chacune à environ un cinquième du bilan de la fraude à l'investissement. Les 3 premiers types concentrent 72,8 % de toutes les pertes déclarées.
Citer : La fraude à l'investissement représente 1,38 G$ (51,5 %) des 2,687 G$ de pertes par fraude déclarées au Canada, janv. 2021-sept. 2025, sur 18 610 rapports de victimes. Source : Fraud Losses, Tracked, ensemble de données du Système de signalement des fraudes du CAFC, extrait du 2025-10-01.
Partager : La fraude à l'investissement a coûté à elle seule 1,38 G$ aux Canadiens, 51,5 % de toutes les pertes par fraude déclarées, et arrive en tête dans chaque tranche d'âge de 20 à 89 ans.

---

## Q2. Which scam type hits the hardest per victim?

**Quotable stat:** Spear phishing averages $102,911 in reported loss per victim report, the highest of any scam type. Investment fraud averages $80,676.

**Mechanism:** Spear phishing needs few victims: 2,737 victim reports produced $281.7M, because the average report is a business-email-compromise-scale loss. Foreign money offers ($89,202) and romance scams ($62,676) follow. Volume and severity point at different targets: Investments has the most reports (20,394), spear phishing has the heaviest single hits.

**How we know:** category_ranking.json sorted by avg_loss_per_victim.

**Cite this:** Spear phishing averages $102,911 in reported loss per victim report, the highest of any scam type. Investment fraud averages $80,676. Source: Fraud Losses, Tracked, CAFC Fraud Reporting System Dataset extract 2025-10-01.

**Share text:** Spear phishing costs $102,911 per victim report on average, the highest of any scam type. Fewer victims, bigger damage.

**FR**
Question : Quel type d'arnaque frappe le plus durement par victime ?
Stat : L'hameçonnage ciblé atteint 102 911 $ de perte déclarée moyenne par rapport de victime, le plus élevé de tous les types. La fraude à l'investissement atteint 80 676 $.
Mécanisme : L'hameçonnage ciblé a besoin de peu de victimes : 2 737 rapports de victimes ont produit 281,7 M$, car le rapport moyen est une perte à l'échelle de la compromission de courriel d'affaires. Les offres d'argent étranger (89 202 $) et les arnaques sentimentales (62 676 $) suivent. Le volume et la gravité pointent vers des cibles différentes : l'investissement a le plus de rapports (20 394), l'hameçonnage ciblé les coups les plus lourds.
Citer : L'hameçonnage ciblé atteint 102 911 $ de perte déclarée moyenne par rapport de victime, le plus élevé de tous les types. La fraude à l'investissement atteint 80 676 $. Source : Fraud Losses, Tracked, ensemble du CAFC, extrait du 2025-10-01.
Partager : L'hameçonnage ciblé coûte 102 911 $ par victime en moyenne, le plus élevé de tous les types. Moins de victimes, plus de dégâts.

---

## Q3. Who loses the most: which age groups?

**Quotable stat:** Canadians aged 60-69 reported $429M in fraud losses, the most of any age band. The average victim report there is $49,708.

**Mechanism:** Average loss per victim report climbs with age through the 60s, then falls. The 60-69 band combines the highest count and the highest per-victim average, which is why it dominates the total. The honest gap: 37.7% of reported losses carry no victim age at all, so every age number is a floor.

**How we know:** age_heatmap.json (band_total max at 60 - 69), age band averages computed over victim rows with loss.

**Cite this:** Canadians aged 60-69 reported $429M in fraud losses, the most of any age band. 37.7% of reported losses carry no victim age. Source: Fraud Losses, Tracked, CAFC Fraud Reporting System Dataset extract 2025-10-01.

**Share text:** Canadians aged 60-69 lost $429M to fraud, more than any other age band, and the average victim report there is $49,708.

**FR**
Question : Qui perd le plus : quelles tranches d'âge ?
Stat : Les Canadiens de 60 à 69 ans ont déclaré 429 M$ de pertes par fraude, plus que toute autre tranche. Le rapport de victime moyen y est de 49 708 $.
Mécanisme : La perte moyenne par rapport de victime augmente avec l'âge jusqu'à la soixantaine, puis diminue. La tranche 60-69 combine le nombre le plus élevé et la moyenne par victime la plus élevée, d'où sa domination du total. Réserve honnête : 37,7 % des pertes déclarées n'ont aucun âge de victime, donc chaque chiffre par âge est un plancher.
Citer : Les Canadiens de 60 à 69 ans ont déclaré 429 M$ de pertes par fraude, plus que toute autre tranche. 37,7 % des pertes n'ont pas d'âge de victime. Source : Fraud Losses, Tracked, ensemble du CAFC, extrait du 2025-10-01.
Partager : Les 60-69 ans ont perdu 429 M$ en fraudes, plus que toute autre tranche, et le rapport de victime moyen y est de 49 708 $.

---

## Q4. Which provinces pay the most per person?

**Quotable stat:** British Columbia and Ontario each reported $62 per person in fraud losses, more than twice Quebec's $26.

**Mechanism:** Per-capita math uses StatCan's July 1, 2026 population estimates. The east-west split is the story: BC and Ontario at $62, Manitoba and Alberta at $54, Quebec at $26.50, the lowest large province. Nunavut's $82 per person is flagged small-sample (100 reports). 19.9% of reported losses carry no province and sit outside the ranking.

**How we know:** province_ranking.json (loss_per_capita: BC 62.22, ON 61.98, MB 53.61, AB 53.58, QC 26.50, Nunavut 82.21 unstable).

**Cite this:** British Columbia and Ontario each reported $62 per person in fraud losses, Jan 2021-Sep 2025; Quebec $26. 19.9% of losses carry no province. Source: Fraud Losses, Tracked, CAFC Fraud Reporting System Dataset extract 2025-10-01.

**Share text:** BC and Ontario lose $62 per person to fraud, more than twice Quebec's $26. No city-level data exists.

**FR**
Question : Quelles provinces paient le plus par habitant ?
Stat : La Colombie-Britannique et l'Ontario ont chacun déclaré 62 $ par habitant de pertes par fraude, plus du double des 26 $ du Québec.
Mécanisme : Le calcul par habitant utilise les estimations de population de Statistique Canada au 1er juillet 2026. Le clivage est-ouest est l'histoire : la C.-B. et l'Ontario à 62 $, le Manitoba et l'Alberta à 54 $, le Québec à 26,50 $, la grande province la moins touchée. Les 82 $ du Nunavut sont signalés comme petit échantillon (100 rapports). 19,9 % des pertes n'ont pas de province et restent hors classement.
Citer : La Colombie-Britannique et l'Ontario ont chacun déclaré 62 $ par habitant de pertes par fraude, janv. 2021-sept. 2025 ; le Québec 26 $. 19,9 % des pertes n'ont pas de province. Source : Fraud Losses, Tracked, ensemble du CAFC, extrait du 2025-10-01.
Partager : La C.-B. et l'Ontario perdent 62 $ par habitant en fraudes, plus du double des 26 $ du Québec. Aucune donnée par ville n'existe.

---

## Q5. Which scams are growing fastest?

**Quotable stat:** Job scam losses grew 7.5x from Q1 2021 ($1.53M) to Q3 2025 ($11.41M). Bank investigator scams grew 5.1x. Investment fraud grew 4.5x and remains the volume leader.

**Mechanism:** The growth leaders are all contact scams: fake job offers and fake bank investigators scale with phone and messaging volume. The fastest way in is the screen: Internet-social network ($828.8M) and Internet ($678.3M) are the top loss channels, while direct calls generate the most reports (81,723) at far lower losses ($309.1M).

**How we know:** trends.json by_category per quarter; methods.json.

**Cite this:** Job scam losses grew 7.5x from Q1 2021 to Q3 2025; bank investigator scams 5.1x; investment fraud 4.5x. Source: Fraud Losses, Tracked, CAFC Fraud Reporting System Dataset extract 2025-10-01.

**Share text:** Job scams are the fastest-growing fraud in Canada: quarterly losses up 7.5x since Q1 2021. Bank investigator scams up 5.1x.

**FR**
Question : Quelles arnaques croissent le plus vite ?
Stat : Les pertes des arnaques à l'emploi ont été multipliées par 7,5 du T1 2021 (1,53 M$) au T3 2025 (11,41 M$). Les arnaques au faux enquêteur bancaire ont crû de 5,1x. La fraude à l'investissement a crû de 4,5x et reste la première en volume.
Mécanisme : Les champions de la croissance sont toutes des arnaques de contact : les fausses offres d'emploi et les faux enquêteurs bancaires évoluent avec le volume des appels et des messages. Le point d'entrée le plus rapide, c'est l'écran : le réseau social sur Internet (828,8 M$) et Internet (678,3 M$) sont les premiers canaux de perte, tandis que les appels directs génèrent le plus de rapports (81 723) pour des pertes bien moindres.
Citer : Les pertes des arnaques à l'emploi ont été multipliées par 7,5 du T1 2021 au T3 2025 ; les arnaques au faux enquêteur par 5,1 ; la fraude à l'investissement par 4,5. Source : Fraud Losses, Tracked, ensemble du CAFC, extrait du 2025-10-01.
Partager : Les arnaques à l'emploi sont la fraude qui croît le plus vite au Canada : les pertes trimestrielles ont été multipliées par 7,5 depuis le T1 2021. Les faux enquêteurs bancaires, par 5,1.

---

## Q6. What this data cannot say.

**Quotable stat:** 37.7% of reported losses carry no victim age, 19.9% carry no province. All $2.687B comes from Victim rows: Attempt rows carry $0.

**Mechanism:** Losses are self-reported, not verified: the largest single row is a self-reported $23.6M loss. Reports are not victims: one report is one report, and the CAFC's own documentation notes accuracy depends on the person filing. The data stops at September 30, 2025, so Q4 2025 is out of every growth comparison.

**How we know:** meta.json honest_limits and victim_row_share_of_loss 100.0.

**Cite this:** 350,361 CAFC reports, $2.687B in reported losses, Jan 2021-Sep 2025. All losses come from Victim rows. Source: Fraud Losses, Tracked, CAFC Fraud Reporting System Dataset extract 2025-10-01.

**Share text:** 350,361 fraud reports, $2.687B in reported losses. 37.7% have no age, 19.9% no province. All losses come from Victim rows.

**FR**
Question : Ce que ces données ne peuvent pas dire.
Stat : 37,7 % des pertes déclarées n'ont pas d'âge de victime, 19,9 % n'ont pas de province. Les 2,687 G$ viennent tous de lignes Victime : les lignes Tentative portent 0 $.
Mécanisme : Les pertes sont autodéclarées, pas vérifiées : la plus grande ligne individuelle est une perte autodéclarée de 23,6 M$. Les rapports ne sont pas des victimes : un rapport est un rapport, et la documentation du CAFC indique que l'exactitude dépend de la personne qui dépose. Les données s'arrêtent au 30 septembre 2025, donc le T4 2025 est hors de toute comparaison de croissance.
Citer : 350 361 rapports du CAFC, 2,687 G$ de pertes déclarées, janv. 2021-sept. 2025. Toutes les pertes viennent de lignes Victime. Source : Fraud Losses, Tracked, ensemble du CAFC, extrait du 2025-10-01.
Partager : 350 361 rapports de fraude, 2,687 G$ de pertes déclarées. 37,7 % sans âge, 19,9 % sans province. Toutes les pertes viennent de lignes Victime.
