import { NextResponse } from "next/server";
import { getCategories } from "@/lib/data";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") ?? "39", 10) || 39, 1), 39);
  const cats = getCategories();
  return NextResponse.json({ total: cats.length, categories: cats.slice(0, limit) });
}
