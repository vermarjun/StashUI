# my/ui

A personal component library with a built in gallery. Browse the components,
preview them live, copy the source, or install any of them into a shadcn
project with a single command.

It is one searchable home for the React components I reuse across projects.

## Features

- Browse and search the whole library with a `Cmd+K` command palette
- Live, lazy loaded previews for every component
- Copy the source, or install with `npx shadcn@latest add <url>/r/<name>.json`
- A React and Next.js compatibility badge on each component
- Minimal monochrome theme with light and dark modes

## Stack

Next.js 15 (App Router), React 19, Tailwind v4, shadcn, shiki, next-themes.

## Getting started

```bash
npm install
npm run dev        # start the gallery at http://localhost:3000
npm run registry   # regenerate gallery data and installable JSON
npm run build      # production build
```

## How it works

There is one source of truth on disk and everything else is generated.

```
registry.json                 the manifest, one entry per component
registry/<category>/
  <name>.tsx                  the component
  <name>.demo.tsx             a usage example shown as the live preview
scripts/build-registry.mjs    the generator
src/__registry__/*.gen.ts     generated gallery data (do not edit)
public/r/<name>.json          generated installable items
```

`npm run registry` runs the generator, which inlines each component's source and
wires up its demo, then builds the installable `public/r/*.json` files. The app
reads the generated data to render the gallery and the per component detail page
at `/c/<name>`.

## Adding a component

1. Create two files in a category folder:

   ```
   registry/buttons/my-thing.tsx        the component
   registry/buttons/my-thing.demo.tsx   default exports a usage example
   ```

   The component should only import from `@/lib/utils` and shadcn primitives so
   it installs cleanly into other projects.

2. Add one entry to `registry.json` with the name, title, description, category,
   dependencies, and file paths.

3. Run `npm run registry`. The component now has a live preview, a copy button,
   a detail page, and an installable URL.

## Cross framework compatibility

Every component is universal. It installs and runs the same in plain React
(Vite), Next.js, Remix, or Astro, and the install command is identical
everywhere. Three rules keep it that way:

1. No framework specific imports. Avoid `next/link`, `next/image`, and the like.
   Use the `asChild` pattern for links and a plain `<img>` for images.
2. `"use client"` is fine. It is a no op outside Next.js, so keep it on anything
   that uses hooks or state.
3. Guard browser APIs. Read `window` and `document` inside `useEffect` or behind
   a mounted flag so server rendering does not break.

`npm run registry` checks every component and warns if one is not portable.

## Deploy

Push to GitHub and import the repo on Vercel with zero config. After deploying,
the install URLs become `https://<your-domain>/r/<name>.json`.

## License

MIT
