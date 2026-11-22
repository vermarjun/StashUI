// The MCP door: a stateless Streamable HTTP endpoint with no login.
//
// It speaks both eras of the protocol, because clients in the field are split:
//   legacy  (2025-11-25 and earlier): an `initialize` handshake, then calls
//   modern  (2026-07-28): no handshake; every request carries its version in `_meta`
// Stateless on purpose. There is no session to lose, so any instance can answer
// any request and the endpoint can sit behind a cache or a load balancer.
import { compose } from "./sheet.mjs";
import { TOOLS, callWithMeaning } from "./tools.mjs";

const MODERN = "2026-07-28";
const LEGACY = ["2025-11-25", "2025-06-18", "2025-03-26"];
const SUPPORTED = [MODERN, ...LEGACY];
const VERSION_KEY = "io.modelcontextprotocol/protocolVersion";
const SERVER = { name: "stashui", title: "StashUI", version: "1.0.0" };

export const INSTRUCTIONS =
  "StashUI is a catalogue of ready-made React components you can SEE. " +
  "Plan the page, then: browse (what exists) -> search (a numbered image of matches) -> view (six frames of your top two) -> " +
  "board (all picks together; they must look like one product) -> add (install). " +
  "Choose from the image first and the cost in the text second. Never choose a component you have not viewed. " +
  "Prefer a catalogue component over writing one; when two searches find nothing, say so and build that piece yourself.";

const toolList = () => Object.entries(TOOLS).map(([name, t]) => ({
  name, description: t.description, inputSchema: t.input,
  annotations: { readOnlyHint: true, openWorldHint: false },
}));

const err = (id, code, message, data) => ({ jsonrpc: "2.0", id: id ?? null, error: { code, message, ...(data && { data }) } });

/**
 * @param {any} msg     one parsed JSON-RPC message
 * @param {string|null} header  the MCP-Protocol-Version request header
 * @param {string} origin  where sheets are served from, for the fallback link
 * @returns {Promise<{status: number, body?: any}>}
 */
export async function handleMcp(msg, header, origin) {
  if (!msg || msg.jsonrpc !== "2.0" || typeof msg.method !== "string") return { status: 400, body: err(msg?.id, -32600, "Invalid Request") };
  if (msg.id === undefined) return { status: 202 };                     // a notification: accepted, nothing to say

  const meta = msg.params?._meta || {};
  const modern = VERSION_KEY in meta || msg.method === "server/discover";
  const done = (result) => ({ status: 200, body: { jsonrpc: "2.0", id: msg.id, result: modern ? { resultType: "complete", ...result } : result } });
  const cached = (result) => done(modern ? { ...result, ttlMs: 300000, cacheScope: "public" } : result);

  if (modern) {
    const version = meta[VERSION_KEY] || header || MODERN;
    if (header && meta[VERSION_KEY] && header !== meta[VERSION_KEY]) return { status: 400, body: err(msg.id, -32020, "Header mismatch: MCP-Protocol-Version differs from the request body") };
    if (version !== MODERN) return { status: 400, body: err(msg.id, -32022, "Unsupported protocol version", { supported: SUPPORTED, requested: version }) };
  } else if (header && !SUPPORTED.includes(header)) {
    return { status: 400, body: err(msg.id, -32022, "Unsupported protocol version", { supported: SUPPORTED, requested: header }) };
  }

  switch (msg.method) {
    case "initialize": {                                                // legacy handshake: echo their version if we speak it
      const asked = msg.params?.protocolVersion;
      return done({ protocolVersion: LEGACY.includes(asked) ? asked : LEGACY[0], capabilities: { tools: {} }, serverInfo: SERVER, instructions: INSTRUCTIONS });
    }
    case "server/discover":
      return cached({ supportedVersions: SUPPORTED, capabilities: { tools: {} }, instructions: INSTRUCTIONS, _meta: { "io.modelcontextprotocol/serverInfo": SERVER } });
    case "ping":
      return done({});
    case "tools/list":
      return cached({ tools: toolList() });
    case "tools/call": {
      const name = msg.params?.name;
      if (!TOOLS[name]) return { status: 200, body: err(msg.id, -32602, `Unknown tool: ${name}`) };
      let out;
      try { out = await callWithMeaning(name, msg.params.arguments || {}); }
      catch (e) { out = { text: `StashUI failed on ${name}: ${e.message}`, isError: true }; }
      const content = [];
      if (out.sheet) {
        const { encodeSpec } = await import("./sheet.mjs");
        const url = `${origin}/api/agent/v1/sheet?s=${encodeSpec(out.sheet)}`;
        // No structuredContent anywhere: at least one client drops images when it is present.
        content.push({ type: "text", text: `${out.text}\nIf you cannot see the image, download it and open the file: ${url}` });
        content.push({ type: "image", data: (await compose(out.sheet)).toString("base64"), mimeType: "image/jpeg" });
      } else content.push({ type: "text", text: out.text });
      return done({ content, isError: !!out.isError });
    }
    default:
      return { status: modern ? 404 : 200, body: err(msg.id, -32601, `Method not found: ${msg.method}`) };
  }
}
