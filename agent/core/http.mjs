// One request handler, mounted by the Next.js routes in production and by
// agent/dev-server.mjs for tests. Three doors onto the same six operations:
//
//   POST /api/mcp                       MCP clients (image arrives inline)
//   GET  /api/agent/v1/<op>?…           the CLI and anything that can fetch (image arrives as a URL)
//   GET  /api/agent/v1/sheet?s=<spec>   the image itself
import { INSTRUCTIONS, handleMcp } from "./mcp.mjs";
import { compose, decodeSpec, encodeSpec } from "./sheet.mjs";
import { TOOLS, call } from "./tools.mjs";

const CORS = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "GET, POST, OPTIONS" };
const json = (status, body, extra = {}) => ({ status, headers: { "content-type": "application/json; charset=utf-8", ...CORS, ...extra }, body: JSON.stringify(body) });

// composed sheets are deterministic, so a small memory cache makes repeat views free
const sheets = new Map();
async function sheetFor(spec) {
  if (!sheets.has(spec)) {
    const cells = decodeSpec(spec).cells;
    if (!Array.isArray(cells) || cells.length < 1 || cells.length > 20) throw new Error("a sheet holds 1 to 20 cells");
    sheets.set(spec, await compose(decodeSpec(spec)));
    if (sheets.size > 300) sheets.delete(sheets.keys().next().value);
  }
  return sheets.get(spec);
}

/** Query strings carry everything as text; turn them back into what each operation declares. */
function coerce(op, query) {
  const props = TOOLS[op].input.properties, args = {};
  for (const [k, v] of Object.entries(query)) {
    const p = props[k];
    if (!p || v === "") continue;
    args[k] = p.type === "array" ? v.split(",").map((s) => s.trim()).filter(Boolean) : p.type === "integer" ? parseInt(v, 10) : p.type === "boolean" ? v === "true" || v === "1" : v;
  }
  return args;
}

/**
 * @param {{method: string, path: string, query: Record<string,string>, headers: Record<string,string>, origin: string, body?: any}} req
 * @returns {Promise<{status: number, headers: Record<string,string>, body?: string|Buffer}>}
 */
export async function handle(req) {
  if (req.method === "OPTIONS") return { status: 204, headers: CORS };

  if (req.path === "/api/mcp") {
    if (req.method !== "POST") return json(405, { error: "POST JSON-RPC here. This endpoint is stateless and opens no stream." }, { allow: "POST" });
    const out = await handleMcp(req.body, req.headers["mcp-protocol-version"] || null, req.origin);
    return out.body ? json(out.status, out.body) : { status: out.status, headers: CORS };
  }

  const op = req.path.replace(/^\/api\/agent\/v1\/?/, "");
  if (req.method !== "GET") return json(405, { error: "GET only" }, { allow: "GET" });

  if (op === "") {                                                        // the API describes itself
    return json(200, {
      name: "StashUI agent API", protocol: "1", instructions: INSTRUCTIONS, mcp: `${req.origin}/api/mcp`, setup: `${req.origin}/setup.md`,
      operations: Object.fromEntries(Object.entries(TOOLS).map(([k, t]) => [k, { description: t.description, input: t.input }])),
    }, { "cache-control": "public, max-age=300" });
  }
  if (op === "sheet") {
    try {
      return { status: 200, headers: { "content-type": "image/jpeg", "cache-control": "public, max-age=3600", ...CORS }, body: await sheetFor(req.query.s || "") };
    } catch (e) { return json(400, { error: `Bad sheet spec: ${e.message}` }); }
  }
  if (!TOOLS[op]) return json(404, { error: `Unknown operation "${op}".`, operations: Object.keys(TOOLS) });
  try {
    const out = call(op, coerce(op, req.query));
    return json(out.isError ? 400 : 200, {
      text: out.text,
      ...(out.sheet && { sheet: `${req.origin}/api/agent/v1/sheet?s=${encodeSpec(out.sheet)}`, tokens: out.tokens }),
      ...(out.data && { data: out.data }),
    });
  } catch (e) { return json(500, { error: `StashUI failed on ${op}: ${e.message}` }); }
}
