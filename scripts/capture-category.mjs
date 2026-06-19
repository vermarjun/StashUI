// Capture grid clips for every component in a category, then rebuild the
// manifest. Sequential (one browser at a time) to keep the machine cool.
//
//   node scripts/capture-category.mjs <category> [--port 3000]
//
// Requires the dev server running + ffmpeg + playwright.

import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const category = args.find((a) => !a.startsWith("--"));
const port = args.includes("--port") ? args[args.indexOf("--port") + 1] : "3000";

if (!category) {
  console.error("usage: node scripts/capture-category.mjs <category> [--port 3000]");
  process.exit(1);
}

const src = readFileSync(join(root, "src/__registry__/meta.gen.ts"), "utf8");
const meta = JSON.parse(
  src.match(/componentsMeta[^=]*=\s*(\[[\s\S]*?\]);/)[1],
);
const names = meta.filter((m) => m.category === category).map((m) => m.name);

if (names.length === 0) {
  console.error(`No components found in category "${category}".`);
  process.exit(1);
}

// Regenerate the registry first so any demos created/edited by hand (e.g. a new
// `<name>.demo.tsx`) are in demos.gen — otherwise the capture records a stale
// "No preview available".
console.log("● Regenerating registry (demos.gen) before capture…");
spawnSync("node", [join(root, "scripts/build-registry.mjs")], { stdio: "inherit" });

console.log(`\n● Capturing ${names.length} components in "${category}"\n`);

// Per-component hard timeout: a single hung capture (client render-loop, a
// Playwright action that never resolves) must NOT freeze the whole batch.
// 150s is well above the slowest real WebGL capture (~40s).
const PER_CAPTURE_MS = 150_000;
let ok = 0;
const failed = [];
const timedOut = [];
for (const name of names) {
  const r = spawnSync(
    "node",
    [join(root, "scripts/capture-preview.mjs"), name, "--port", port],
    { stdio: "inherit", timeout: PER_CAPTURE_MS, killSignal: "SIGKILL" },
  );
  if (r.status === 0) ok++;
  else {
    failed.push(name);
    if (r.signal === "SIGKILL" || r.error?.code === "ETIMEDOUT") timedOut.push(name);
  }
}
// SIGKILL leaves Playwright's chromium orphaned — reap them so they don't pile up.
if (timedOut.length) spawnSync("pkill", ["-f", "ms-playwright.*chrome|playwright.*chromium"]);

console.log(
  `\n● Done: ${ok}/${names.length} captured.${failed.length ? ` Failed: ${failed.join(", ")}` : ""}` +
    `${timedOut.length ? ` (timed out: ${timedOut.join(", ")})` : ""}`,
);

// Rebuild the client manifest so the new clips light up.
spawnSync("node", [join(root, "scripts/build-previews.mjs")], {
  stdio: "inherit",
});
