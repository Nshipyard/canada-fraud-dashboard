"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/i18n";

const RED = "#d80621";
const RED_DARK = "#a80419";
const INK = "#0a0f1e";
const GRID = "rgba(10,15,30,0.08)";

interface TrendSeriesData {
  quarters: string[];
  total: number[];
  byCategory: Record<string, number[]>;
}
interface CategoryRow {
  category: string;
  loss: number;
  reports: number;
  victim_reports_with_loss: number;
  avg_loss_per_victim: number;
  share: number;
}
interface HeatRow {
  age: string;
  cells: Record<string, number>;
  band_total: number;
  band_avg_per_report_with_loss: number;
}

const SERIES = ["Investments", "Romance", "Spear Phishing", "Job"];
const COLORS: Record<string, string> = {
  Investments: RED,
  Romance: INK,
  "Spear Phishing": RED_DARK,
  Job: "#8a8f98",
};

function fmtM(n: number, lang: string) {
  const loc = lang === "fr" ? "fr-CA" : "en-CA";
  return "$" + (n / 1e6).toLocaleString(loc, { maximumFractionDigits: 0 }) + (lang === "fr" ? " M$" : "M");
}

function ChartShell({ children, caption }: { children: React.ReactNode; caption: string }) {
  return (
    <div className="rounded-[28px] border border-line bg-paper p-6 md:p-10">
      <div className="overflow-x-auto">
        <div className="min-w-[640px]">{children}</div>
      </div>
      <p className="mt-4 max-w-[760px] text-[13px] leading-relaxed text-ink/55">{caption}</p>
    </div>
  );
}

/** Quarterly reported-loss lines for four scam types. */
function TrendLines({ data, lang }: { data: TrendSeriesData; lang: string }) {
  const { t } = useLang();
  const W = 1000;
  const H = 380;
  const PL = 60;
  const PR = 30;
  const PT = 24;
  const PB = 64;
  const innerW = W - PL - PR;
  const innerH = H - PT - PB;
  const n = data.quarters.length;
  const max = Math.max(1, ...SERIES.flatMap((s) => data.byCategory[s] ?? []));
  const x = (i: number) => PL + (i / Math.max(1, n - 1)) * innerW;
  const y = (v: number) => PT + innerH - (v / max) * innerH;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * max);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={t.charts.c1Title}>
      {ticks.map((v) => (
        <g key={v}>
          <line x1={PL} x2={W - PR} y1={y(v)} y2={y(v)} stroke={GRID} strokeWidth={1} />
          <text x={PL - 10} y={y(v) + 4} textAnchor="end" fontSize={12} fill={INK} opacity={0.55}>
            {fmtM(v, lang)}
          </text>
        </g>
      ))}
      {SERIES.map((s) => (
        <polyline
          key={s}
          points={(data.byCategory[s] ?? []).map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ")}
          fill="none"
          stroke={COLORS[s]}
          strokeWidth={s === "Investments" ? 3 : 2}
          opacity={s === "Investments" ? 1 : 0.85}
        />
      ))}
      {data.quarters.map((q, i) =>
        i % 4 === 0 ? (
          <text key={q} x={x(i)} y={H - PB + 26} textAnchor="middle" fontSize={12} fill={INK} opacity={0.55}>
            {q}
          </text>
        ) : null
      )}
      <g transform={`translate(${PL}, ${H - 14})`}>
        {SERIES.map((s, i) => (
          <g key={s} transform={`translate(${i * 230}, 0)`}>
            <line x1={0} x2={22} y1={-4} y2={-4} stroke={COLORS[s]} strokeWidth={3} />
            <text x={28} y={0} fontSize={13} fill={INK}>
              {t.charts.legend[s === "Investments" ? "investments" : s === "Romance" ? "romance" : s === "Spear Phishing" ? "spearPhishing" : "job"]}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Top-10 scam types by reported loss, horizontal bars. */
function CategoryBars({ rows, lang }: { rows: CategoryRow[]; lang: string }) {
  const top = rows.slice(0, 10);
  const max = Math.max(1, ...top.map((r) => r.loss));
  const W = 1000;
  const rowH = 50;
  const H = top.length * rowH + 16;
  const labelW = 300;
  const barMax = W - labelW - 190;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img">
      {top.map((r, i) => {
        const y = i * rowH;
        const w = Math.max(4, (r.loss / max) * barMax);
        return (
          <g key={r.category}>
            <text x={0} y={y + 28} fontSize={15} fill={INK}>
              <tspan fill={INK} opacity={0.45} fontSize={13} fontFamily="monospace">
                {i + 1}
              </tspan>
              <tspan dx={10}>{r.category}</tspan>
            </text>
            <rect x={labelW} y={y + 12} width={w} height={22} rx={11} fill={RED} opacity={i === 0 ? 1 : 0.45} />
            <text x={labelW + w + 12} y={y + 29} fontSize={14} fontWeight={700} fill={i === 0 ? RED_DARK : INK} opacity={i === 0 ? 1 : 0.7}>
              {fmtM(r.loss, lang)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** Age-band x scam-type heatmap, top 6 categories. */
function AgeHeatmap({ rows, cats, lang }: { rows: HeatRow[]; cats: string[]; lang: string }) {
  const max = Math.max(1, ...rows.flatMap((r) => cats.map((c) => r.cells[c] ?? 0)));
  const W = 1000;
  const labelW = 110;
  const cellW = (W - labelW) / cats.length;
  const cellH = 56;
  const H = rows.length * cellH + 56;

  function fill(v: number) {
    const f = v / max;
    // white to canada red, through warm pink
    const r = Math.round(255 - f * (255 - 216));
    const g = Math.round(255 - f * (255 - 6));
    const b = Math.round(255 - f * (255 - 33));
    return `rgb(${r},${g},${b})`;
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img">
      {cats.map((c, i) => (
        <text key={c} x={labelW + i * cellW + cellW / 2} y={22} textAnchor="middle" fontSize={12.5} fill={INK} opacity={0.7}>
          {c.length > 16 ? c.slice(0, 15) + "…" : c}
        </text>
      ))}
      {rows.map((r, j) => (
        <g key={r.age}>
          <text x={labelW - 12} y={56 + j * cellH + cellH / 2 + 5} textAnchor="end" fontSize={13} fill={INK}>
            {r.age}
          </text>
          {cats.map((c, i) => {
            const v = r.cells[c] ?? 0;
            return (
              <g key={c}>
                <rect
                  x={labelW + i * cellW + 2}
                  y={56 + j * cellH + 2}
                  width={cellW - 4}
                  height={cellH - 4}
                  rx={8}
                  fill={fill(v)}
                  stroke={GRID}
                />
                {v >= max * 0.06 && (
                  <text
                    x={labelW + i * cellW + cellW / 2}
                    y={56 + j * cellH + cellH / 2 + 5}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={600}
                    fill={v >= max * 0.45 ? "#ffffff" : INK}
                  >
                    {fmtM(v, lang)}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
}

export default function Charts() {
  const { t, lang } = useLang();
  const [trends, setTrends] = useState<TrendSeriesData | null>(null);
  const [cats, setCats] = useState<CategoryRow[]>([]);
  const [heat, setHeat] = useState<HeatRow[]>([]);

  useEffect(() => {
    fetch("/api/v1/trends?categories=Investments,Romance,Spear%20Phishing,Job").then((r) => r.json()).then((d) => setTrends(d));
    fetch("/api/v1/ranking?limit=12").then((r) => r.json()).then((d) => setCats(d.categories ?? []));
    fetch("/api/v1/heatmap").then((r) => r.json()).then((d) => setHeat(d.heatmap ?? []));
  }, []);

  if (!trends || cats.length === 0 || heat.length === 0) return null;
  const heatCats = cats.slice(0, 6).map((c) => c.category);

  return (
    <section id="charts" className="bg-paper-warm">
      <div className="mx-auto max-w-[1392px] px-6 py-20 md:py-28">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-canada">{t.charts.kicker}</p>
        <h2 className="display mt-4 max-w-[720px] text-[40px] md:text-[52px]">{t.charts.title}</h2>
        <p className="mt-5 max-w-[720px] text-[18px] leading-relaxed text-ink/70">{t.charts.body}</p>

        <div className="mt-10">
          <h3 className="display max-w-[800px] text-[26px] leading-tight md:text-[32px]">{t.charts.c1Title}</h3>
          <div className="mt-5">
            <ChartShell caption={t.charts.c1Note}>
              <TrendLines data={trends} lang={lang} />
            </ChartShell>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="display max-w-[800px] text-[26px] leading-tight md:text-[32px]">{t.charts.c2Title}</h3>
          <div className="mt-5">
            <ChartShell caption={t.charts.c2Note}>
              <CategoryBars rows={cats.slice(0, 10)} lang={lang} />
            </ChartShell>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="display max-w-[800px] text-[26px] leading-tight md:text-[32px]">{t.charts.c3Title}</h3>
          <div className="mt-5">
            <ChartShell caption={t.charts.c3Note}>
              <AgeHeatmap rows={heat} cats={heatCats} lang={lang} />
            </ChartShell>
          </div>
        </div>
      </div>
    </section>
  );
}
