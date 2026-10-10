// Data access for canada-fraud-dashboard. All numbers come from the computed
// JSON files in public/data (built from the CAFC Fraud Reporting System
// Dataset, 2021-01-01 to 2025-09-30, extracted 2025-10-01).
import fs from "fs";
import path from "path";

const DIR = path.join(process.cwd(), "public", "data");

function read<T>(name: string): T {
  return JSON.parse(fs.readFileSync(path.join(DIR, name), "utf8")) as T;
}

export interface Meta {
  title: string;
  publisher: string;
  source_url: string;
  period: string;
  retrieved: string;
  raw_rows: number;
  kept_rows: number;
  total_loss: number;
  victim_row_share_of_loss: number;
  quarantine: Record<string, number>;
  quarantine_rows: number;
  honest_limits: string[];
}

export interface CategoryRow {
  category: string;
  loss: number;
  reports: number;
  victim_reports_with_loss: number;
  avg_loss_per_victim: number;
  share: number;
}

export interface HeatRow {
  age: string;
  cells: Record<string, number>;
  band_total: number;
  band_avg_per_report_with_loss: number;
}

export interface ProvinceRow {
  province: string;
  loss: number;
  reports: number;
  population: number;
  loss_per_capita: number;
  unstable: boolean;
}

export interface TrendPoint {
  quarter: string;
  total: number;
  by_category: Record<string, number>;
}

export interface MethodRow {
  method: string;
  loss: number;
  reports: number;
}

export interface Triple {
  category: string;
  province: string;
  age: string;
  loss: number;
  reports: number;
}

const cache = new Map<string, unknown>();

function load<T>(name: string): T {
  if (!cache.has(name)) cache.set(name, read<T>(name));
  return cache.get(name) as T;
}

export function getMeta(): Meta {
  return load<Meta>("meta.json");
}
export function getCategories(): CategoryRow[] {
  return load<CategoryRow[]>("category_ranking.json");
}
export function getHeatmap(): HeatRow[] {
  return load<HeatRow[]>("age_heatmap.json");
}
export function getProvinces(): ProvinceRow[] {
  return load<ProvinceRow[]>("province_ranking.json");
}
export function getTrends(): TrendPoint[] {
  return load<TrendPoint[]>("trends.json");
}
export function getMethods(): MethodRow[] {
  return load<MethodRow[]>("methods.json");
}
export function getTriples(): Triple[] {
  return load<{ triples: Triple[] }>("slices.json").triples;
}

export interface ExploreFilter {
  category?: string;
  province?: string;
  age?: string;
}

/** Filter the precomputed category x province x age triples by any subset of the three facets. */
export function exploreTriples(f: ExploreFilter, limit = 50): {
  total: number;
  hits: Triple[];
  summary: { loss: number; reports: number };
} {
  const all = getTriples();
  const hits = all.filter(
    (t) =>
      (!f.category || t.category === f.category) &&
      (!f.province || t.province === f.province) &&
      (!f.age || t.age === f.age)
  );
  const loss = hits.reduce((s, h) => s + h.loss, 0);
  const reports = hits.reduce((s, h) => s + h.reports, 0);
  return { total: hits.length, hits: hits.slice(0, limit), summary: { loss, reports } };
}

/** Loss and reports for one category, or for all. */
export function categorySummary(category?: string): { loss: number; reports: number; avg: number } {
  const rows = category ? getCategories().filter((c) => c.category === category) : getCategories();
  const loss = rows.reduce((s, r) => s + r.loss, 0);
  const vic = rows.reduce((s, r) => s + r.victim_reports_with_loss, 0);
  return { loss, reports: rows.reduce((s, r) => s + r.reports, 0), avg: vic ? loss / vic : 0 };
}

/** Quarterly series for the given categories plus the total. */
export function trendSeries(categories: string[]): { quarters: string[]; total: number[]; byCategory: Record<string, number[]> } {
  const trends = getTrends();
  return {
    quarters: trends.map((t) => t.quarter),
    total: trends.map((t) => t.total),
    byCategory: Object.fromEntries(categories.map((c) => [c, trends.map((t) => t.by_category[c] ?? 0)])),
  };
}
