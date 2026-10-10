import { NextResponse } from "next/server";
import { getHeatmap } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ heatmap: getHeatmap() });
}
