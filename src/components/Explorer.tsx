"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/i18n";

interface Triple {
  category: string;
  province: string;
  age: string;
  loss: number;
  reports: number;
}

interface ExploreResponse {
  total: number;
  hits: Triple[];
  summary: { loss: number; reports: number; avg: number };
  categories: string[];
  provinces: string[];
  ages: string[];
}

function fmtMoney(n: number, lang: string) {
  const loc = lang === "fr" ? "fr-CA" : "en-CA";
  if (n >= 1e9) return "$" + (n / 1e9).toLocaleString(loc, { maximumFractionDigits: 2 }) + (lang === "fr" ? " G$" : "B");
  if (n >= 1e6) return "$" + (n / 1e6).toLocaleString(loc, { maximumFractionDigits: 1 }) + (lang === "fr" ? " M$" : "M");
  if (n >= 1e3) return "$" + (n / 1e3).toLocaleString(loc, { maximumFractionDigits: 1 }) + "K";
  return "$" + n.toLocaleString(loc, { maximumFractionDigits: 0 });
}

function fmt(n: number, lang: string) {
  return n.toLocaleString(lang === "fr" ? "fr-CA" : "en-CA");
}

export default function Explorer() {
  const { t, lang } = useLang();
  const e = t.explorer;
  const [category, setCategory] = useState("");
  const [province, setProvince] = useState("");
  const [age, setAge] = useState("");
  const [res, setRes] = useState<ExploreResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setLoading(true);
      const params = new URLSearchParams();
      if (category) params.set("category", category);
      if (province) params.set("province", province);
      if (age) params.set("age", age);
      fetch(`/api/v1/explore?${params}`)
        .then((r) => r.json())
        .then((d) => setRes(d))
        .finally(() => setLoading(false));
    }, 200);
    return () => clearTimeout(id);
  }, [category, province, age]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={category}
          onChange={(ev) => setCategory(ev.target.value)}
          className="max-w-[300px] rounded-full border border-line bg-paper px-5 py-2.5 text-[15px] font-medium outline-none focus:border-canada"
          aria-label={e.allCategories}
        >
          <option value="">{e.allCategories}</option>
          {res?.categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={age}
          onChange={(ev) => setAge(ev.target.value)}
          className="rounded-full border border-line bg-paper px-5 py-2.5 text-[15px] font-medium outline-none focus:border-canada"
          aria-label={e.allAges}
        >
          <option value="">{e.allAges}</option>
          {res?.ages.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
        <select
          value={province}
          onChange={(ev) => setProvince(ev.target.value)}
          className="max-w-[300px] rounded-full border border-line bg-paper px-5 py-2.5 text-[15px] font-medium outline-none focus:border-canada"
          aria-label={e.allProvinces}
        >
          <option value="">{e.allProvinces}</option>
          {res?.provinces.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="mt-8">
        {!res && !loading && <p className="max-w-[640px] text-[15px] leading-relaxed text-ink/55">{e.empty}</p>}
        {res && (
          <>
            <div className="grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-3">
              <div className="bg-paper p-6">
                <p className="display text-[34px] text-canada">{fmtMoney(res.summary.loss, lang)}</p>
                <p className="mt-1 text-[14px] text-ink/60">{e.colLoss}</p>
              </div>
              <div className="bg-paper p-6">
                <p className="display text-[34px] text-canada">{fmt(res.summary.reports, lang)}</p>
                <p className="mt-1 text-[14px] text-ink/60">{e.colReports}</p>
              </div>
              <div className="bg-paper p-6">
                <p className="display text-[34px] text-canada">{fmt(res.total, lang)}</p>
                <p className="mt-1 text-[14px] text-ink/60">{e.sliceSummary}</p>
              </div>
            </div>
            <p className="mb-4 mt-8 text-[14px] text-ink/55">
              {e.showing} {fmt(res.hits.length, lang)} {e.of} {fmt(res.total, lang)}
              {loading && <span> …</span>}
            </p>
            {res.hits.length === 0 && <p className="text-[15px] text-ink/55">{e.noResult}</p>}
            {res.hits.length > 0 && (
              <div className="overflow-x-auto rounded-[24px] border border-line bg-paper">
                <table className="w-full min-w-[720px] text-left text-[14px]">
                  <thead>
                    <tr className="border-b border-line text-[12px] uppercase tracking-[0.08em] text-ink/50">
                      <th className="px-5 py-3.5 font-semibold">{e.colCategory}</th>
                      <th className="px-5 py-3.5 font-semibold">{e.colProvince}</th>
                      <th className="px-5 py-3.5 font-semibold">{e.colAge}</th>
                      <th className="px-5 py-3.5 text-right font-semibold">{e.colLoss}</th>
                      <th className="px-5 py-3.5 text-right font-semibold">{e.colReports}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {res.hits.map((h, i) => (
                      <tr key={`${h.category}-${h.province}-${h.age}-${i}`} className="border-b border-line/60 last:border-0 hover:bg-ink/[0.02]">
                        <td className="max-w-[260px] px-5 py-3.5 font-medium leading-snug">{h.category}</td>
                        <td className="px-5 py-3.5 text-ink/70">{h.province}</td>
                        <td className="whitespace-nowrap px-5 py-3.5 text-ink/70">{h.age}</td>
                        <td className="whitespace-nowrap px-5 py-3.5 text-right font-mono text-[13px] font-semibold text-canada">
                          {fmtMoney(h.loss, lang)}
                        </td>
                        <td className="whitespace-nowrap px-5 py-3.5 text-right font-mono text-[13px] text-ink/70">
                          {fmt(h.reports, lang)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
