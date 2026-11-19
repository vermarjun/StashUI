"use client";

import { useState } from "react";

import MultipleSelector, { type Option } from "@/registry/origin-ui/multiselect";

const frameworks: Option[] = [
  { label: "Next.js", value: "nextjs" },
  { label: "React", value: "react" },
  { label: "Remix", value: "remix" },
  { label: "Astro", value: "astro" },
  { label: "SvelteKit", value: "sveltekit" },
  { label: "Nuxt.js", value: "nuxt" },
  { label: "Vite", value: "vite" },
  { label: "Angular", value: "angular", disable: true },
  { label: "Gatsby", value: "gatsby" },
];

export default function Demo() {
  const [value, setValue] = useState<Option[]>([frameworks[0], frameworks[3]]);

  return (
    <div className="flex min-h-[460px] w-full items-start justify-center px-6 pt-16">
      <div className="w-full max-w-md space-y-2">
        <label className="font-medium text-foreground text-sm" htmlFor="frameworks">
          Frameworks you ship with
        </label>
        <MultipleSelector
          commandProps={{ label: "Select frameworks" }}
          value={value}
          onChange={setValue}
          defaultOptions={frameworks}
          placeholder="Select frameworks"
          hideClearAllButton={false}
          hidePlaceholderWhenSelected
          emptyIndicator={<p className="text-center text-sm">No results found</p>}
        />
        <p className="text-muted-foreground text-xs">Pick as many as you like. Type to filter.</p>
      </div>
    </div>
  );
}
