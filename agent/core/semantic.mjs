// Matching by meaning. The vectors are a static file built by
// pipeline/search-index.mjs; this file loads them once, embeds the query, and
// scores every component as its best-matching vector (its description or any one
// of its search phrases). 10,000 dot products take about a millisecond, so there
// is no vector database: the file is the index.
//
// Returns null whenever the model or the index is unavailable. Callers treat
// that as "word matching only".
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { embedder, DIM } from "./embed.mjs";
import { publicDir } from "./sheet.mjs";

let cache = null;
function index() {
  const dir = join(publicDir(), "agent/search");
  const meta = join(dir, "index.json"), bin = join(dir, "vectors.bin");
  if (!existsSync(meta) || !existsSync(bin)) return null;
  const mtime = statSync(bin).mtimeMs;
  if (cache?.mtime === mtime) return cache;
  const { names, owner, dim } = JSON.parse(readFileSync(meta, "utf8"));
  const buf = readFileSync(bin);
  if (dim !== DIM || buf.byteLength !== owner.length * DIM) return null;
  return (cache = { mtime, names, owner, vectors: new Int8Array(buf.buffer, buf.byteOffset, buf.byteLength) });
}

const recent = new Map();   // query -> scores; people type the same things

/**
 * How close every component is to the query, by meaning.
 * @returns {Promise<null | Map<string, number>>} name -> cosine similarity (about 0.3 unrelated, 0.5+ strong).
 *   The map also carries `.which`: name -> which of its vectors matched best (0 description, k its k-th phrase).
 */
export async function meaning(query) {
  const q = String(query || "").trim().toLowerCase().slice(0, 300);
  if (!q) return null;
  const ix = index();
  if (!ix) return null;
  const key = `${ix.mtime}:${q}`;
  if (recent.has(key)) return recent.get(key);
  const embed = await embedder();
  if (!embed) return null;
  const [v] = await embed([q]);
  const best = new Float32Array(ix.names.length).fill(-1);
  const bestRow = new Int32Array(ix.names.length), firstRow = new Int32Array(ix.names.length).fill(-1);
  const { vectors, owner } = ix;
  for (let r = 0, o = 0; r < owner.length; r++, o += DIM) {
    let s = 0;
    for (let k = 0; k < DIM; k++) s += vectors[o + k] * v[k];
    if (firstRow[owner[r]] < 0) firstRow[owner[r]] = r;
    if (s > best[owner[r]]) { best[owner[r]] = s; bestRow[owner[r]] = r; }
  }
  const out = new Map(ix.names.map((n, i) => [n, best[i] / 127]));
  // which of a component's vectors matched best: 0 is its description, k > 0 its k-th search phrase
  out.which = new Map(ix.names.map((n, i) => [n, bestRow[i] - firstRow[i]]));
  if (recent.size > 500) recent.delete(recent.keys().next().value);
  recent.set(key, out);
  return out;
}

/**
 * How alike every component reads to one named component: description against description.
 * Needs only the stored vectors, no model, so it is synchronous and always available once the index is built.
 * @returns {null | Map<string, number>} name -> cosine similarity, without the component itself
 */
export function similar(name) {
  const ix = index();
  if (!ix) return null;
  if (!ix.first) {                                             // each component's description is its first row
    ix.first = new Int32Array(ix.names.length).fill(-1);
    ix.owner.forEach((o, r) => { if (ix.first[o] < 0) ix.first[o] = r; });
    ix.at = new Map(ix.names.map((n, i) => [n, i]));
  }
  const me = ix.at.get(name);
  if (me == null) return null;
  const a = ix.first[me] * DIM, out = new Map();
  for (let i = 0; i < ix.names.length; i++) {
    if (i === me) continue;
    let s = 0;
    for (let k = 0, b = ix.first[i] * DIM; k < DIM; k++) s += ix.vectors[a + k] * ix.vectors[b + k];
    out.set(ix.names[i], s / (127 * 127));
  }
  return out;
}

/** True when meaning search can answer (index on disk; the model is checked on first use). */
export const hasIndex = () => !!index();
