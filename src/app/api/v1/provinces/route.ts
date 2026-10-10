import { NextResponse } from "next/server";
import { getProvinces } from "@/lib/data";

export async function GET() {
  const provs = getProvinces();
  return NextResponse.json({ total: provs.length, provinces: provs });
}
