import { NextResponse } from "next/server";
import { trendSeries, getCategories } from "@/lib/data";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get("categories");
  const cats = raw
    ? raw.split(",").map((s) => s.trim()).filter(Boolean)
    : getCategories().slice(0, 4).map((c) => c.category);
  return NextResponse.json(trendSeries(cats));
}
