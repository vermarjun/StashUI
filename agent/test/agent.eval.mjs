#!/usr/bin/env node
// The number for the agent's search: the same requests the gallery is scored on
// (find.eval.json, everyday words, one intended component each) plus requests
// that name a kind in passing (search.eval.json), sent through the agent's ranking
// with no `kind` passed, so the server has to work it out.
// An agent sees twelve results, so "on page one" is the bar.
//   node agent/test/agent.eval.mjs            scoreboard with the misses
//   node agent/test/agent.eval.mjs --quiet    totals only
//   STASHUI_NO_EMBED=1 node agent/test/agent.eval.mjs    word matching only
import { readFileSync, realpathSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
process.env.STASHUI_PUBLIC ||= join(here, "..", "..", "public");
const { catalog } = await import("../core/catalog.mjs");
const { callWithMeaning } = await import("../core/tools.mjs");
const { meaning } = await import("../core/semantic.mjs");
const read = (f) => JSON.parse(readFileSync(join(here, f), "utf8"));

/** The names on page one of an agent search, and the first line of its legend. */
async function pageOne(query, extra = {}) {
  const out = await callWithMeaning("search", { query, ...extra });
  return { names: (out.sheet?.cells || []).map((c) => c.name), head: out.text.split("\n")[0] };
}

export async function evaluate() {
  const cat = catalog();
  const wanted = [];
  for (const c of read("find.eval.json")) {
    const { names, head } = await pageOne(c.q);
    wanted.push({ ...c, at: names.indexOf(c.want), names, head });
  }
  const kinds = [];
  for (const c of read("search.eval.json").filter((c) => c.kind)) {
    const { names } = await pageOne(c.q);
    const available = Math.min(12, cat.kindById.get(c.kind)?.count || 0);
    kinds.push({ ...c, right: names.filter((n) => cat.byName.get(n).kind === c.kind).length, available, names });
  }
  const within = (n) => wanted.filter((r) => r.at >= 0 && r.at < n).length;
  const mean = (xs) => xs.reduce((a, b) => a + b, 0) / (xs.length || 1);
  return {
    wanted, kinds, total: wanted.length, top1: within(1), top5: within(5), page: within(12),
    kindRecall: mean(kinds.map((k) => (k.available ? Math.min(1, k.right / k.available) : 1))),
    meanShown: mean(wanted.map((r) => r.names.length)),
    withMeaning: !!(await meaning("navbar")),
  };
}

if (process.argv[1] && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {   // run directly, not imported
  const e = await evaluate();
  if (!process.argv.includes("--quiet")) {
    for (const r of e.wanted.filter((r) => r.at < 0 || r.at >= 5))
      console.log(`${r.at < 0 ? "MISS" : `#${String(r.at + 1).padEnd(3)}`} ${r.q}  (wanted ${r.want})  -> ${r.names.slice(0, 3).join(", ")}`);
    for (const k of e.kinds.filter((k) => k.right < k.available * 0.8))
      console.log(`KIND ${k.right}/${k.available} ${k.kind}  ${k.q}  -> ${k.names.slice(0, 3).join(", ")}`);
  }
  console.log(`intended component: first ${e.top1}, top five ${e.top5}, on page one ${e.page}, of ${e.total}` +
    `   ·   right kind on page one: ${(e.kindRecall * 100).toFixed(0)}%   (${e.withMeaning ? "words + meaning" : "words only"})`);
  process.exit(0);
}
