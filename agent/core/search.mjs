// Ranking. The caller is a language model, so the division of labour is:
// the agent says what KIND of thing it wants (it is good at that), the server
// filters and orders (deterministic, free, fast), and the agent makes the final
// call by looking at the sheet.
//
// Two signals say how well a component matches the words of a request: the words
// themselves (weighted by where they appear and how rare they are), and meaning
// (semantic.mjs: a small embedding model, optional, passed in as `o.sem`). Word
// matching alone still works when the model is unavailable.
import { catalog } from "./catalog.mjs";

const STOP = new Set(("a an the for with and or of to in on that my is it this at by from as be are our your i we need want " +
  "should must can have has into like some any use using used when which one two three good nice simple component ui").split(" "));
const stem = (t) => (t.length > 4 && t.endsWith("ies") ? t.slice(0, -3) + "y" : t.length > 3 && t.endsWith("s") && !t.endsWith("ss") ? t.slice(0, -1) : t);
export const tokens = (s) => String(s || "").toLowerCase().split(/[^a-z0-9]+/).filter((t) => t && !STOP.has(t)).map(stem);

export const HUES = ["red", "orange", "yellow", "green", "teal", "blue", "purple", "pink"];

let index = null;
function build() {
  const cat = catalog();
  if (index?.mtime === cat.mtime) return index;
  const docs = cat.items.map((it) => {
    const kind = cat.kindById.get(it.kind);
    return {
      it,
      hi: new Set(tokens(`${it.name} ${it.title}`)),
      kind: new Set(tokens(`${it.kind} ${(kind?.aka || []).join(" ")}`)),
      mid: new Set(tokens(`${it.blurb} ${it.use} ${(it.look || []).join(" ")} ${it.categories.join(" ")} ${it.tone || ""}`)),
      ph: new Set(tokens((it.phrases || []).join(" "))),             // how people ask for it, written for search
      lo: new Set(tokens(it.text)),
    };
  });
  const df = new Map();
  for (const d of docs) for (const t of new Set([...d.hi, ...d.mid, ...d.ph, ...d.lo])) df.set(t, (df.get(t) || 0) + 1);   // rarity is about the components' own words
  const idf = (t) => Math.log(1 + docs.length / (1 + (df.get(t) || 0)));
  // phrases that name a kind, longest first: "nav bar" must win over "bar"
  const phrases = cat.kinds.flatMap((k) => [k.id.replaceAll("-", " "), ...k.aka].map((p) => ({ kind: k.id, toks: tokens(p) })))
    .filter((p) => p.toks.length).sort((a, b) => b.toks.length - a.toks.length);
  return (index = { mtime: cat.mtime, docs, idf, phrases });
}

const PREPOSITIONS = new Set("with for that which in on of to using like when where".split(" "));

/**
 * The kinds a free-text query is about. In "primary call to action button with a glow" the thing wanted
 * is named before the first preposition ("...button"), and what follows describes it. So: every kind
 * named in that head part, at most two; if the head names none, the first kind named anywhere.
 */
export function kindsIn(query) {
  const { phrases } = build();
  const raw = String(query || "").toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  const q = raw.map((w, at) => ({ tok: stem(w), at })).filter((x) => !STOP.has(raw[x.at]));
  const used = new Array(q.length).fill(false), found = [];
  for (const p of phrases) {                                        // longest phrase claims its words first
    for (let i = 0; i + p.toks.length <= q.length; i++) {
      if (!p.toks.every((t, j) => q[i + j].tok === t && !used[i + j])) continue;
      p.toks.forEach((_, j) => (used[i + j] = true));
      found.push({ kind: p.kind, from: q[i].at, to: q[i + p.toks.length - 1].at });
    }
  }
  if (!found.length) return [];
  const inside = (at) => found.some((f) => at > f.from && at < f.to);   // the "to" in "call to action" is not a boundary
  const cut = raw.findIndex((w, at) => PREPOSITIONS.has(w) && !inside(at));
  const head = found.filter((f) => cut < 0 || f.from < cut).sort((a, b) => b.from - a.from);
  const picked = head.length ? head : [found.sort((a, b) => a.from - b.from)[0]];
  return [...new Set(picked.map((f) => f.kind))].slice(0, 2);
}

/**
 * @param {{query?: string, kind?: string|string[], theme?: string, accent?: string, clean?: boolean, like?: string,
 *   sem?: Map<string, number>|null, plain?: boolean}} o
 *   `sem` is semantic.mjs's meaning(query). `plain` ranks for a person browsing the gallery: relevance and
 *   quality only, no project fit and no adoption cost.
 * @returns {{names: string[], kinds: string[], total: number}}
 */
const NEAR = 60;        // how many of the closest-by-meaning components earn points
const SEM_POINTS = 14;  // what the closest one earns; the kind bonus is 12

export function rank(o) {
  const { docs, idf } = build();
  const cat = catalog();
  const q = tokens(o.query);
  const asked = [o.kind].flat().filter(Boolean);
  const kinds = asked.length ? asked : kindsIn(o.query || "");
  const like = o.like ? cat.byName.get(o.like) : null;
  // meaning: the NEAR closest components, by position. Position, not the raw similarity, because
  // similarities bunch together and their scale shifts from query to query.
  const near = o.sem instanceof Map ? new Map([...o.sem.entries()].sort((a, b) => b[1] - a[1]).slice(0, NEAR).map(([n], i) => [n, i])) : null;
  const scored = [];
  for (const d of docs) {
    const it = d.it;
    if (asked.length && !asked.includes(it.kind)) continue;
    if (o.clean && it.colours > 0) continue;
    if (like && it.name === like.name) continue;

    const inKind = kinds.includes(it.kind);
    let text = 0, hits = 0;
    for (const t of q) {
      // an item of the wanted kind already has the kind bonus: its kind words must not count twice,
      // or every globe-less 3D scene would match "globe"
      const w = Math.max(d.hi.has(t) ? 3 : 0, !inKind && d.kind.has(t) ? 2.5 : 0, d.ph.has(t) ? 2.2 : 0, d.mid.has(t) ? 2 : 0, d.lo.has(t) ? 1 : 0);
      if (w) { text += w * idf(t); hits++; }
    }
    if (q.length) text *= 0.5 + 0.5 * (hits / q.length);           // matching more of the request beats matching one word hard
    const at = near?.get(it.name);                                   // undefined when not close by meaning
    const close = at != null && at < 12;
    if (!inKind && !like && (!q.length || hits === 0) && at == null) continue;   // nothing ties it to the request
    if (!inKind && kinds.length && hits < Math.min(2, q.length) && !close) continue; // a different kind has to earn its place
    if (!inKind && kinds.length && !o.plain) text *= 0.6;          // and it earns it on fewer points: "sign up button" in a navbar request is not a sign-up form
    if (at != null) text += SEM_POINTS * (1 - at / NEAR);

    let score = text + (inKind ? (o.plain ? 5 : 12) : 0);
    score *= 0.7 + 0.1 * it.quality;                                // the human review score is the taste prior
    if (it.render === "blank" || it.render === "broken") score -= 6; // its recording shows nothing usable
    if (o.plain) { scored.push([score, it, hits, o.sem instanceof Map ? o.sem.get(it.name) ?? 0 : 0]); continue; }
    // fit with the project the agent is building
    if (o.theme && it.theme !== "both" && it.theme !== o.theme) score -= 3;
    if (o.accent && it.accents?.length) score += it.accents.includes(o.accent) ? 1.5 : it.colours > 0 ? -1.5 : 0;
    if (it.colours === 0) score += 0.6;                             // takes the project's tokens untouched
    score -= 0.15 * it.deps + 0.01 * Math.min(it.colours, 60);
    if (!it.tile) score -= 4;                                       // cannot be shown, so cannot be judged
    if (it.unresolved) score -= 3;                                  // installs with a missing import
    if (like) {
      score += (it.kind === like.kind ? 6 : 0) + (it.tone && it.tone === like.tone ? 2 : 0)
        + 3 * (it.accents || []).filter((a) => (like.accents || []).includes(a)).length
        - 4 * Math.abs((it.lum ?? 0.1) - (like.lum ?? 0.1)) - 6 * Math.abs((it.vivid ?? 0) - (like.vivid ?? 0));
    }
    scored.push([score, it]);
  }
  scored.sort((a, b) => b[0] - a[0] || a[1].name.localeCompare(b[1].name));
  const seen = new Set(), names = [];
  for (const [, it] of scored) {                                    // the same component ported by several libraries shows once
    if (it.dupe) { if (seen.has(it.dupe)) continue; seen.add(it.dupe); }
    names.push(it.name);
  }
  return {
    names, kinds, total: names.length,
    ...(o.explain && { scores: scored.slice(0, 20).map(([sc, it]) => [it.name, +sc.toFixed(1)]) }),
    // for the gallery: how each result matched, so weak matches can be told from strong ones
    ...(o.plain && { words: q.length, info: new Map(scored.map(([, it, hits, sim]) => [it.name, { hits, sim }])) }),
  };
}
