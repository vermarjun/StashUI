// Ranking, for the gallery and for agents alike.
//
// How well a component matches a request is decided once, the same way for both:
//   words    tokens weighted by where they appear and how rare they are
//   meaning  semantic.mjs: a small embedding model, optional, passed in as `o.sem`
//   kind     what the request is about ("navbar ..." is a site-header)
//   quality  the human review score, as the taste prior
// An agent's search then adds what only an agent has: a project to fit (theme,
// accent), a cost to adopt (dependencies, colours to replace, install gaps), hard
// limits to respect (`avoid`), and a component to stay consistent with (`like`).
//
// `gate()` decides which results are worth showing at all. Twelve good matches
// and an honest count beat forty-eight rows padded with whatever shared a word.
import { catalog } from "./catalog.mjs";

const STOP = new Set(("a an the for with and or of to in on that my is it this at by from as be are our your i we need want " +
  "should must can have has into like some any use using used when which one two three good nice simple component ui").split(" "));
const stem = (t) => (t.length > 4 && t.endsWith("ies") ? t.slice(0, -3) + "y" : t.length > 3 && t.endsWith("s") && !t.endsWith("ss") ? t.slice(0, -1) : t);
export const tokens = (s) => String(s || "").toLowerCase().split(/[^a-z0-9]+/).filter((t) => t && !STOP.has(t)).map(stem);

export const HUES = ["red", "orange", "yellow", "green", "teal", "blue", "purple", "pink"];

/** Hard limits an agent can state. Each drops components the limit rules out. Facts come from the record and the clip. */
export const AVOID = {
  motion: { says: "anything that moves a lot or never stops", drops: (it) => it.motion === "pronounced" || it.motion === "continuous" },
  webgl: { says: "WebGL and three.js", drops: (it) => (it.technique || []).some((t) => t === "webgl-shader" || t === "three-js") },
  heavy: { says: "components that are heavy at runtime", drops: (it) => it.weight === "heavy" },
  hover: { says: "components that only react to hover, which is dead on touch", drops: (it) => it.trigger?.length > 0 && it.trigger.every((t) => t === "hover" || t === "pointer-move") },
  hardcoded: { says: "components whose copy is written inside the file", drops: (it) => it.content === "hardcoded" },
};

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

const NEAR = 60;        // how many of the closest-by-meaning components earn points
const SEM_POINTS = 14;  // what the closest one earns
// What being the kind the request names earns. A nudge, not a filter, because the kind was only inferred from the
// words: discounting other kinds was measured (agent.eval) and loses the component the request meant more often
// than it removes a wrong-kind one. An agent that wants only one kind passes `kind`, which is exact.
const KIND_POINTS = 5;        // the gallery: best on find.eval
const KIND_POINTS_AGENT = 10; // an agent's search: same hit rate on agent.eval, more of the named kind on page one
const LIKE_POINTS = 12; // what the most similar component earns when `like` is given

/** Positions of the `n` highest values of a name -> number map. */
const topPositions = (map, n) => new Map([...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, n).map(([name], i) => [name, i]));

/**
 * @param {{query?: string, kind?: string|string[], theme?: string, accent?: string, clean?: boolean, avoid?: string[],
 *   like?: string, sem?: Map<string, number>|null, likeSim?: Map<string, number>|null, plain?: boolean, explain?: boolean}} o
 *   `sem` is semantic.mjs's meaning(query); `likeSim` its similar(name). `plain` ranks for a person browsing the
 *   gallery: relevance and quality only, no project fit and no adoption cost.
 * @returns {{names: string[], kinds: string[], asked: boolean, words: number, meaning: boolean,
 *   info: Map<string, {hits: number, sim: number, inKind: boolean}>}}
 */
export function rank(o) {
  const { docs, idf } = build();
  const cat = catalog();
  const q = tokens(o.query);
  const asked = [o.kind].flat().filter(Boolean);
  const kinds = asked.length ? asked : kindsIn(o.query || "");
  const like = o.like ? cat.byName.get(o.like) : null;
  const avoid = (o.avoid || []).map((a) => AVOID[a]).filter(Boolean);
  const hasSem = o.sem instanceof Map;
  // meaning: the NEAR closest components, by position. Position, not the raw similarity, because
  // similarities bunch together and their scale shifts from query to query.
  const near = hasSem ? topPositions(o.sem, NEAR) : null;
  const alike = like && o.likeSim instanceof Map ? topPositions(o.likeSim, NEAR) : null;
  const scored = [];
  for (const d of docs) {
    const it = d.it;
    if (asked.length && !asked.includes(it.kind)) continue;
    if (o.clean && it.colours > 0) continue;
    if (avoid.some((a) => a.drops(it))) continue;
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
    const likeAt = alike?.get(it.name);
    const close = at != null && at < 12;
    if (!inKind && !like && (!q.length || hits === 0) && at == null) continue;   // nothing ties it to the request
    if (!inKind && !like && kinds.length && hits < Math.min(2, q.length) && !close) continue; // a different kind has to earn its place
    if (like && !inKind && hits === 0 && at == null && likeAt == null && it.kind !== like.kind) continue; // nothing ties it to the request or to the model component
    if (at != null) text += SEM_POINTS * (1 - at / NEAR);

    let score = text + (inKind ? (o.plain ? KIND_POINTS : KIND_POINTS_AGENT) : 0);
    score *= 0.7 + 0.1 * it.quality;                                // the human review score is the taste prior
    if (it.render === "blank" || it.render === "broken") score -= 6; // its recording shows nothing usable
    if (!o.plain) {
      score += 0.3 * ((it.polish ?? 3) - 3);                       // the record's own 1-5 for finish: a second opinion that breaks ties in the human score
      // fit with the project the agent is building, and what it costs to adopt. Small on purpose:
      // these settle ties between components that match equally well, they do not outrank a better match.
      if (o.theme && it.theme !== "both" && it.theme !== o.theme) score -= 3;
      if (o.accent && it.accents?.length) score += it.accents.includes(o.accent) ? 1.5 : it.colours > 0 ? -1.5 : 0;
      if (it.colours === 0) score += 0.6;                           // takes the project's tokens untouched
      score -= 0.15 * it.deps + 0.01 * Math.min(it.colours, 60);
      if (!it.tile) score -= 4;                                     // cannot be shown, so cannot be judged
      if (it.unresolved) score -= 3;                                // installs with a missing import
      if (like) {
        if (likeAt != null) score += LIKE_POINTS * (1 - likeAt / NEAR);   // reads alike, from the records
        score += (it.kind === like.kind ? 6 : 0) + (it.tone && it.tone === like.tone ? 2 : 0)
          + 3 * (it.accents || []).filter((a) => (like.accents || []).includes(a)).length
          - 4 * Math.abs((it.lum ?? 0.1) - (like.lum ?? 0.1)) - 6 * Math.abs((it.vivid ?? 0) - (like.vivid ?? 0));   // and looks alike, from the pixels
      }
    }
    scored.push([score, it, hits, hasSem ? o.sem.get(it.name) ?? 0 : 0, inKind]);
  }
  scored.sort((a, b) => b[0] - a[0] || a[1].name.localeCompare(b[1].name));
  const seen = new Set(), names = [];
  for (const [, it] of scored) {                                    // the same component ported by several libraries shows once
    if (it.dupe) { if (seen.has(it.dupe)) continue; seen.add(it.dupe); }
    names.push(it.name);
  }
  return {
    names, kinds, asked: asked.length > 0, total: names.length, words: q.length, meaning: hasSem,
    // how each result matched, so weak matches can be told from strong ones
    info: new Map(scored.map(([score, it, hits, sim, inKind]) => [it.name, { hits, sim, inKind, score }])),
    ...(o.explain && { scores: scored.slice(0, 20).map(([sc, it]) => [it.name, +sc.toFixed(1)]) }),
  };
}

// Measured on real queries (agent/test/find.eval.json plus junk such as "normal", "asdf"):
// a component someone meant scores 0.5 or more by meaning; nonsense tops out near 0.4.
const KEEP_SIM = 0.42;     // close enough by meaning to show
const KEEP_WORDS = 0.5;    // or it contains at least half the words asked for
const STRONG_SIM = 0.45;   // at least one result this close, or the whole answer is "closest matches"
const CLOSEST = 12;        // how many to show when nothing really matches

/**
 * Which ranked results the gallery shows: everything close by meaning or sharing half the words.
 * @param {ReturnType<typeof rank>} r
 * @returns {{names: string[], weak: boolean}} `weak` is true when nothing matched well and `names` are only the nearest.
 */
export function gate(r) {
  const ratio = (i) => (r.words > 0 ? i.hits / r.words : 0);
  const good = (n) => { const i = r.info.get(n); return i.sim >= KEEP_SIM || ratio(i) >= KEEP_WORDS; };
  const solid = (n) => { const i = r.info.get(n); return i.sim >= STRONG_SIM || ratio(i) >= KEEP_WORDS; };
  const names = r.names.filter(good);
  if (names.some(solid)) return { names, weak: false };
  return { names: r.names.slice(0, CLOSEST), weak: true };
}

const CUT = 0.5;       // an agent is shown what scores at least half as well as the best match
const AT_LEAST = 6;    // and never fewer than this, so there is always something to compare

/**
 * Which ranked results an agent is shown. The cut is relative to the best score rather than a fixed
 * similarity, because a fixed one drops right answers: "box you open with ctrl k to jump anywhere" puts the
 * command palette fifth overall with a similarity of 0.40, under the gallery's 0.42 line. Across the 40
 * evaluated requests the intended component never scored below 0.66 of the best, so 0.5 keeps it with room.
 * @param {ReturnType<typeof rank>} r
 * @returns {{names: string[], weak: boolean}}
 */
export function shortlist(r) {
  if (!r.names.length) return { names: [], weak: false };
  const solid = (n) => { const i = r.info.get(n); return i.inKind || i.sim >= STRONG_SIM || (r.words > 0 && i.hits / r.words >= KEEP_WORDS); };
  if (!r.names.slice(0, CLOSEST).some(solid)) return { names: r.names.slice(0, CLOSEST), weak: true };
  const best = r.info.get(r.names[0]).score;
  const keep = best > 0 ? r.names.filter((n) => r.info.get(n).score >= CUT * best) : [];
  return { names: keep.length >= AT_LEAST ? keep : r.names.slice(0, AT_LEAST), weak: false };
}
