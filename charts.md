# Charts drafts (DRAFT for review)

Each chart is hand-built SVG (no chart library), computed from public/data JSONs. Numbers verified against the computed files.

---

## Chart A: Quarterly reported loss by scam type, 2021-Q1 to 2025-Q3

**Finding as title:** Investment fraud is the top line in almost every quarter, and job scams are the fastest climber.

**Exact computed numbers:** Quarterly series 2021-Q1 to 2025-Q3 (trends.json). Q1 2021: Investments $22.13M, Romance $10.55M, Spear Phishing $13.01M, Job $1.53M. Q3 2025: Investments $100.21M, Romance $18.27M, Spear Phishing $15.65M, Job $11.41M. Growth Q1-2021 to Q3-2025: Job 7.5x, Bank Investigator 5.1x, Investments 4.5x, Romance 1.7x, Spear Phishing 1.2x.

**What the chart shows:** 19 quarters on the x axis. Four polylines in $M per quarter: Investments (red, thick), Romance (ink), Spear Phishing (dark red), Job (grey). Legend below the axis. X labels every 4th quarter.

**EN caption:** "Quarterly reported loss by scam type, 2021-Q1 to 2025-Q3"
**EN note:** "Millions of CAD per quarter. Investment fraud is the top line in almost every quarter. Job scams are the fastest climber."
**FR caption:** "Pertes déclarées trimestrielles par type d'arnaque, T1 2021 au T3 2025"
**FR note:** "Millions de dollars canadiens par trimestre. La fraude à l'investissement est la première courbe presque chaque trimestre. Les arnaques à l'emploi montent le plus vite."

---

## Chart B: Reported loss by scam type, top 10

**Finding as title:** Investment fraud at $1.382B is 4.7x the next type, and the top 3 carry 72.8% of all reported losses.

**Exact computed numbers:** Investments $1,382,138,342.47; Romance $292,694,595.29; Spear Phishing $281,667,762.03; Job $143,117,439.64; Service $90,351,104.63; Extortion $86,275,860.74; Unknown $61,770,284.24; Bank Investigator $60,135,265.89; Other $57,625,961.24; Merchandise $50,443,600.21 (category_ranking.json).

**What the chart shows:** Horizontal bars, rank 1-10, length proportional to loss, value labels in red numerals. Rank 1 bar at full red, 2-10 at 45% opacity. Y axis ticks at $0M/$27M/$54M/$82M/$109M.

**EN caption:** "Reported loss by scam type, top 10"
**EN note:** "Investment fraud at $1.382B is 4.7x the next type. The top 3 types carry 72.8% of all reported losses."
**FR caption:** "Pertes déclarées par type d'arnaque, 10 premiers"
**FR note:** "La fraude à l'investissement à 1,382 G$ vaut 4,7x le type suivant. Les 3 premiers types concentrent 72,8 % de toutes les pertes déclarées."

---

## Chart C: Loss by age band and scam type (heatmap)

**Finding as title:** Investments lead every age band from 20 to 89, and the losses concentrate in the 50s and 60s.

**Exact computed numbers:** Top cells (age_heatmap.json, $M): 60-69 Investments $277.01M, 50-59 Investments $263.98M, 40-49 Investments $168.02M, 70-79 Investments $152.21M, 60-69 Romance $65.96M, 50-59 Romance $47.29M, 40-49 Romance $42.17M, 50-59 Job $22.86M, 40-49 Job $21.13M, 30-39 Romance $20.86M. Spear Phishing cells are near-zero across age bands because its losses mostly carry no victim age.

**What the chart shows:** 9 rows (age bands 20-29 to 90-99) by 6 columns (Investments, Romance, Spear Phishing, Job, Service, Extortion). White-to-red fill by loss share of the max cell ($277M). Cells above 6% of max carry $M labels, white text on the two darkest cells.

**EN caption:** "Loss by age band and scam type"
**EN note:** "Heatmap of the top 6 scam types across 9 age bands, millions of CAD. Investments lead every band. Blank cells carry negligible loss."
**FR caption:** "Pertes par tranche d'âge et type d'arnaque"
**FR note:** "Carte de chaleur des 6 premiers types sur 9 tranches d'âge, en millions de dollars canadiens. L'investissement mène chaque tranche. Les cellules vides portent une perte négligeable."
