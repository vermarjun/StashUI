# my/ui — personal component library

A clean, personal component library built on **shadcn** that aggregates
**~2,000 components** from many open-source libraries into one searchable place —
so you never hop between 15 bookmarked sites again.

- 🔍 **Browse by library** + global `⌘K` search across everything
- 🖼️ **Live previews** (lazy-loaded), **copy** source, and **install** any
  component into any shadcn project: `npx shadcn@latest add <your-url>/r/<name>.json`
- 🏷️ **React / Next.js badges** per component + **source attribution** on detail
  pages for components imported as-is
- 🌗 Minimal monochrome shell (Geist + neutral theme), light/dark

### What's inside (~2,055 components, 15 categories)

| Source | Count | | Source | Count |
| --- | --- | --- | --- | --- |
| Animate UI | 573 | | Aceternity UI | 116 |
| Origin UI | 550 | | Cult UI | 72 |
| Ui-Layouts | 235 | | Magic UI | 72 |
| Gradients (WebGradients) | 174 | | **Mine** (hand-built + Vue ports) | 133 |
| React Bits | 130 | | | |

Imported libraries are **credited** (link on each detail page). **Inspira UI**
(Vue) was **ported to React** and is treated as mine (no credit). Paid libraries
(Skiper, Efferd) and Aceternity's Pro blocks were skipped automatically.

## Stack

Next.js 15 (App Router) · React 19 · Tailwind v4 · shadcn (radix-nova) ·
shiki (syntax highlighting) · next-themes.

## Run it

```bash
npm run dev          # start the gallery (http://localhost:3000)
npm run registry     # regenerate gallery data + build installable JSON
npm run build        # production build (all detail pages prerender via SSG)
```

> Note: this machine has a stray root-owned npm cache. If an install fails with
> `EACCES`, prefix the command with `npm_config_cache=/tmp/npmcache-myui` (or
> run `sudo chown -R $(id -u):$(id -g) ~/.npm` once to fix it permanently).

## How it works

There is **one source of truth on disk** and everything else is generated.

```
registry.json                 ← the manifest: one entry per component
registry/<category>/
  <name>.tsx                  ← the component itself
  <name>.demo.tsx             ← the live preview / usage example
scripts/build-registry.mjs    ← generator (reads the two above)
src/__registry__/*.gen.ts     ← GENERATED gallery data (do not edit)
public/r/<name>.json          ← GENERATED installable items (shadcn build)
```

`npm run registry` runs the generator (which inlines each component's source +
wires up its demo) and then `shadcn build` (which emits the installable
`public/r/*.json`). The Next.js app reads the generated data to render the
gallery and the per-component detail pages at `/c/<name>`.

## 📥 Importing more libraries (the pipeline)

Bulk-importing is fully scripted. To add another shadcn-compatible registry:

1. Add an entry to `scripts/libraries.json` (`indexUrl`, `perComponentUrl`
   template, `attributionBase`, optional `indexTypeIn` filter).
2. Run the pipeline:

   ```bash
   npm run import                  # fetch all components -> registry/<slug>/
   node scripts/fix-imports.mjs    # normalize @/ui, @/lib/utils, @/hooks imports
   node scripts/regen-demos.mjs    # fill missing demos (skips existing)
   node scripts/validate-build.mjs --apply   # esbuild ground-truth: drop demos that can't compile
   npm run registry                # regenerate data + build installable /r/*.json
   ```

What the scripts do:

| Script | Job |
| --- | --- |
| `scripts/import-lib.mjs` | Fetches each component's registry JSON (concurrent), namespaces by library, rewrites internal imports, writes attribution to `registry/sources.json` |
| `scripts/import-gradients.mjs` | Imports WebGradients presets as components |
| `scripts/fix-imports.mjs` | Maps vendor `.../ui/*`, `.../lib/utils`, `.../hooks/*` imports onto our tree |
| `scripts/validate-build.mjs` | Bundles every demo with esbuild (real resolution + syntax, matching Turbopack); removes only the demos that can't compile so the component stays listed without a preview |
| `scripts/resolve-check.mjs` | Static import/primitive gap report |

The `validate-build` step is what keeps the build green at this scale — a broken
vendor component degrades to "Preview unavailable" instead of breaking the app.

> Ported Vue components (Inspira UI) live in `registry/inspira-react/` and are
> merged via `scripts/merge-ported.mjs` with `ported: true` (no credit shown).

## ➕ Add a new component

1. **Create two files** under a category folder, e.g. for a button:

   ```
   registry/buttons/my-thing.tsx        # the component
   registry/buttons/my-thing.demo.tsx   # default-exports a usage example
   ```

   The component should only import from `@/lib/utils` (and any shadcn
   primitives) so it installs cleanly into other projects. The demo imports the
   component via `@/registry/<category>/my-thing`.

2. **Add one entry to `registry.json`:**

   ```json
   {
     "name": "my-thing",
     "type": "registry:component",
     "title": "My Thing",
     "description": "What it does, in one line.",
     "categories": ["buttons"],
     "registryDependencies": [],
     "dependencies": [],
     "files": [
       {
         "path": "registry/buttons/my-thing.tsx",
         "type": "registry:component",
         "target": "components/ui/my-thing.tsx"
       }
     ]
   }
   ```

   - `registryDependencies`: other shadcn components it needs (e.g. `"button"`).
   - `dependencies`: npm packages it needs (e.g. `"motion"`).
   - If it needs custom keyframes, add a `css` / `cssVars` block (see the
     existing `marquee` / `shimmer-button` entries) so installs are
     self-contained.

3. **Regenerate:**

   ```bash
   npm run registry
   ```

   The component now has a live preview, a copy button, a detail page, and an
   installable URL. New categories appear automatically.

## Cross-framework compatibility (React + Next.js + …)

Every component here is meant to be **universal** — it installs and runs the same
in a plain React + TypeScript project (Vite/CRA), Next.js, Remix, Astro, etc.
The install command is identical everywhere: `npx shadcn add <url>`.

The gallery shows a **React / Next.js badge** on each component, and
`npm run registry` **auto-checks** every component, warning you if one isn't
portable. To stay universal, follow three rules when adding/pasting components:

1. **No framework-specific imports.** Don't import `next/link`, `next/image`,
   `next/navigation`, `next/font`, etc. The generator flags these automatically.
   - Need a link? Use the polymorphic `asChild` pattern so the consumer supplies
     their own link element (see `gradient-button.tsx`):
     ```tsx
     <GradientButton asChild>
       <Link href="/x">Go</Link>   {/* or <a>, or Remix <Link> */}
     </GradientButton>
     ```
   - Need an image? Take `src`/`alt` props and render a plain `<img>`.
2. **`"use client"` is fine.** It's a no-op outside Next.js — bundlers ignore it.
   Keep it on any component that uses hooks/state/effects.
3. **Guard browser APIs.** Code that touches `window`/`document` during render
   breaks Next's server render (it's fine in CSR-only Vite, so it's easy to miss).
   Read them inside `useEffect`, or gate with a mounted flag:
   ```tsx
   const [mounted, setMounted] = React.useState(false);
   React.useEffect(() => setMounted(true), []);
   if (!mounted) return null; // or a skeleton
   ```

If a component genuinely must be Next-only, that's allowed — it'll just show a
single **Next.js** badge instead of both.

## Where things live

| Path | What |
| --- | --- |
| `src/app/page.tsx` | The gallery (grouped by category) |
| `src/app/c/[name]/page.tsx` | Per-component detail page |
| `src/components/site/*` | Gallery shell (header, sidebar, previews, code, ⌘K) |
| `src/components/ui/*` | shadcn primitives |
| `registry/*` | Your components (the library itself) |

## Deploy

Push to GitHub and import on Vercel — zero config. After deploying, your
install URLs become `https://<your-domain>/r/<name>.json`. The detail pages
already show the live command with the correct origin.
