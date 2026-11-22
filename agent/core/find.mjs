// Search for a person using the gallery: describe what you want in plain words,
// get every component that matches, best first. Same ranking as the agent's
// search (words + meaning + the quality score), without the parts that are about
// an agent's project (theme and accent fit, adoption cost).
import { catalog } from "./catalog.mjs";
import { rank } from "./search.mjs";
import { meaning } from "./semantic.mjs";

/**
 * @param {string} query
 * @param {{limit?: number}} [o]
 * @returns {Promise<{names: string[], total: number, meaning: boolean}>}
 */
export async function find(query, o = {}) {
  const q = String(query || "").trim().slice(0, 300);
  if (!q) return { names: [], total: 0, meaning: false };
  catalog();                                                    // throws early, with a clear error, if the build has not run
  const sem = await meaning(q).catch(() => null);
  const r = rank({ query: q, plain: true, sem });
  return { names: r.names.slice(0, o.limit || 400), total: r.total, meaning: !!sem };
}
