// The catalogue as the server sees it: one JSON file read from disk and kept in
// memory. Static files under public/ are the whole database, so a redeploy with
// new components needs no migration and the same data is downloadable by anyone.
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { publicDir } from "./sheet.mjs";

let cache = null;

export function catalog() {
  const file = join(publicDir(), "agent/catalog.json");
  const mtime = statSync(file).mtimeMs;
  if (cache?.mtime === mtime) return cache;
  const data = JSON.parse(readFileSync(file, "utf8"));
  cache = { ...data, mtime, byName: new Map(data.items.map((i) => [i.name, i])), kindById: new Map(data.kinds.map((k) => [k.id, k])) };
  return cache;
}

const readJson = (p) => (existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : null);
const safe = (name) => (/^[A-Za-z0-9._-]+$/.test(name) ? name : "");   // names become file paths

/** Everything `view` prints for one component. */
export const detail = (name) => readJson(join(publicDir(), "agent/items", `${safe(name)}.json`));

/** The shadcn registry item: the files an install writes. */
export const registryItem = (name) => readJson(join(publicDir(), "r", `${safe(name)}.json`));

/** Closest names, for "did you mean" when an agent misremembers one. */
export function nearest(name, n = 3) {
  const want = name.toLowerCase();
  const score = (c) => (c.includes(want) || want.includes(c) ? 0 : 1) + Math.abs(c.length - want.length) / 20 +
    (new Set([...want].filter((ch) => !c.includes(ch))).size) / 10;
  return [...catalog().byName.keys()].sort((a, b) => score(a.toLowerCase()) - score(b.toLowerCase())).slice(0, n);
}
