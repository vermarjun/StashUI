// Record → edit → QA a list of components. A new clip replaces the live one in
// public/previews ONLY if it passes QA; failures are logged for a re-shoot and
// the old clip stays up meanwhile.
//
//   node scripts/rec/batch.mjs <names... | --category slug | --file names.txt | --all>
//        [--base URL] [--mode native|screencast] [--jobs 2] [--retries 1] [--skip-done]
//
// Report: .rec/reports/<name>.json (pass/fails/sheet). Sheets: .rec/sheets/.

import { spawn } from "node:child_process";
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const args = process.argv.slice(2);
const opt = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const BASE = opt("--base", "http://localhost:3000");
const MODE = opt("--mode", null);
const JOBS = +opt("--jobs", "1");
const RETRIES = +opt("--retries", "1");
const REC = join(root, ".rec");
const STAGE = join(REC, "out");
const LIVE = join(root, "public", "previews");
// one file per component, so several agents can run batches side by side
const REPORTS = join(REC, "reports");
mkdirSync(STAGE, { recursive: true });
mkdirSync(REPORTS, { recursive: true });

const cats = JSON.parse(readFileSync(join(root, "registry", "categories.json"), "utf8"));
const all = JSON.parse(readFileSync(join(root, "registry.json"), "utf8")).items.map((i) => i.name);
const flagVals = new Set(["--base", "--mode", "--jobs", "--retries", "--category", "--file", "--post-jobs"].map((k) => opt(k, null)).filter(Boolean));
let names = args.filter((a) => !a.startsWith("--") && !flagVals.has(a));
if (args.includes("--all")) names = all;
if (opt("--category", null)) names = all.filter((n) => [].concat(cats[n] ?? [])[0] === opt("--category"));
if (opt("--file", null)) names = readFileSync(opt("--file"), "utf8").split(/\s+/).filter(Boolean);

const report = {};
const reportFile = (n) => join(REPORTS, `${n}.json`);
if (args.includes("--skip-done"))
  names = names.filter((n) => !(existsSync(reportFile(n)) && JSON.parse(readFileSync(reportFile(n), "utf8")).pass));

// Every step gets a hard time limit (waiting for a recording slot included),
// so one hung take can't stall a whole batch.
function run(cmd, a, limitMs = 300000) {
  return new Promise((resolve) => {
    const p = spawn(cmd, a, { cwd: root, stdio: ["ignore", "pipe", "pipe"] });
    let out = "";
    const timer = setTimeout(() => {
      out += `\nError: timed out after ${limitMs / 1000}s`;
      p.kill("SIGTERM");
      setTimeout(() => p.kill("SIGKILL"), 5000);
    }, limitMs);
    p.stdout.on("data", (d) => (out += d));
    p.stderr.on("data", (d) => (out += d));
    p.on("exit", (code) => {
      clearTimeout(timer);
      resolve({ code, out });
    });
  });
}

// Recording needs the screen; editing/encoding doesn't. So a take is recorded,
// then its edit + QA run in the background (up to POST_JOBS at once) while the
// next take records. A clip that fails QA is re-recorded at the end.
const POST_JOBS = +opt("--post-jobs", "3");
let postRunning = 0;
const postWaiters = [];
const postSlot = async () => {
  while (postRunning >= POST_JOBS) await new Promise((r) => postWaiters.push(r));
  postRunning++;
};
const postFree = () => {
  postRunning--;
  postWaiters.shift()?.();
};

async function record(name, slot, attempt) {
  const takeArgs = ["scripts/rec/take.mjs", name, "--base", BASE, "--x", String(40 + slot * 60), "--y", String(60 + slot * 40)];
  if (MODE) takeArgs.push("--mode", MODE);
  const t = await run("node", takeArgs);
  if (t.code === 0) return true;
  // keep the actual error line, not node's trailing version banner
  const errLine =
    t.out.match(/^\s*(?:\w*Error|page\.\w+|locator\.\w+|browserType\.\w+|TimeoutError)[^\n]*/m)?.[0] ??
    t.out.trim().split("\n").slice(-3, -1).join(" ");
  report[name] = { pass: false, fails: ["take failed: " + errLine.trim().slice(0, 240)], attempt };
  return false;
}

async function post(name, attempt) {
  const e = await run("node", ["scripts/rec/edit.mjs", name, "--out", STAGE, ...(args.includes("--no-live") ? ["--fast"] : [])]);
  if (e.code !== 0) {
    report[name] = { pass: false, fails: ["edit failed: " + e.out.trim().split("\n").slice(-1)[0]?.slice(0, 200)], attempt };
    return;
  }
  const take = JSON.parse(readFileSync(join(REC, "raw", `${name}.take.json`), "utf8"));
  const isStatic = take.marks?.some((m) => m.label === "kenburns" || m.label === "static");
  await run("node", ["scripts/rec/qa.mjs", name, "--dir", STAGE, "--json", join(REC, `${name}.qa.json`), ...(isStatic ? ["--static"] : []), ...(take.scroll ? ["--long"] : [])]);
  const qa = JSON.parse(readFileSync(join(REC, `${name}.qa.json`), "utf8"))[0];
  report[name] = { ...qa, attempt, routine: take.routine, zoom: take.zoom, choreoError: take.choreoError, pageErrors: take.pageErrors?.length || 0, at: new Date().toISOString() };
  if (qa.pass && !args.includes("--no-live"))
    for (const ext of ["mp4", "jpg"]) copyFileSync(join(STAGE, `${name}.${ext}`), join(LIVE, `${name}.${ext}`));
}

let done = 0;
const t0 = Date.now();
const posts = [];
const finish = (name) => {
  done++;
  const r = report[name];
  const eta = (((Date.now() - t0) / done) * (names.length - done)) / 60000;
  console.log(`[${done}/${names.length}] ${r?.pass ? "PASS" : "FAIL"} ${name}${r?.pass ? "" : "  — " + (r?.fails || []).join("; ")}  (eta ${eta.toFixed(0)}m)`);
  writeFileSync(reportFile(name), JSON.stringify({ name, ...r }, null, 1));
};

async function runRound(list, attempt, last) {
  let i = 0;
  const again = [];
  await Promise.all(
    Array.from({ length: Math.max(1, JOBS) }, async (_, slot) => {
      while (i < list.length) {
        const name = list[i++];
        let ok = await record(name, slot, attempt);
        if (!ok && !last) ok = await record(name, slot, attempt); // quick retry of a failed take
        if (!ok) {
          if (last) finish(name);
          else again.push(name);
          continue;
        }
        await postSlot();
        posts.push(
          post(name, attempt)
            .catch((err) => (report[name] = { pass: false, fails: ["post failed: " + String(err.message).slice(0, 200)], attempt }))
            .finally(() => {
              postFree();
              if (report[name]?.pass || last) finish(name);
              else again.push(name);
            }),
        );
      }
    }),
  );
  await Promise.all(posts);
  return again;
}

let pending = names;
for (let attempt = 0; attempt <= RETRIES && pending.length; attempt++) {
  pending = await runRound(pending, attempt, attempt === RETRIES);
}
for (const n of pending) if (!report[n]) finish(n);

const failed = names.filter((n) => !report[n]?.pass);
console.log(`\n${names.length - failed.length}/${names.length} passed${args.includes("--no-live") ? " (staged only, --no-live)" : " and went live"}. Failed: ${failed.join(", ") || "none"}`);
console.log("Next: npm run previews   (rebuild the previews manifest)");

// child pipes can keep the event loop alive after the summary; always exit
process.exit(0);
