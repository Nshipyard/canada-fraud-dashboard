import { NextResponse } from "next/server";

const spec = {
  openapi: "3.1.0",
  info: {
    title: "Fraud, Living API",
    version: "1.0.0",
    description:
      "350,361 fraud reports and $2.687B in reported losses from the Canadian Anti-Fraud Centre Fraud Reporting System Dataset (2021-01-01 to 2025-09-30, extracted 2025-10-01), normalized by scam type, age band, and province, with per-capita math from StatCan quarterly population estimates. An independent open-source project, not affiliated with the Government of Canada, the RCMP, or the CAFC. MIT licensed.",
  },
  servers: [{ url: "https://fraud.canada.nshipyard.com/api/v1" }],
  paths: {
    "/summary": {
      get: {
        summary: "Headline aggregates: total reported loss, report counts, top scam type and share, top province per capita, vintage",
        responses: { "200": { description: "Summary aggregates" } },
      },
    },
    "/explore": {
      get: {
        summary: "Filter the 1,829 precomputed scam-type, province, and age-band slices by any combination of facets",
        parameters: [
          { name: "category", in: "query", required: false, schema: { type: "string" }, example: "Investments" },
          { name: "province", in: "query", required: false, schema: { type: "string" }, example: "Ontario" },
          { name: "age", in: "query", required: false, schema: { type: "string" }, example: "60 - 69" },
          { name: "limit", in: "query", required: false, schema: { type: "integer", default: 50, maximum: 200 } },
        ],
        responses: { "200": { description: "Matching slices with a summary row" } },
      },
    },
    "/ranking": {
      get: {
        summary: "39 scam types ranked by reported loss, with victim counts and average loss per victim report",
        parameters: [
          { name: "limit", in: "query", required: false, schema: { type: "integer", default: 39, maximum: 39 } },
        ],
        responses: { "200": { description: "Ranked scam-type list" } },
      },
    },
    "/provinces": {
      get: {
        summary: "13 provinces and territories ranked by reported loss per person, with 2026 populations",
        responses: { "200": { description: "Per-capita province ranking" } },
      },
    },
    "/trends": {
      get: {
        summary: "Quarterly reported-loss series, 2021-Q1 to 2025-Q3, for the requested scam types plus the overall total",
        parameters: [
          { name: "categories", in: "query", required: false, schema: { type: "string" }, example: "Investments,Job" },
        ],
        responses: { "200": { description: "Quarterly trend series" } },
      },
    },
    "/heatmap": {
      get: {
        summary: "Loss matrix: 9 victim age bands by the top 12 scam types",
        responses: { "200": { description: "Age-band heatmap data" } },
      },
    },
    "/methods": {
      get: {
        summary: "Solicitation methods ranked by reported loss and report count",
        responses: { "200": { description: "Solicitation method ranking" } },
      },
    },
  },
};

export async function GET() {
  return NextResponse.json(spec);
}
