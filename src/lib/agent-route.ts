// Mounts the agent API (agent/core/http.mjs) on Next.js route handlers.
// The core is plain ESM with no framework in it, so the same code runs under
// `node agent/dev-server.mjs` in tests. This file is the only Next-specific part.
import { handle } from "../../agent/core/http.mjs";

export async function serve(request: Request): Promise<Response> {
  const url = new URL(request.url);
  // behind the reverse proxy the public origin is in the forwarded headers
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? url.host;
  const proto = request.headers.get("x-forwarded-proto") ?? url.protocol.replace(":", "");
  let body: unknown;
  if (request.method === "POST") body = await request.json().catch(() => null);
  const out = await handle({
    method: request.method,
    path: url.pathname,
    query: Object.fromEntries(url.searchParams),
    headers: Object.fromEntries(request.headers),
    origin: `${proto}://${host}`,
    body,
  });
  return new Response(out.body as BodyInit | undefined, { status: out.status, headers: out.headers });
}
