# Vercel Deployment Runbook — Client & Admin

> Handoff doc for the next agent who owns **frontend deploys to Vercel**.
> Last verified: 2026-06-05. Scope: the two Vite SPAs only (`Client/`, `Admin/`).
> The **API is NOT on Vercel** — it runs on EC2 (`65.0.18.58`, Docker) and is a
> different agent's job. Do not try to deploy the API here.

---

## 1. What you're deploying

| App | Local dir | Vercel project | Team scope | Production URL(s) |
|-----|-----------|----------------|------------|-------------------|
| **Client** (main app) | `Client/` | `stitcher-client` | `stitcher` | `https://stitcher.cloud`, `https://www.stitcher.cloud`, `https://stitcher-client.vercel.app` |
| **Admin** (dashboard) | `Admin/` | `stitcher-admin` | `stitcher` | `https://stitcher-admin.vercel.app` |

Both are **Vite + React SPAs** → they compile to static files (`dist/`). The Client
also has **3 Vercel serverless functions** in `Client/api/` (share/embed previews).

- Vercel team: **`stitcher`** (pass `--scope stitcher` to every command).
- Project IDs live in each app's `.vercel/project.json` (Client orgId
  `team_rqDjOKd9wgG7OKGHfzshfjoG`, projectId `prj_pIx4bEChAMGOE18VBPV3LrT8IrSe`).
- Backend the frontends talk to: `https://stitcherapi.duckdns.org/api`.

---

## 2. Auth (do this first)

The Vercel CLI is used via `npx vercel`. You need to be authenticated to the
`stitcher` team. Two ways:

- **Interactive (this machine is already logged in):** `npx vercel whoami --scope stitcher`
  should print `vermarjun26-2887`. If it does, you're set — the session lives in
  `~/.vercel` and persists. If not, run `npx vercel login` and complete it in the browser.
- **Token (for headless/CI):** create one at <https://vercel.com/account/tokens>,
  then prefix commands with `VERCEL_TOKEN=<token>` or pass `--token <token>`.

> There is no pre-made API token to paste here — auth was done interactively. Make
> one from the dashboard if you need non-interactive runs.

---

## 3. Environment variables (set on the Vercel project, **Production** scope)

These are **build-time** `VITE_*` vars (Vite inlines them into the browser bundle,
so they are public by nature — not secrets). They must exist on the project
**before** the build runs. The Client functions also read `VITE_BACKEND_URL` at
runtime (Vercel injects project env into the function runtime too).

**Client (`stitcher-client`):**
```
VITE_BACKEND_URL=https://stitcherapi.duckdns.org/api
VITE_GOOGLE_CLIENT_ID=706684431869-k8ua46lcb22v5n30onv4pg833jkk2tph.apps.googleusercontent.com
VITE_RZP_KEY_ID=rzp_live_SxcuJuzG5uwi6S        # Razorpay LIVE *publishable* key id (public; goes in the bundle)
VITE_CLARITY_PROJECT_ID=x0x243rwm7
```

**Admin (`stitcher-admin`):**
```
VITE_BACKEND_URL=https://stitcherapi.duckdns.org/api
# VITE_GRAFANA_URL / VITE_LANGFUSE_URL intentionally UNSET (no public prod URL).
# The app loads fine; only the Grafana/Langfuse deep-links won't work.
```

**Set / list / change an env var:**
```bash
cd Client                                   # or Admin (must be linked, see §4)
npx vercel env ls production --scope stitcher

# add new:
printf '%s' "VALUE" | npx vercel env add VITE_BACKEND_URL production --scope stitcher

# change existing (there is no in-place edit — remove then re-add):
npx vercel env rm VITE_RZP_KEY_ID production --yes --scope stitcher
printf '%s' "rzp_live_SxcuJuzG5uwi6S" | npx vercel env add VITE_RZP_KEY_ID production --scope stitcher
```
> Env changes only take effect on the **next** `vercel deploy` (build-time inlining).

---

## 4. Deploy procedure (the routine)

```bash
cd Client          # or: cd Admin

# (first time on a fresh checkout only) link the local dir to the project:
npx vercel link --yes --project stitcher-client --scope stitcher    # Admin: --project stitcher-admin

# 1) CASE-SENSITIVITY GUARD — must print "clean" (see Gotcha A). The real dir is
#    Client/src/Components (capital C); a lowercase "@/components/..." import builds
#    on macOS but FAILS on Vercel's Linux.
grep -rnE "@/(components|state|pages|context|router|layouts)/" src --include="*.tsx" --include="*.ts" || echo "clean ✓"

# 2) Local sanity build (catches most breakage before burning a remote build):
node_modules/.bin/vite build

# 3) Deploy + promote to production:
npx vercel deploy --prod --yes --scope stitcher
```

The `--prod` deploy builds remotely (pulling the Production env vars), then promotes
the result to the production alias (`stitcher.cloud` for Client). It deploys the
**current working tree** (uncommitted changes included) — you do NOT need to commit
or push first.

---

## 5. Gotchas (every one of these has bitten a deploy)

**A. Case-sensitivity (macOS builds, Linux doesn't).** macOS FS is case-insensitive;
Vercel's Linux build is case-sensitive. `import ... from "@/components/ui/x"` resolves
locally but 404s the module on Vercel (real dir is `@/Components`). Always run the
guard in §4 step 1; fix any lowercase `@/components/...` → `@/Components/...`.

**B. Build command is `vite build`, NOT `npm run build`.** `npm run build` is
`tsc -b && vite build`, and `tsc -b` fails on pre-existing type errors across the
repo. Each `vercel.json` overrides `buildCommand` to `vite build` (transpiles, no
typecheck). Keep it that way unless you've fixed all type errors.

**C. Client serverless functions must use `.js` import extensions.**
`Client/package.json` is `"type": "module"`, so Vercel compiles `Client/api/*.ts`
as ESM (`nodenext`). **Relative imports must end in `.js`** even though the file is
`.ts`:
```ts
import { fetchShare } from "./_shared.js";   // ✅  (file on disk is _shared.ts)
import { fetchShare } from "./_shared";      // ❌  500s at runtime
```
The build prints `error TS2835 ... Did you mean './_shared.js'?` but **still
deploys the broken function** (esbuild warning, not a hard fail) — so you only
notice when `/v/:id` returns HTTP 500. Files prefixed `_` (e.g. `_shared.ts`) are
bundled when imported but are NOT exposed as public routes.

**D. Deployment-specific URLs return 401.** The per-deploy URL
(`stitcher-client-<hash>-stitcher.vercel.app`) has Deployment Protection → 401 is
**normal**. Always verify on the public production alias (`stitcher.cloud`,
`stitcher-client.vercel.app`, `stitcher-admin.vercel.app`).

**E. CORS lives on the API box, not Vercel.** The API gates REST + websockets on
`ALLOWED_ORIGINS` (in `API/.env.docker` on `65.0.18.58`). It must include every
frontend origin or the live site is CORS-blocked. Currently allows
`https://stitcher.cloud` and `https://stitcher-admin.vercel.app`; **NOT**
`https://www.stitcher.cloud` or `https://stitcher-client.vercel.app`. Changing that
is the API/AWS agent's job — coordinate, don't do it from here.

---

## 6. Custom domain (`stitcher.cloud`) — already wired

- Registrar/DNS: **Hostinger** (nameservers `ns1/ns2.dns-parking.com`).
- A records (already set): `@` → `76.76.21.21`, `www` → `76.76.21.21` (Vercel).
- Attached to the `stitcher-client` project; Vercel auto-issues + renews SSL.
- To attach another domain to the linked project:
  `cd Client && npx vercel domains add <domain> --scope stitcher` (single-arg form
  when the dir is linked), then set its DNS at Hostinger per Vercel's instructions.

---

## 7. Post-deploy verification

```bash
# Basic: production alias serves 200
curl -s -o /dev/null -w "stitcher.cloud %{http_code}\n" https://stitcher.cloud

# SPA client routes don't 404 (rewrite to index.html):
curl -s -o /dev/null -w "/auth %{http_code}\n" https://stitcher.cloud/auth

# Confirm an env value actually shipped in the bundle (example: live Razorpay key):
base=https://stitcher.cloud
entry=$(curl -s "$base/" | grep -oE '/assets/index-[A-Za-z0-9_-]+\.js' | head -1)
mainhome=$(curl -s "$base$entry" | grep -oE 'Main\.home-[A-Za-z0-9_-]+\.js' | head -1)
curl -s "$base/assets/$mainhome" | grep -oE 'rzp_(live|test)_[A-Za-z0-9]+' | sort -u   # expect rzp_live_..., no rzp_test_

# Share/embed functions (use a REAL shareId for the happy path; __probe__ exercises plumbing):
curl -s -o /dev/null -w "/v %{http_code}\n"     "$base/v/__probe__"          # 200 (HTML w/ OG tags)
curl -s -o /dev/null -w "/embed %{http_code}\n" "$base/embed/__probe__"      # 404 "Video unavailable" for bad id
curl -s "$base/v/__probe__" | grep -oE 'property="og:title"'                 # OG tags injected
```

---

## 8. Where the real secrets are (NOT needed for Vercel, do not paste here)

These belong to the **API box**, not the frontend deploy:
- Razorpay **secret** + webhook secret, Mongo Atlas URI, Gemini/LLM keys,
  `RENDER_API_KEY`, etc. → `API/.env.docker` on `65.0.18.58`
  (`~/stitcher/Stitcher_new/Stitcher/API/.env.docker`).
- SSH key for the box: `~/.ssh/StitcherReborn.pem`, user `ubuntu`.

If a deploy needs one of these, you're outside the Vercel scope — hand it to the
API/AWS agent.
