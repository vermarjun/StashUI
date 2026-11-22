"use client"

import { useEffect, useState } from "react"

import { TreeCodeViewer } from "./tree-code-viewer"

type SourceFile = {
  fileName: string
  virtualPath: string[]
  ext: string
  raw: string
}

const SOURCES: SourceFile[] = [
  {
    fileName: "pricing-card.tsx",
    virtualPath: ["pricing-card"],
    ext: "tsx",
    raw: `'use client';

import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function PricingCard({ plan, price, features, featured }: PricingCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn('rounded-2xl border p-6', featured && 'border-blue-500')}
    >
      <h3 className='text-lg font-semibold'>{plan}</h3>
      <p className='mt-2 text-4xl font-bold'>\${price}<span className='text-sm'>/mo</span></p>
      <ul className='mt-6 space-y-2 text-sm'>
        {features.map((f) => (
          <li key={f}>✓ {f}</li>
        ))}
      </ul>
      <Button className='mt-8 w-full'>Start free trial</Button>
    </motion.div>
  );
}`,
  },
  {
    fileName: "use-billing-cycle.ts",
    virtualPath: ["pricing-card"],
    ext: "ts",
    raw: `import { useState } from 'react';

export type Cycle = 'monthly' | 'yearly';

export function useBillingCycle(initial: Cycle = 'monthly') {
  const [cycle, setCycle] = useState<Cycle>(initial);
  const discount = cycle === 'yearly' ? 0.8 : 1;
  return { cycle, setCycle, price: (base: number) => Math.round(base * discount) };
}`,
  },
  {
    fileName: "button.tsx",
    virtualPath: ["ui"],
    ext: "tsx",
    raw: `import * as React from 'react';
import { cn } from '@/lib/utils';

export function Button({ className, ...props }: React.ComponentProps<'button'>) {
  return (
    <button
      className={cn('inline-flex h-10 items-center justify-center rounded-md px-4', className)}
      {...props}
    />
  );
}`,
  },
  {
    fileName: "utils.ts",
    virtualPath: ["lib"],
    ext: "ts",
    raw: `import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
  },
  {
    fileName: "package.json",
    virtualPath: [],
    ext: "json",
    raw: JSON.stringify(
      {
        name: "pricing-card",
        private: true,
        dependencies: { react: "19.x", motion: "^12", clsx: "^2", "tailwind-merge": "^3" },
      },
      null,
      2
    ),
  },
]

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

const plain = (raw: string) =>
  `<pre style="padding:16px;margin:0;background:#0d1117;color:#e6edf3"><code>${escape(raw)}</code></pre>`

export default function TreeCodeViewerDemo() {
  const [files, setFiles] = useState(() =>
    SOURCES.map((f) => ({
      ...f,
      id: [...f.virtualPath, f.fileName].join("/"),
      html: plain(f.raw),
    }))
  )

  useEffect(() => {
    let cancelled = false
    import("shiki").then(async ({ codeToHtml }) => {
      const highlighted = await Promise.all(
        SOURCES.map(async (f) => ({
          ...f,
          id: [...f.virtualPath, f.fileName].join("/"),
          html: await codeToHtml(f.raw, { lang: f.ext, theme: "github-dark" }),
        }))
      )
      if (!cancelled) setFiles(highlighted)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="dark w-full max-w-4xl p-6 [&_pre]:p-4 [&_pre]:text-[13px]">
      <TreeCodeViewer files={files} />
    </div>
  )
}
