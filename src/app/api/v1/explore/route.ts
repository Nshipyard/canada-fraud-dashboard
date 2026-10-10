import { NextResponse } from "next/server";
import { exploreTriples, getCategories, getProvinces, getHeatmap } from "@/lib/data";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") ?? "50", 10) || 50, 1), 200);
  const f = {
    category: searchParams.get("category") ?? undefined,
    province: searchParams.get("province") ?? undefined,
    age: searchParams.get("age") ?? undefined,
  };
  const { total, hits, summary: full } = exploreTriples(f, limit);
  const avg = full.reports ? Math.round((full.loss / full.reports) * 100) / 100 : 0;
  return NextResponse.json({
    total,
    hits,
    summary: { loss: Math.round(full.loss * 100) / 100, reports: full.reports, avg },
    categories: getCategories().map((c) => c.category),
    provinces: getProvinces().map((p) => p.province),
    ages: getHeatmap().map((h) => h.age),
  });
}
