// Search for a person using the gallery: describe what you want in plain words,
// get every component that matches, best first. Same ranking as the agent's
// search (words + meaning + the quality score), without the parts that are about
// an agent's project (theme and accent fit, adoption cost).
import { catalog } from "./catalog.mjs";
import { gate, rank, tokens } from "./search.mjs";
import { meaning } from "./semantic.mjs";

/** The search phrase that best explains why this component came back, or null. */
function matched(it, queryTokens, which) {
  const phrases = it.phrases || [];
  if (!phrases.length) return null;
  let best = null, bestHits = 0;
  for (const p of phrases) {
    const t = new Set(tokens(p)), hits = queryTokens.filter((q) => t.has(q)).length;
    if (hits > bestHits) { best = p; bestHits = hits; }
  }
  if (bestHits >= 2) return best;
  if (which > 0 && phrases[which - 1]) return phrases[which - 1];   // the phrase that matched by meaning
  return best;
}

/**
 * @param {string} query
 * @param {{limit?: number}} [o]
 * @returns {Promise<{items: object[], names: string[], total: number, meaning: boolean, weak: boolean}>}
 *   `weak` is true when nothing matched well and `items` are only the nearest components.
 */
export async function find(query, o = {}) {
  const q = String(query || "").trim().slice(0, 300);
  if (!q) return { items: [], names: [], total: 0, meaning: false, weak: false };
  const cat = catalog();                                        // throws early, with a clear error, if the build has not run
  const sem = await meaning(q).catch(() => null);
  const r = rank({ query: q, plain: true, sem });
  let { names, weak } = gate(r);                                // the same cut the agent's search uses
  const total = names.length;
  names = names.slice(0, o.limit || 400);
  const qt = tokens(q);
  const items = names.map((n) => {
    const it = cat.byName.get(n);
    return {
      name: n, kind: it.kind, weight: it.weight || null, deps: it.deps, content: it.content || null,
      match: weak ? null : matched(it, qt, sem?.which?.get(n) ?? 0),
    };
  });
  return { items, names, total, meaning: !!sem, weak };
}
