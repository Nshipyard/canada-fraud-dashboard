"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type Lang = "en" | "fr";

const en = {
  banner: {
    line: "An independent open-source project. Not affiliated with the Government of Canada, the RCMP, or the CAFC.",
    badge: "Open source",
  },
  nav: { explorer: "Explorer", showcase: "Showcase", charts: "Charts", methodology: "Methodology", developers: "Developers", data: "Data", back: "All projects" },
  hero: {
    kicker: "Nshipyard Canada · Open data project",
    title: "Fraud, Living",
    sub: "The Canadian Anti-Fraud Centre publishes 350,361 reports and $2.687 billion in reported losses, row by row, and it never answers the follow-up: which scams drain the most money, from which Canadians. This project normalizes the registry, ranks every scam type by loss, and cross-tabs losses by age band and province, quarterly, from January 2021 to September 2025.",
    cta1: "Explore the data",
    cta2: "Read the methodology",
  },
  stats: [
    { value: "$2.69B", label: "reported losses across 350,361 reports filed between January 2021 and September 2025. Every dollar comes from rows marked Victim, none from attempts" },
    { value: "51.5%", label: "of all reported losses comes from investment fraud alone: $1.38 billion across 18,610 victim reports. It is the top scam type in every age band from 20 to 89" },
    { value: "$102,911", label: "average loss per spear-phishing victim report, the highest of any scam type. Investment fraud averages $80,676" },
    { value: "7.5x", label: "growth in quarterly job-scam losses from Q1 2021 to Q3 2025. Bank investigator scams grew 5.1x" },
    { value: "$62 vs $26", label: "reported losses per person in British Columbia vs Quebec, the highest and lowest large provinces. Ontario matches BC at $62" },
  ],
  explorer: {
    kicker: "Explorer",
    title: "Filter 350,361 reports by scam, age, province.",
    search: "All scam types",
    allCategories: "All scam types",
    allProvinces: "All provinces",
    allAges: "All age bands",
    showing: "Showing",
    of: "of",
    noResult: "No rows match.",
    empty: "Pick a scam type, an age band, or a province to see the matching slice of the data. Matching rows are the precomputed category, province, and age-band triples, ranked by loss.",
    colCategory: "Scam type",
    colProvince: "Province",
    colAge: "Age band",
    colLoss: "Loss",
    colReports: "Reports",
    sliceSummary: "matching combinations",
  },
  showcase: {
    kicker: "Showcase",
    title: "Six questions the registry never answers.",
    body: "Every number below is computed from the 350,361 normalized CAFC reports, January 2021 to September 2025. The sixth card states the limits plainly, because a ranking without its blind spots is a marketing chart.",
    cite: "Cite this",
    copied: "Copied",
    shareX: "Share on X",
    shareLinkedIn: "Share on LinkedIn",
    cards: [
      {
        q: "Which scams drain the most money from Canadians?",
        a: "Investment fraud: $1.38 billion, 51.5% of the $2.687 billion total, across 18,610 victim reports. It is the top scam type in every victim age band from 20 to 89. Romance scams ($292.7M) and spear phishing ($281.7M) are next, each about a fifth of investment fraud's toll.",
        cite: "Investment fraud accounts for $1.38B (51.5%) of Canada's $2.687B in reported fraud losses, Jan 2021-Sep 2025, across 18,610 victim reports. Source: Fraud, Living, CAFC Fraud Reporting System Dataset extract 2025-10-01.",
        share: "Investment fraud alone cost Canadians $1.38B, 51.5% of all reported fraud losses, and leads every age band from 20 to 89.",
      },
      {
        q: "Which scam type hits the hardest per victim?",
        a: "Spear phishing, at $102,911 per victim report, the highest average of any scam type. Investment fraud averages $80,676, foreign money offers $89,202, romance scams $62,676. Spear phishing needs few victims: 2,737 victim reports produced $281.7M.",
        cite: "Spear phishing averages $102,911 in reported loss per victim report, the highest of any scam type. Investment fraud averages $80,676. Source: Fraud, Living, CAFC Fraud Reporting System Dataset extract 2025-10-01.",
        share: "Spear phishing costs $102,911 per victim report on average, the highest of any scam type. Fewer victims, bigger damage.",
      },
      {
        q: "Who loses the most: which age groups?",
        a: "Canadians aged 60 to 69 lost $429M, more than any other age band. Average loss per victim report climbs with age and peaks there at $49,708. The honest gap: 37.7% of reported losses carry no victim age at all, so every age number is a floor, not a total.",
        cite: "Canadians aged 60-69 reported $429M in fraud losses, the most of any age band. 37.7% of reported losses carry no victim age. Source: Fraud, Living, CAFC Fraud Reporting System Dataset extract 2025-10-01.",
        share: "Canadians aged 60-69 lost $429M to fraud, more than any other age band, and the average victim report there is $49,708.",
      },
      {
        q: "Which provinces pay the most per person?",
        a: "British Columbia and Ontario: $62 in reported losses per person, more than twice Quebec's $26. Manitoba ($54) and Alberta ($54) follow. The honest gap: 19.9% of reported losses carry no province, and geographic grain stops at the province, so no city-level view is possible.",
        cite: "British Columbia and Ontario each reported $62 per person in fraud losses, Jan 2021-Sep 2025; Quebec $26. 19.9% of losses carry no province. Source: Fraud, Living, CAFC Fraud Reporting System Dataset extract 2025-10-01.",
        share: "BC and Ontario lose $62 per person to fraud, more than twice Quebec's $26. No city-level data exists.",
      },
      {
        q: "Which scams are growing fastest?",
        a: "Job scams: quarterly losses rose 7.5x from Q1 2021 ($1.53M) to Q3 2025 ($11.41M). Bank investigator scams grew 5.1x ($1.30M to $6.61M). Investment fraud grew 4.5x and remains the volume leader at $100.2M in Q3 2025 alone. The fastest way in is the screen: Internet-social network ($828.8M) and Internet ($678.3M) are the top loss channels, while direct calls generate the most reports (81,723) at far lower losses.",
        cite: "Job scam losses grew 7.5x from Q1 2021 to Q3 2025; bank investigator scams 5.1x; investment fraud 4.5x. Source: Fraud, Living, CAFC Fraud Reporting System Dataset extract 2025-10-01.",
        share: "Job scams are the fastest-growing fraud in Canada: quarterly losses up 7.5x since Q1 2021. Bank investigator scams up 5.1x.",
      },
      {
        q: "What this data cannot say.",
        a: "37.7% of reported losses carry no victim age and 19.9% carry no province, so the age and province views are floors, not totals. All $2.687B comes from rows marked Victim: Attempt rows carry $0 in this extract, which means attempts are free to report but invisible in loss math. Losses are reported, not verified: one self-reported $23.6M loss is the largest single row. The data stops at September 30, 2025.",
        cite: "350,361 CAFC reports, $2.687B in reported losses, Jan 2021-Sep 2025. All losses come from Victim rows. Source: Fraud, Living, CAFC Fraud Reporting System Dataset extract 2025-10-01.",
        share: "350,361 fraud reports, $2.687B in reported losses. 37.7% have no age, 19.9% no province. All losses come from Victim rows.",
      },
    ],
  },
  charts: {
    kicker: "Charts",
    title: "The shape of the problem.",
    body: "Three views of the same 350,361 reports. The quarterly lines, the top-10 loss bars, and the age-band heatmap are all computed from the normalized extract.",
    c1Title: "Quarterly reported loss by scam type, 2021-Q1 to 2025-Q3",
    c1Note: "Millions of CAD per quarter. Investment fraud is the top line in almost every quarter. Job scams are the fastest climber.",
    c2Title: "Reported loss by scam type, top 10",
    c2Note: "Investment fraud at $1.382B is 4.7x the next type. The top 3 types carry 72.8% of all reported losses.",
    c3Title: "Loss by age band and scam type",
    c3Note: "Heatmap of the top 6 scam types across 9 age bands, millions of CAD. Investments lead every band. Blank cells carry negligible loss.",
    reports: "reports",
    legend: { investments: "Investments", romance: "Romance", spearPhishing: "Spear phishing", job: "Job" },
  },
  methodology: {
    kicker: "Methodology",
    title: "How the ranking was built, and where it is weak.",
    items: [
      "Source: the Canadian Anti-Fraud Centre Fraud Reporting System Dataset, open.canada.ca, publisher Royal Canadian Mounted Police / CAFC. Coverage 2021-01-01 to 2025-09-30, extracted 2025-10-01, file 75.5 MB, 350,361 rows, retrieved 2026-10-10.",
      "Loss parsing: the raw field writes currency as $1,234.56 with dollar signs and commas. The parser accepts only plain currency text. It rejected zero rows out of 350,361, and zero rows were dropped from any total.",
      "Age bands: the raw field carries a leading Excel quote, like '30 - 39, which is stripped. 'Not Available / non disponible becomes Not Available. 37.7% of reported losses carry no victim age and are counted in totals but excluded from every age view.",
      "Provinces: 'North West Territories' and 'Newfoundland And Labrador' spellings are canonicalized. Rows whose province is a US state (2,399 US-country rows plus entries like California and Texas) are kept in national totals but excluded from per-capita math. 19.9% of reported losses carry no province.",
      "Per-capita: StatCan quarterly population estimates, July 1 2026, table 17-10-0009-01. Territories with under 1,000 reports are flagged as small-sample.",
      "Complaint types: rows marked Victim carry 100% of the $2.687B in reported losses. Attempt rows carry $0 in this extract. Other, Unknown, and Incomplete rows also carry $0.",
      "Quarantine: zero rows were quarantined from totals. The only flagged rows are 10 US-state province entries kept out of the province ranking, recorded in meta.json.",
      "Trends: quarters are computed from the date-received field. Q4 2025 is partial (data stops 2025-09-30) and is excluded from growth comparisons.",
      "Honest limits: losses are self-reported, not verified. Reports are not victims: one report is one report. The CAFC's own documentation notes accuracy depends on the person filing.",
    ],
    contextTitle: "Why this matters now",
    contextBody: "The CAFC's published annual figures put 2025 fraud losses in the hundreds of millions of dollars, and the Senate has held hearings on seniors' fraud vulnerability. This project turns the CAFC's own rows into the ranked, age-banded, per-capita view the agency never publishes, so banks, police, and seniors' advocates can aim prevention budgets at the costliest scam-demographic pairs instead of reading annual PDFs.",
  },
  developers: {
    kicker: "For developers",
    title: "Query it from code, or from an agent.",
    body: "Three consumption paths, same normalized data. REST for applications, OpenAPI for integration, MCP tools over streamable HTTP for AI agents.",
    endpoints: "Endpoints",
    tryIt: "Try it",
    openapi: "OpenAPI spec",
    mcpTitle: "MCP server",
    mcpBody: "One streamable-HTTP endpoint. Tools: fraud_lookup, scam_ranking, trend.",
    downloadNote: "All cleaned CSVs are served from this site's /data directory, same build as the API.",
  },
  mcp: {
    kicker: "Connect your agent",
    title: "Put this data to work inside your AI tools.",
    body: "Pick your harness, copy the prompt, send it to your agent. Your agent runs the setup itself.",
    tabs: { chatgpt: "ChatGPT", claude: "Claude", claudecode: "Claude Code", cli: "CLI", other: "Other" },
    cardTitle: "Copy and send this to {tab}",
    copy: "Copy",
    copied: "Copied",
    chatgptNote: "ChatGPT connects through the documented REST API rather than MCP directly.",
    pChatgpt:
      "I want to use the {displayName} through its API.\n- OpenAPI spec: {origin}/api/openapi.json\n- REST base: {origin}/api/v1\nFirst tell me in two sentences what this API offers, then {exampleLower}, and show me the result.",
    pClaude:
      "In Claude (claude.ai), open Settings, then Connectors, and add a custom connector:\n- Name: {displayName}\n- URL: {origin}/mcp\nThen list the available tools, {exampleLower}, and show me the result.",
    pClaudeCode:
      "Set up the {displayName} MCP server so I can query it from here.\n1. Run: claude mcp add --transport http {slug} {origin}/mcp\n2. Run `claude mcp list` to confirm it connected.\n3. {example}, and show me the result.",
    pCli:
      "# MCP endpoint (streamable HTTP)\n{origin}/mcp\n\n# List the available tools\ncurl -s -X POST {origin}/mcp -H 'Content-Type: application/json' \\\n  -d '{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"tools/list\"}'",
    otherTitle: "Everything else",
    otherBody: "Any harness that speaks MCP over streamable HTTP, or plain REST.",
    mcpEndpoint: "MCP endpoint",
    openapiSpec: "OpenAPI spec",
    restBase: "REST base",
  },
  downloads: {
    kicker: "Data",
    title: "Take the files.",
    body: "The cleaned extracts and the build metadata. Same files the API reads. MIT licensed.",
    files: [
      { name: "scam-type-ranking.csv", desc: "39 scam types ranked by reported loss, with victim counts and averages" },
      { name: "province-per-capita.csv", desc: "13 provinces and territories: loss, reports, 2026 population, loss per person" },
      { name: "quarterly-trends.csv", desc: "Quarterly loss by top 12 scam types, 2021-Q1 to 2025-Q3" },
      { name: "age-band-by-scam-type.csv", desc: "Loss matrix: 9 age bands by top 12 scam types" },
    ],
    download: "Download",
  },
  footer: {
    line: "An independent open-source project. Not affiliated with the Government of Canada, the RCMP, or the CAFC.",
    sources: "Source: Canadian Anti-Fraud Centre Fraud Reporting System Dataset, open.canada.ca, extracted 2025-10-01 (2021-01-01 to 2025-09-30). Retrieved 2026-10-10. Planned domain: fraud.canada.nshipyard.com.",
    author: "Built by Richardson Dackam",
  },
};

export type Dict = typeof en;

const fr: Dict = {
  banner: {
    line: "Un projet indépendant à code source ouvert. Non affilié au gouvernement du Canada, à la GRC ni au CAFC.",
    badge: "Code source ouvert",
  },
  nav: { explorer: "Explorateur", showcase: "Vitrine", charts: "Graphiques", methodology: "Méthodologie", developers: "Développeurs", data: "Données", back: "Tous les projets" },
  hero: {
    kicker: "Nshipyard Canada · Projet de données ouvertes",
    title: "Fraud, Living",
    sub: "Le Centre antifraude du Canada publie 350 361 rapports et 2,687 milliards de dollars de pertes déclarées, ligne par ligne, sans jamais répondre à la suite : quelles arnaques drainent le plus d'argent, et auprès de quels Canadiens. Ce projet normalise le registre, classe chaque type d'arnaque par perte, et croise les pertes par tranche d'âge et par province, trimestre par trimestre, de janvier 2021 à septembre 2025.",
    cta1: "Explorer les données",
    cta2: "Lire la méthodologie",
  },
  stats: [
    { value: "2,69 G$", label: "de pertes déclarées sur 350 361 rapports déposés entre janvier 2021 et septembre 2025. Chaque dollar vient d'une ligne marquée Victime, aucun d'une tentative" },
    { value: "51,5 %", label: "de toutes les pertes déclarées proviennent de la seule fraude à l'investissement : 1,38 milliard de dollars sur 18 610 rapports de victimes. C'est la première arnaque dans chaque tranche d'âge de 20 à 89 ans" },
    { value: "102 911 $", label: "perte moyenne par rapport de victime d'hameçonnage ciblé, la plus élevée de tous les types d'arnaque. La fraude à l'investissement atteint 80 676 $ en moyenne" },
    { value: "7,5x", label: "croissance des pertes trimestrielles des arnaques à l'emploi du T1 2021 au T3 2025. Les arnaques au faux enquêteur bancaire ont crû de 5,1x" },
    { value: "62 $ contre 26 $", label: "de pertes déclarées par habitant en Colombie-Britannique contre le Québec, la province la plus touchée et la moins touchée. L'Ontario égale la C.-B. à 62 $" },
  ],
  explorer: {
    kicker: "Explorateur",
    title: "Filtrer 350 361 rapports par arnaque, âge, province.",
    search: "Tous les types d'arnaque",
    allCategories: "Tous les types d'arnaque",
    allProvinces: "Toutes les provinces",
    allAges: "Toutes les tranches d'âge",
    showing: "Affichage de",
    of: "sur",
    noResult: "Aucune ligne ne correspond.",
    empty: "Choisissez un type d'arnaque, une tranche d'âge ou une province pour voir la tranche correspondante. Les lignes sont les combinaisons type, province, âge précalculées, classées par perte.",
    colCategory: "Type d'arnaque",
    colProvince: "Province",
    colAge: "Tranche d'âge",
    colLoss: "Perte",
    colReports: "Rapports",
    sliceSummary: "combinaisons correspondantes",
  },
  showcase: {
    kicker: "Vitrine",
    title: "Six questions auxquelles le registre ne répond jamais.",
    body: "Chaque chiffre ci-dessous est calculé à partir des 350 361 rapports normalisés du CAFC, janvier 2021 à septembre 2025. La sixième carte énonce les limites franchement, car un classement sans angles morts est un argument publicitaire.",
    cite: "Citer",
    copied: "Copié",
    shareX: "Partager sur X",
    shareLinkedIn: "Partager sur LinkedIn",
    cards: [
      {
        q: "Quelles arnaques drainent le plus d'argent des Canadiens ?",
        a: "La fraude à l'investissement : 1,38 milliard de dollars, 51,5 % des 2,687 milliards au total, sur 18 610 rapports de victimes. C'est la première arnaque dans chaque tranche d'âge des victimes de 20 à 89 ans. Les arnaques sentimentales (292,7 M$) et l'hameçonnage ciblé (281,7 M$) suivent, chacune à environ un cinquième du bilan de la fraude à l'investissement.",
        cite: "La fraude à l'investissement représente 1,38 G$ (51,5 %) des 2,687 G$ de pertes par fraude déclarées au Canada, janv. 2021-sept. 2025, sur 18 610 rapports de victimes. Source : Fraud, Living, ensemble de données du Système de signalement des fraudes du CAFC, extrait du 2025-10-01.",
        share: "La fraude à l'investissement a coûté à elle seule 1,38 G$ aux Canadiens, 51,5 % de toutes les pertes par fraude déclarées, et arrive en tête dans chaque tranche d'âge de 20 à 89 ans.",
      },
      {
        q: "Quel type d'arnaque frappe le plus durement par victime ?",
        a: "L'hameçonnage ciblé, à 102 911 $ par rapport de victime, la moyenne la plus élevée de tous les types. La fraude à l'investissement atteint 80 676 $, les offres d'argent étranger 89 202 $, les arnaques sentimentales 62 676 $. L'hameçonnage ciblé a besoin de peu de victimes : 2 737 rapports de victimes ont produit 281,7 M$.",
        cite: "L'hameçonnage ciblé atteint 102 911 $ de perte déclarée moyenne par rapport de victime, le plus élevé de tous les types. La fraude à l'investissement atteint 80 676 $. Source : Fraud, Living, ensemble du CAFC, extrait du 2025-10-01.",
        share: "L'hameçonnage ciblé coûte 102 911 $ par victime en moyenne, le plus élevé de tous les types. Moins de victimes, plus de dégâts.",
      },
      {
        q: "Qui perd le plus : quelles tranches d'âge ?",
        a: "Les Canadiens de 60 à 69 ans ont perdu 429 M$, plus que toute autre tranche. La perte moyenne par rapport de victime augmente avec l'âge et culmine là à 49 708 $. Réserve honnête : 37,7 % des pertes déclarées n'ont aucun âge de victime, donc chaque chiffre par âge est un plancher, pas un total.",
        cite: "Les Canadiens de 60 à 69 ans ont déclaré 429 M$ de pertes par fraude, plus que toute autre tranche. 37,7 % des pertes n'ont pas d'âge de victime. Source : Fraud, Living, ensemble du CAFC, extrait du 2025-10-01.",
        share: "Les 60-69 ans ont perdu 429 M$ en fraudes, plus que toute autre tranche, et le rapport de victime moyen y est de 49 708 $.",
      },
      {
        q: "Quelles provinces paient le plus par habitant ?",
        a: "La Colombie-Britannique et l'Ontario : 62 $ de pertes déclarées par habitant, plus du double des 26 $ du Québec. Le Manitoba (54 $) et l'Alberta (54 $) suivent. Réserve honnête : 19,9 % des pertes n'ont pas de province, et le grain s'arrête à la province, donc aucune vue par ville n'est possible.",
        cite: "La Colombie-Britannique et l'Ontario ont chacun déclaré 62 $ par habitant de pertes par fraude, janv. 2021-sept. 2025 ; le Québec 26 $. 19,9 % des pertes n'ont pas de province. Source : Fraud, Living, ensemble du CAFC, extrait du 2025-10-01.",
        share: "La C.-B. et l'Ontario perdent 62 $ par habitant en fraudes, plus du double des 26 $ du Québec. Aucune donnée par ville n'existe.",
      },
      {
        q: "Quelles arnaques croissent le plus vite ?",
        a: "Les arnaques à l'emploi : les pertes trimestrielles ont été multipliées par 7,5 du T1 2021 (1,53 M$) au T3 2025 (11,41 M$). Les arnaques au faux enquêteur bancaire ont crû de 5,1x (1,30 M$ à 6,61 M$). La fraude à l'investissement a crû de 4,5x et reste la première en volume avec 100,2 M$ au seul T3 2025. Le point d'entrée le plus rapide, c'est l'écran : le réseau social sur Internet (828,8 M$) et Internet (678,3 M$) sont les premiers canaux de perte, tandis que les appels directs génèrent le plus de rapports (81 723) pour des pertes bien moindres.",
        cite: "Les pertes des arnaques à l'emploi ont été multipliées par 7,5 du T1 2021 au T3 2025 ; les arnaques au faux enquêteur par 5,1 ; la fraude à l'investissement par 4,5. Source : Fraud, Living, ensemble du CAFC, extrait du 2025-10-01.",
        share: "Les arnaques à l'emploi sont la fraude qui croît le plus vite au Canada : les pertes trimestrielles ont été multipliées par 7,5 depuis le T1 2021. Les faux enquêteurs bancaires, par 5,1.",
      },
      {
        q: "Ce que ces données ne peuvent pas dire.",
        a: "37,7 % des pertes déclarées n'ont pas d'âge de victime et 19,9 % n'ont pas de province, donc les vues par âge et par province sont des planchers, pas des totaux. Les 2,687 G$ viennent tous de lignes marquées Victime : les lignes Tentative portent 0 $ dans cet extrait, ce qui signifie que les tentatives se signalent gratuitement mais restent invisibles dans le calcul des pertes. Les pertes sont déclarées, pas vérifiées : une ligne autodéclarée de 23,6 M$ est le rapport individuel le plus élevé. Les données s'arrêtent au 30 septembre 2025.",
        cite: "350 361 rapports du CAFC, 2,687 G$ de pertes déclarées, janv. 2021-sept. 2025. Toutes les pertes viennent de lignes Victime. Source : Fraud, Living, ensemble du CAFC, extrait du 2025-10-01.",
        share: "350 361 rapports de fraude, 2,687 G$ de pertes déclarées. 37,7 % sans âge, 19,9 % sans province. Toutes les pertes viennent de lignes Victime.",
      },
    ],
  },
  charts: {
    kicker: "Graphiques",
    title: "La forme du problème.",
    body: "Trois vues des mêmes 350 361 rapports. Les courbes trimestrielles, les barres des 10 premiers et la carte de chaleur par âge sont toutes calculées à partir de l'extrait normalisé.",
    c1Title: "Pertes déclarées trimestrielles par type d'arnaque, T1 2021 au T3 2025",
    c1Note: "Millions de dollars canadiens par trimestre. La fraude à l'investissement est la première courbe presque chaque trimestre. Les arnaques à l'emploi montent le plus vite.",
    c2Title: "Pertes déclarées par type d'arnaque, 10 premiers",
    c2Note: "La fraude à l'investissement à 1,382 G$ vaut 4,7x le type suivant. Les 3 premiers types concentrent 72,8 % de toutes les pertes déclarées.",
    c3Title: "Pertes par tranche d'âge et type d'arnaque",
    c3Note: "Carte de chaleur des 6 premiers types sur 9 tranches d'âge, en millions de dollars canadiens. L'investissement mène chaque tranche. Les cellules vides portent une perte négligeable.",
    reports: "rapports",
    legend: { investments: "Investissements", romance: "Sentimentale", spearPhishing: "Hameçonnage ciblé", job: "Emploi" },
  },
  methodology: {
    kicker: "Méthodologie",
    title: "Comment le classement a été construit, et où il est faible.",
    items: [
      "Source : l'ensemble de données du Système de signalement des fraudes du Centre antifraude du Canada, open.canada.ca, éditeur Gendarmerie royale du Canada / CAFC. Couverture 2021-01-01 à 2025-09-30, extrait du 2025-10-01, fichier de 75,5 Mo, 350 361 lignes, récupéré le 2026-10-10.",
      "Analyse des pertes : le champ brut écrit les montants comme 1 234,56 $ avec symboles et séparateurs. L'analyseur n'accepte que du texte monétaire simple. Il n'a rejeté aucune ligne sur 350 361, et aucune ligne n'a été retirée des totaux.",
      "Tranches d'âge : le champ brut porte une apostrophe Excel initiale, comme '30 - 39, qui est retirée. 'Not Available / non disponible devient Not Available. 37,7 % des pertes déclarées n'ont pas d'âge de victime et sont comptées dans les totaux mais exclues de chaque vue par âge.",
      "Provinces : les graphies « North West Territories » et « Newfoundland And Labrador » sont canonisées. Les lignes dont la province est un État américain (2 399 lignes de pays États-Unis plus des entrées comme California et Texas) restent dans les totaux nationaux mais sont exclues du calcul par habitant. 19,9 % des pertes déclarées n'ont pas de province.",
      "Par habitant : estimations trimestrielles de la population de Statistique Canada, 1er juillet 2026, tableau 17-10-0009-01. Les territoires avec moins de 1 000 rapports sont signalés comme petit échantillon.",
      "Types de plainte : les lignes marquées Victime portent 100 % des 2,687 G$ de pertes déclarées. Les lignes Tentative portent 0 $ dans cet extrait. Les lignes Autre, Inconnu et Incomplet portent aussi 0 $.",
      "Quarantaine : aucune ligne n'a été mise en quarantaine hors des totaux. Les seules lignes signalées sont 10 entrées de province d'État américain exclues du classement par province, consignées dans meta.json.",
      "Tendances : les trimestres sont calculés à partir du champ date de réception. Le T4 2025 est partiel (les données s'arrêtent le 2025-09-30) et est exclu des comparaisons de croissance.",
      "Limites honnêtes : les pertes sont autodéclarées, pas vérifiées. Les rapports ne sont pas des victimes : un rapport est un rapport. La documentation du CAFC indique que l'exactitude dépend de la personne qui dépose.",
    ],
    contextTitle: "Pourquoi c'est important maintenant",
    contextBody: "Les chiffres annuels publiés par le CAFC situent les pertes par fraude de 2025 dans les centaines de millions de dollars, et le Sénat a tenu des audiences sur la vulnérabilité des aînés à la fraude. Ce projet transforme les propres lignes du CAFC en vue classée, par âge et par habitant, que l'agence ne publie jamais, pour que les banques, la police et les défenseurs des aînés visent les budgets de prévention sur les paires arnaque-démographie les plus coûteuses au lieu de lire des PDF annuels.",
  },
  developers: {
    kicker: "Pour les développeurs",
    title: "Interrogez-le depuis du code, ou depuis un agent.",
    body: "Trois façons de consommer les mêmes données normalisées. REST pour les applications, OpenAPI pour l'intégration, outils MCP en HTTP continu pour les agents IA.",
    endpoints: "Points de terminaison",
    tryIt: "Essayer",
    openapi: "Spécification OpenAPI",
    mcpTitle: "Serveur MCP",
    mcpBody: "Un point de terminaison HTTP continu. Outils : fraud_lookup, scam_ranking, trend.",
    downloadNote: "Tous les CSV nettoyés sont servis depuis le répertoire /data de ce site, issu de la même construction que l'API.",
  },
  mcp: {
    kicker: "Connectez votre agent",
    title: "Exploitez ces données dans vos outils d'IA.",
    body: "Choisissez votre plateforme, copiez l'invite, envoyez-la à votre agent. Votre agent exécute la configuration lui-même.",
    tabs: { chatgpt: "ChatGPT", claude: "Claude", claudecode: "Claude Code", cli: "CLI", other: "Autre" },
    cardTitle: "Copiez et envoyez ceci à {tab}",
    copy: "Copier",
    copied: "Copié",
    chatgptNote: "ChatGPT se connecte via l'API REST documentée plutôt que directement en MCP.",
    pChatgpt:
      "Je veux utiliser {displayName} via son API.\n- Spécification OpenAPI : {origin}/api/openapi.json\n- Base REST : {origin}/api/v1\nD'abord, dis-moi en deux phrases ce que cette API offre, puis {exampleLower}, et montre-moi le résultat.",
    pClaude:
      "Dans Claude (claude.ai), ouvre les paramètres, puis Connecteurs, et ajoute un connecteur personnalisé :\n- Nom : {displayName}\n- URL : {origin}/mcp\nEnsuite, liste les outils disponibles, {exampleLower}, et montre-moi le résultat.",
    pClaudeCode:
      "Configure le serveur MCP {displayName} pour que je puisse l'interroger d'ici.\n1. Exécute : claude mcp add --transport http {slug} {origin}/mcp\n2. Exécute `claude mcp list` pour confirmer la connexion.\n3. {example}, et montre-moi le résultat.",
    pCli:
      "# Point de terminaison MCP (HTTP continu)\n{origin}/mcp\n\n# Lister les outils disponibles\ncurl -s -X POST {origin}/mcp -H 'Content-Type: application/json' \\\n  -d '{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"tools/list\"}'",
    otherTitle: "Tout le reste",
    otherBody: "Toute plateforme qui parle MCP en HTTP continu, ou REST tout court.",
    mcpEndpoint: "Point de terminaison MCP",
    openapiSpec: "Spécification OpenAPI",
    restBase: "Base REST",
  },
  downloads: {
    kicker: "Données",
    title: "Prenez les fichiers.",
    body: "Les extraits nettoyés et les métadonnées de construction. Les mêmes fichiers que lit l'API. Licence MIT.",
    files: [
      { name: "scam-type-ranking.csv", desc: "39 types d'arnaque classés par perte déclarée, avec comptes de victimes et moyennes" },
      { name: "province-per-capita.csv", desc: "13 provinces et territoires : perte, rapports, population 2026, perte par habitant" },
      { name: "quarterly-trends.csv", desc: "Perte trimestrielle des 12 premiers types, T1 2021 au T3 2025" },
      { name: "age-band-by-scam-type.csv", desc: "Matrice des pertes : 9 tranches d'âge par 12 premiers types d'arnaque" },
    ],
    download: "Télécharger",
  },
  footer: {
    line: "Un projet indépendant à code source ouvert. Non affilié au gouvernement du Canada, à la GRC ni au CAFC.",
    sources: "Source : ensemble de données du Système de signalement des fraudes du Centre antifraude du Canada, open.canada.ca, extrait du 2025-10-01 (2021-01-01 à 2025-09-30). Récupéré le 2026-10-10. Domaine prévu : fraud.canada.nshipyard.com.",
    author: "Conçu par Richardson Dackam",
  },
};

const dicts: Record<Lang, Dict> = { en, fr };

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "en",
  setLang: () => {},
  t: en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return <LangCtx.Provider value={{ lang, setLang, t: dicts[lang] }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  return useContext(LangCtx);
}
