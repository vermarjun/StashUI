#!/usr/bin/env node
// A number for plain-English search: someone describes a component in everyday
// words, without its name. How often is the one they meant on the first screen?
// Each case names ONE intended component, so this undercounts: other components
// that would serve just as well are scored as misses.
//   node agent/test/find.eval.mjs            scoreboard, with the misses
//   node agent/test/find.eval.mjs --quiet    just the totals
//   STASHUI_NO_EMBED=1 node agent/test/find.eval.mjs    word matching only
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
process.env.STASHUI_PUBLIC ||= join(here, "..", "..", "public");
const { find } = await import("../core/find.mjs");

export async function evaluate() {
  const cases = JSON.parse(readFileSync(join(here, "find.eval.json"), "utf8"));
  const rows = [];
  let withMeaning = false;
  for (const c of cases) {
    const r = await find(c.q);
    withMeaning ||= r.meaning;
    rows.push({ ...c, at: r.names.indexOf(c.want), first: r.names.slice(0, 3) });
  }
  const within = (n) => rows.filter((r) => r.at >= 0 && r.at < n).length;
  return { rows, total: rows.length, top1: within(1), top5: within(5), top10: within(10), top20: within(20), withMeaning };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const e = await evaluate();
  if (!process.argv.includes("--quiet")) for (const r of e.rows.filter((r) => r.at < 0 || r.at >= 10))
    console.log(`MISS ${r.q}  (wanted ${r.want}, ${r.at < 0 ? "not returned" : `at ${r.at + 1}`})  -> ${r.first.join(", ")}`);
  console.log(`intended component: first ${e.top1}, top five ${e.top5}, top ten ${e.top10}, top twenty ${e.top20}, of ${e.total}` +
    `   (${e.withMeaning ? "words + meaning" : "words only"})`);
  process.exit(0);
}
