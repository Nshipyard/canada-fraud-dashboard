# Fraud, Living (SKILL.md)

## What this skill covers

The canada-fraud-dashboard project: the Canadian Anti-Fraud Centre Fraud Reporting System Dataset (350,361 reports, $2.687B reported losses, extract 2025-10-01, coverage 2021-01-01 to 2025-09-30) normalized, ranked, and served over REST and MCP. Use this skill whenever answering a question about fraud in Canada, scam-type rankings, age-band or provincial loss patterns, or fraud trends.

## What the data answers

- Which scams drain the most money (Investments $1.382B, 51.5%; Romance $292.7M; Spear Phishing $281.7M) and which hits hardest per victim (Spear Phishing $102,911 per victim report).
- Which age groups lose the most (60-69: $429M; average per victim climbs with age and peaks at $49,708) and the honest gap (37.7% of losses carry no age).
- Which provinces pay the most per person (BC and Ontario $62, Quebec $26; territories flagged small-sample) and the honest gap (19.9% of losses carry no province; grain is province only).
- Which scams are growing fastest (Job 7.5x, Bank Investigator 5.1x, Investments 4.5x from Q1 2021 to Q3 2025) and through which channels (Internet-social network $828.8M, Internet $678.3M, direct calls most reports at 81,723).
- Filterable slices: any scam type x province x age band combination (1,829 precomputed).

## Tool usage

Prefer the MCP tools over reading files. They are the canonical interface:

1. `fraud_lookup` with `category`, `province`, `age`, `limit`: matching slices.
2. `scam_ranking` with `limit`: 39 scam types by reported loss.
3. `trend` with `categories` (comma-separated): quarterly loss series 2021-Q1 to 2025-Q3.

REST equivalents live under `/api/v1/` (see README.md), plus `/api/openapi.json` (OpenAPI 3.1).

## Rules

- Every number in an answer must come from the tools or `public/data/*.json`. Never invent a number.
- Always state the two honest gaps when giving age or province numbers: 37.7% no age, 19.9% no province. Province grain only.
- Always state that all losses come from Victim rows, attempts carry $0, and losses are self-reported.
- No em dashes in any output. Direct plain language. Every sentence carries a number, a mechanism, or a reason.
