import { NextResponse } from "next/server";
import { getMeta, getCategories, getProvinces } from "@/lib/data";

export async function GET() {
  const meta = getMeta();
  const cats = getCategories();
  const provs = getProvinces();
  return NextResponse.json({
    total_loss_cad: meta.total_loss,
    reports: meta.raw_rows,
    kept_rows: meta.kept_rows,
    period: meta.period,
    top_scam_type: cats[0]?.category,
    top_scam_type_share: cats[0]?.share,
    investment_loss_cad: cats.find((c) => c.category === "Investments")?.loss,
    top_province_per_capita: provs[0]?.province,
    quarantine_rows: meta.quarantine_rows,
  });
}
