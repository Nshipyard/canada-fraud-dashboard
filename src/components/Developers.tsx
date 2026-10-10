"use client";

import { useLang } from "@/i18n";
import McpConnect from "./McpConnect";

const endpoints = [
  {
    method: "GET",
    path: "/api/v1/explore?category=Investments&province=Ontario",
    desc: "Filter the 1,829 precomputed scam-type, province, and age-band slices by any combination of facets",
    response: `{
  "total": 9,
  "summary": { "loss": 372341234.50, "reports": 6120, "avg": 60856.90 },
  "hits": [
    { "category": "Investments", "province": "Ontario", "age": "60 - 69",
      "loss": 124883401.22, "reports": 2043 }
  ]
}`,
  },
  {
    method: "GET",
    path: "/api/v1/ranking?limit=3",
    desc: "39 scam types ranked by reported loss, with victim counts and average loss per victim",
    response: `{
  "total": 39,
  "categories": [
    { "category": "Investments", "loss": 1382138342.47, "reports": 20394,
      "victim_reports_with_loss": 17132, "avg_loss_per_victim": 80676.23,
      "share": 51.44 }
  ]
}`,
  },
  {
    method: "GET",
    path: "/api/v1/provinces",
    desc: "13 provinces and territories ranked by reported loss per person, with 2026 populations",
    response: `{
  "provinces": [
    { "province": "British Columbia", "loss": 355311375.12, "reports": 33958,
      "population": 5710598, "loss_per_capita": 62.22, "unstable": false }
  ]
}`,
  },
];

export default function Developers() {
  const { t } = useLang();
  return (
    <section id="developers" className="bg-ink text-white">
      <div className="mx-auto max-w-[1392px] px-6 py-20 md:py-28">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/60">{t.developers.kicker}</p>
        <h2 className="display mt-4 max-w-[720px] text-[40px] md:text-[52px]">{t.developers.title}</h2>
        <p className="mt-5 max-w-[720px] text-[18px] leading-relaxed text-white/70">{t.developers.body}</p>

        <h3 className="mt-14 text-[13px] font-semibold uppercase tracking-[0.12em] text-white/60">{t.developers.endpoints}</h3>
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {endpoints.map((e) => (
            <article key={e.path} className="flex min-w-0 flex-col rounded-[24px] border border-white/15 bg-white/5 p-6">
              <p className="font-mono text-[12px] font-semibold text-white/60">{e.method}</p>
              <code className="mt-1 break-all font-mono text-[13px] text-white">{e.path}</code>
              <p className="mt-2 text-[14px] text-white/65">{e.desc}</p>
              <pre className="mt-4 flex-1 overflow-x-auto rounded-[16px] bg-black/40 p-4 font-mono text-[12px] leading-relaxed text-white/80">
                {e.response}
              </pre>
              <a
                href={e.path}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block self-start rounded-full border border-white/25 px-5 py-2 text-[14px] font-semibold hover:border-white"
              >
                {t.developers.tryIt} →
              </a>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <a href="/api/openapi.json" target="_blank" rel="noreferrer" className="block rounded-[24px] bg-white/[0.06] p-6 hover:bg-white/[0.09]">
            <h4 className="text-[19px] font-semibold">{t.developers.openapi}</h4>
            <code className="mt-2 block font-mono text-[13px] text-white/60">GET /api/openapi.json</code>
          </a>
        </div>

        <McpConnect
          config={{
            slug: "fraud-living",
            displayName: "Fraud Losses, Tracked",
            exampleEn: 'Rank scam types by reported loss and show me the top 3 with their per-victim averages',
            exampleFr: 'Classe les types d’arnaque par perte déclarée et montre-moi les 3 premiers avec leurs moyennes par victime',
          }}
        />
      </div>
    </section>
  );
}
