#!/usr/bin/env node
// The agent API without Next.js: the same handler the site mounts, plus the
// static files under public/. For tests and for trying the CLI locally.
//   node agent/dev-server.mjs [port]      then  STASHUI_URL=http://127.0.0.1:4317 stashui search "…"
import { createReadStream, existsSync, realpathSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { handle } from "./core/http.mjs";
import { publicDir } from "./core/sheet.mjs";

const TYPES = { ".json": "application/json", ".md": "text/markdown; charset=utf-8", ".mjs": "text/javascript", ".txt": "text/plain; charset=utf-8",
  ".html": "text/html; charset=utf-8", ".webp": "image/webp", ".jpg": "image/jpeg", ".mp4": "video/mp4" };

export function start(port = 4317) {
  const server = createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname.startsWith("/api/")) {
      let raw = "";
      for await (const chunk of req) raw += chunk;
      let body;
      try { body = raw ? JSON.parse(raw) : undefined; } catch { body = null; }
      const out = await handle({ method: req.method, path: url.pathname, query: Object.fromEntries(url.searchParams), headers: req.headers, origin: url.origin, body });
      res.writeHead(out.status, out.headers);
      return res.end(out.body);
    }
    const file = join(publicDir(), normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, ""));
    if (!file.startsWith(publicDir()) || !existsSync(file) || !statSync(file).isFile()) { res.writeHead(404); return res.end("not found"); }
    res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
    createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(port, "127.0.0.1", () => resolve(server)));
}

if (process.argv[1] && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {   // run directly, not imported
  const port = Number(process.argv[2]) || 4317;
  await start(port);
  console.log(`StashUI agent API on http://127.0.0.1:${port}  (MCP at /api/mcp)`);
}
