import { find } from "../../../../agent/core/find.mjs";

// Reads the catalogue and the vector file from disk and runs the embedding model: a Node route.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/search?q=describe+what+you+want -> { names: string[], total, meaning } , best match first. */
export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  const limit = Math.min(400, Math.max(1, Number(url.searchParams.get("limit")) || 400));
  try {
    return Response.json(await find(q, { limit }), {
      headers: { "cache-control": "public, max-age=300" },
    });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "search failed" }, { status: 500 });
  }
}
