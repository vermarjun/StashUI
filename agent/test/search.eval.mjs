#!/usr/bin/env node
// A number for ranking: how often a plain-language request lands on the right
// kind of thing. Run it before and after touching search.mjs or kinds.json.
//   node agent/test/search.eval.mjs           scoreboard
//   node agent/test/search.eval.mjs --quiet   just the two numbers
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
process.env.STASHUI_PUBLIC ||= join(here, "..", "..", "public");
const { catalog } = await import("../core/catalog.mjs");
const { rank } = await import("../core/search.mjs");

export function evaluate() {
  const cases = JSON.parse(readFileSync(join(here, "search.eval.json"), "utf8")), cat = catalog();
  const rows = cases.map((c) => {
    const page = rank({ query: c.q }).names.slice(0, 12);            // no kind passed: the server has to work it out
    const available = c.kind ? Math.min(12, cat.kindById.get(c.kind)?.count || 0) : 0;
    const right = page.filter((n) => cat.byName.get(n).kind === c.kind).length;
    return { ...c, right, available, precision: available ? right / available : null,
      hit: c.top ? c.top.some((n) => page.slice(0, 5).includes(n)) : null, first: page.slice(0, 3) };
  });
  const mean = (xs) => xs.reduce((a, b) => a + b, 0) / (xs.length || 1);
  return { rows, kindRecall: mean(rows.filter((r) => r.precision != null).map((r) => r.precision)), namedHit: mean(rows.filter((r) => r.hit != null).map((r) => +r.hit)) };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { rows, kindRecall, namedHit } = evaluate();
  if (!process.argv.includes("--quiet")) for (const r of rows)
    console.log(`${(r.precision ?? 1) >= 0.8 && r.hit !== false ? "ok  " : "MISS"} ${r.kind ? `${String(r.right).padStart(2)}/${String(r.available).padEnd(2)} ${r.kind.padEnd(20)}` : " ".repeat(26)} ${r.q}${r.hit === false ? "   [named pick not in top 5]" : ""}${(r.precision ?? 1) < 1 || r.hit === false ? `   -> ${r.first.join(", ")}` : ""}`);
  console.log(`right kind on page one: ${(kindRecall * 100).toFixed(0)}%   named component in top five: ${(namedHit * 100).toFixed(0)}%`);
}
