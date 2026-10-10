import { NextResponse } from "next/server";
import { getMethods } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ methods: getMethods() });
}
