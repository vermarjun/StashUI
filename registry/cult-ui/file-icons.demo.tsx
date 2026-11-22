"use client"

import { getIconForLanguageExtension, Icons } from "./file-icons"

const iconKeys = Object.keys(Icons) as (keyof typeof Icons)[]

const files = [
  { name: "package.json", ext: "json" },
  { name: "globals.css", ext: "css" },
  { name: "button.tsx", ext: "tsx" },
  { name: "utils.ts", ext: "ts" },
  { name: "README.md", ext: "md" },
  { name: "index.js", ext: "js" },
]

export default function FileIconsDemo() {
  return (
    <div className="flex w-full max-w-3xl flex-col gap-8 p-8">
      <ul className="grid grid-cols-4 gap-3 sm:grid-cols-6">
        {iconKeys.map((key) => {
          const Icon = Icons[key]
          return (
            <li
              className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-muted"
              key={key}
            >
              <Icon aria-hidden className="size-7 text-foreground" />
              <span className="text-muted-foreground text-xs">{key}</span>
            </li>
          )
        })}
      </ul>
      <div className="rounded-lg border border-border bg-card p-2">
        <p className="px-2 pt-1 pb-2 font-medium text-muted-foreground text-xs uppercase tracking-wider">
          src/
        </p>
        <ul className="flex flex-col">
          {files.map((f) => (
            <li
              className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-foreground text-sm hover:bg-muted [&_svg]:size-4"
              key={f.name}
            >
              {getIconForLanguageExtension(f.ext)}
              <span className="font-mono">{f.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
