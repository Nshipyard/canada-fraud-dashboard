import { NextResponse } from "next/server";
import {
  getMeta,
  getCategories,
  exploreTriples,
  trendSeries,
} from "@/lib/data";

// Minimal MCP server over streamable HTTP (JSON-RPC 2.0 via POST).
// Supports: initialize, tools/list, tools/call. Stateless.

const SERVER = { name: "canada-fraud-dashboard", version: "1.0.0" };

const TOOLS = [
  {
    name: "fraud_lookup",
    description:
      "Filter the 1,829 precomputed scam-type x province x age-band slices by any combination of scam type, province, and age band. Data: CAFC Fraud Reporting System Dataset, 2021-01-01 to 2025-09-30, extracted 2025-10-01. Geographic grain is province only; 19.9% of losses carry no province and 37.7% no age.",
    inputSchema: {
      type: "object",
      properties: {
        category: { type: "string", description: "Scam type, e.g. Investments" },
        province: { type: "string", description: "Province, e.g. Ontario" },
        age: { type: "string", description: "Age band, e.g. 60 - 69" },
        limit: { type: "integer", description: "Max slices, default 25" },
      },
    },
  },
  {
    name: "scam_ranking",
    description:
      "Rank the 39 CAFC scam types by reported loss, with report counts and average loss per victim report.",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "integer", description: "Max scam types, default 10" },
      },
    },
  },
  {
    name: "trend",
    description:
      "Quarterly reported-loss series, 2021-Q1 to 2025-Q3, for the requested scam types plus the overall total. Q4 2025 is partial (data stops 2025-09-30).",
    inputSchema: {
      type: "object",
      properties: {
        categories: {
          type: "string",
          description: "Comma-separated scam types, e.g. Investments,Job. Defaults to top 4.",
        },
      },
    },
  },
];

function ok(id: unknown, result: unknown) {
  return { jsonrpc: "2.0", id, result };
}
function err(id: unknown, code: number, message: string) {
  return { jsonrpc: "2.0", id, error: { code, message } };
}
function textResult(data: unknown) {
  return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handle(msg: any) {
  if (!msg || msg.jsonrpc !== "2.0" || typeof msg.method !== "string") {
    return err(msg?.id ?? null, -32600, "Invalid Request");
  }
  const id = msg.id ?? null;
  switch (msg.method) {
    case "initialize":
      return ok(id, {
        protocolVersion: "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: SERVER,
      });
    case "notifications/initialized":
      return null;
    case "tools/list":
      return ok(id, { tools: TOOLS });
    case "tools/call": {
      const { name, arguments: args } = msg.params ?? {};
      try {
        if (name === "fraud_lookup") {
          const limit = Math.min(Math.max(parseInt(String(args.limit ?? "25"), 10) || 25, 1), 200);
          const res = exploreTriples(
            {
              category: args.category ? String(args.category) : undefined,
              province: args.province ? String(args.province) : undefined,
              age: args.age ? String(args.age) : undefined,
            },
            limit
          );
          return ok(id, textResult({ ...res, meta: getMeta().honest_limits }));
        }
        if (name === "scam_ranking") {
          const limit = Math.min(Math.max(parseInt(String(args.limit ?? "10"), 10) || 10, 1), 39);
          return ok(id, textResult({ total: 39, categories: getCategories().slice(0, limit) }));
        }
        if (name === "trend") {
          const catsRaw = String(args.categories ?? "Investments,Romance,Spear Phishing,Job");
          const cats = catsRaw
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
          return ok(id, textResult({ ...trendSeries(cats), caveat: "Q4 2025 is partial; data stops 2025-09-30." }));
        }
        return err(id, -32602, `Unknown tool ${name}`);
      } catch (e) {
        return err(id, -32000, `Tool error: ${(e as Error).message}`);
      }
    }
    default:
      return err(id, -32601, `Method not found: ${msg.method}`);
  }
}

export async function POST(req: Request) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(err(null, -32700, "Parse error"), { status: 400 });
  }
  if (Array.isArray(body)) {
    const out = body.map(handle).filter((r) => r !== null);
    return NextResponse.json(out);
  }
  const out = handle(body);
  if (out === null) return new NextResponse(null, { status: 202 });
  return NextResponse.json(out);
}

export async function GET() {
  return NextResponse.json(
    { error: "This MCP server accepts JSON-RPC 2.0 via POST only." },
    { status: 405 }
  );
}

export async function DELETE() {
  return new NextResponse(null, { status: 405 });
}
