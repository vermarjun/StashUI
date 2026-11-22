// The contracts an agent relies on: image budgets, legend/number agreement,
// both MCP eras, and that what is published matches what is on disk.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
process.env.STASHUI_PUBLIC = join(ROOT, "public");
const { compose, layout, sheetTokens, encodeSpec, decodeSpec, SHEET_W, SHEET_MAX_H } = await import("../core/sheet.mjs");
const { catalog } = await import("../core/catalog.mjs");
const { call, TOOLS } = await import("../core/tools.mjs");
const { handleMcp } = await import("../core/mcp.mjs");
const { handle } = await import("../core/http.mjs");
const { kindsIn, rank } = await import("../core/search.mjs");

const cat = catalog();
const get = (path, query = {}) => handle({ method: "GET", path, query, headers: {}, origin: "http://test" });

test("every sheet fits the budget a model keeps at full resolution", () => {
  for (const [n, cols] of [[2, 2], [4, 2], [6, 3], [12, 4], [20, 5], [1, 2]]) {
    const L = layout(n, cols);
    assert.equal(L.W, SHEET_W);
    assert.ok(L.H <= SHEET_MAX_H, `${n} cells: ${L.H}px tall`);
    assert.ok(sheetTokens(n, cols) <= 1568, `${n} cells: ${sheetTokens(n, cols)} tokens`);
    assert.ok(L.cellW >= 280, `${n} cells: ${L.cellW}px cells are too small to judge`);
  }
});

test("a sheet is a JPEG of the promised size, and the same spec gives the same bytes", async () => {
  const names = cat.items.filter((i) => i.tile).slice(0, 12).map((i) => i.name);
  const spec = { cols: 4, cells: names.map((name, i) => ({ name, badge: String(i + 1) })) };
  const a = await compose(spec), b = await compose(decodeSpec(encodeSpec(spec)));
  const meta = await sharp(a).metadata();
  assert.equal(meta.format, "jpeg");
  assert.deepEqual([meta.width, meta.height], [1456, layout(12, 4).H]);
  assert.ok(a.equals(b));
  assert.ok(a.length < 400_000, `sheet is ${a.length} bytes`);
});

test("a missing tile renders a placeholder instead of failing the sheet", async () => {
  const jpg = await compose({ cols: 2, cells: [{ name: "does-not-exist", badge: "1" }, { name: "", badge: "-" }] });
  assert.equal((await sharp(jpg).metadata()).format, "jpeg");
});

test("the catalogue is internally consistent", () => {
  assert.ok(cat.items.length > 1000);
  for (const it of cat.items) {
    assert.ok(cat.kindById.has(it.kind), `${it.name}: unknown kind ${it.kind}`);
    assert.ok(it.blurb, `${it.name}: no blurb`);
    assert.ok(existsSync(join(ROOT, "public/agent/items", `${it.name}.json`)), `${it.name}: no detail file`);
    if (it.tile) assert.ok(existsSync(join(ROOT, "public/agent/tiles", `${it.name}.webp`)) && existsSync(join(ROOT, "public/agent/film", `${it.name}.webp`)), `${it.name}: tile or film missing`);
  }
  assert.equal(cat.kinds.reduce((n, k) => n + k.count, 0), cat.items.length);
});

test("search: the legend's numbers are the image's numbers, and pages continue the count", () => {
  const p1 = call("search", { query: "button", kind: "button" }), p2 = call("search", { query: "button", kind: "button", page: 2 });
  assert.equal(p1.sheet.cells.length, 12);
  p1.sheet.cells.forEach((c, i) => {
    assert.equal(c.badge, String(i + 1));
    assert.match(p1.text.split("\n")[i + 1], new RegExp(`^\\s*${i + 1}\\s+${c.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s`));
  });
  assert.equal(p2.sheet.cells[0].badge, "13");
  assert.equal(new Set([...p1.sheet.cells, ...p2.sheet.cells].map((c) => c.name)).size, 24, "a component must not repeat across pages");
  assert.equal(call("search", { query: "button", kind: "button", dense: true }).sheet.cells.length, 20);
});

test("search routes a plain sentence to the kind it names, and filters hold", () => {
  assert.deepEqual(kindsIn("navbar with links and a sign up button"), ["site-header"]);
  assert.deepEqual(kindsIn("pricing table with a monthly toggle"), ["pricing-section"]);
  assert.deepEqual(kindsIn("something quiet and dark"), []);
  for (const n of rank({ query: "", kind: "button", clean: true }).names) assert.equal(cat.byName.get(n).colours, 0);
  for (const n of rank({ query: "glow", kind: "button" }).names) assert.equal(cat.byName.get(n).kind, "button");
});

test("operations fail in words an agent can act on", () => {
  const typo = call("view", { name: "comp-578x" });
  assert.ok(typo.isError && /Closest: .*comp-578/.test(typo.text));
  assert.ok(call("search", {}).isError);
  assert.ok(call("search", { query: "x", kind: "nope" }).isError);
  assert.ok(call("nope", {}).isError);
  assert.ok(!call("search", { query: "zzzzqqqq xkcdfoo" }).sheet);
});

test("view shows six frames numbered 1 to 6, and add returns one command", () => {
  const name = cat.items.find((i) => i.film?.length === 6).name;
  const v = call("view", { name });
  assert.deepEqual(v.sheet.cells.map((c) => c.badge), ["1", "2", "3", "4", "5", "6"]);
  assert.ok(v.sheet.cells.every((c, k) => c.film === k && c.name === name));
  const a = call("add", { names: [name, cat.items[5].name] });
  assert.match(a.text, /^npx shadcn@latest add https?:\/\/\S+\/r\/\S+\.json https?:\/\/\S+\.json/);
  assert.equal(a.data.command.length, 5);
});

test("browse: no arguments is a text map; with kinds it is five cells per row", () => {
  const map = call("browse", {});
  assert.ok(!map.sheet && /sections/.test(map.text) && /elements/.test(map.text));
  const rows = call("browse", { kinds: ["button", "background"] });
  assert.equal(rows.sheet.cols, 5);
  assert.equal(rows.sheet.cells.length, 10);
});

test("MCP, legacy era: handshake, list, call with an image and no structuredContent", async () => {
  const init = await handleMcp({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "t", version: "0" } } }, null, "http://test");
  assert.equal(init.body.result.protocolVersion, "2025-06-18");
  assert.ok(init.body.result.instructions.length > 100 && !("resultType" in init.body.result));
  assert.equal((await handleMcp({ jsonrpc: "2.0", method: "notifications/initialized" }, "2025-06-18", "http://test")).status, 202);
  const list = await handleMcp({ jsonrpc: "2.0", id: 2, method: "tools/list" }, "2025-06-18", "http://test");
  assert.deepEqual(list.body.result.tools.map((t) => t.name), Object.keys(TOOLS));
  for (const t of list.body.result.tools) assert.ok(t.inputSchema.type === "object" && t.description.length < 420, `${t.name} description is long`);
  const res = await handleMcp({ jsonrpc: "2.0", id: 3, method: "tools/call", params: { name: "search", arguments: { query: "button", kind: "button" } } }, "2025-06-18", "http://test");
  const [text, image] = res.body.result.content;
  assert.equal(text.type, "text"); assert.equal(image.type, "image"); assert.equal(image.mimeType, "image/jpeg");
  assert.ok(!("structuredContent" in res.body.result));
  assert.equal((await sharp(Buffer.from(image.data, "base64")).metadata()).width, 1456);
  assert.match(text.text, /http:\/\/test\/api\/agent\/v1\/sheet\?s=/);
});

test("MCP, modern era: no handshake, version in every request, strict errors", async () => {
  const meta = (v) => ({ _meta: { "io.modelcontextprotocol/protocolVersion": v } });
  const disc = await handleMcp({ jsonrpc: "2.0", id: "d", method: "server/discover", params: meta("2026-07-28") }, "2026-07-28", "http://test");
  assert.equal(disc.body.result.resultType, "complete");
  assert.ok(disc.body.result.supportedVersions.includes("2026-07-28") && disc.body.result.ttlMs > 0);
  const list = await handleMcp({ jsonrpc: "2.0", id: 1, method: "tools/list", params: meta("2026-07-28") }, "2026-07-28", "http://test");
  assert.equal(list.body.result.cacheScope, "public");
  const call2 = await handleMcp({ jsonrpc: "2.0", id: 2, method: "tools/call", params: { name: "browse", arguments: {}, ...meta("2026-07-28") } }, "2026-07-28", "http://test");
  assert.equal(call2.body.result.resultType, "complete");
  const mismatch = await handleMcp({ jsonrpc: "2.0", id: 3, method: "tools/list", params: meta("2026-07-28") }, "2025-11-25", "http://test");
  assert.deepEqual([mismatch.status, mismatch.body.error.code], [400, -32020]);
  const old = await handleMcp({ jsonrpc: "2.0", id: 4, method: "tools/list", params: meta("1900-01-01") }, "1900-01-01", "http://test");
  assert.deepEqual([old.status, old.body.error.code], [400, -32022]);
  assert.ok(old.body.error.data.supported.includes("2026-07-28"));
  const missing = await handleMcp({ jsonrpc: "2.0", id: 5, method: "resources/list", params: meta("2026-07-28") }, "2026-07-28", "http://test");
  assert.deepEqual([missing.status, missing.body.error.code], [404, -32601]);
});

test("HTTP: self-describing root, an image at the sheet URL, errors as JSON", async () => {
  const root = JSON.parse((await get("/api/agent/v1")).body);
  assert.deepEqual(Object.keys(root.operations), Object.keys(TOOLS));
  const res = JSON.parse((await get("/api/agent/v1/search", { query: "hero", page: "1", dense: "true" })).body);
  const u = new URL(res.sheet);
  const img = await get(u.pathname, Object.fromEntries(u.searchParams));
  assert.equal(img.headers["content-type"], "image/jpeg");
  assert.equal(img.headers["access-control-allow-origin"], "*");
  assert.equal((await get("/api/agent/v1/sheet", { s: "not-a-spec" })).status, 400);
  assert.equal((await get("/api/agent/v1/nope")).status, 404);
  assert.equal((await handle({ method: "GET", path: "/api/mcp", query: {}, headers: {}, origin: "http://test" })).status, 405);
});

test("what is published is what is on disk", () => {
  const manifest = JSON.parse(readFileSync(join(ROOT, "public/agent/manifest.json"), "utf8"));
  assert.ok(manifest.files.some((f) => f.role === "cli"));
  for (const f of manifest.files) {
    const body = readFileSync(join(ROOT, "public", f.path));
    assert.equal(createHash("sha256").update(body).digest("hex"), f.sha256, f.path);
    assert.ok(!body.includes("{{SITE}}"), `${f.path} still has a placeholder`);
  }
  assert.ok(readFileSync(join(ROOT, "public/setup.md"), "utf8").includes(manifest.files.find((f) => f.role === "cli").sha256));
});

test("skills follow the open spec and stay short", () => {
  for (const dir of readdirSync(join(ROOT, "agent/skills"))) {
    const text = readFileSync(join(ROOT, "agent/skills", dir, "SKILL.md"), "utf8");
    const fm = text.match(/^---\n([\s\S]*?)\n---\n/)[1];
    const name = fm.match(/^name: (.+)$/m)[1], description = fm.match(/^description: (.+)$/m)[1];
    assert.equal(name, dir);
    assert.match(name, /^[a-z0-9]+(-[a-z0-9]+)*$/);
    assert.ok(description.length <= 1024 && description.length > 80, `${dir}: description is ${description.length} chars`);
    assert.ok(text.split("\n").length <= 60, `${dir}: ${text.split("\n").length} lines`);
  }
});
