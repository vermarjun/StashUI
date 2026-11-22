"use client"

import { FileCode2, Folder, TerminalSquare } from "lucide-react"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./resizable"

const files = [
  { name: "app", folder: true },
  { name: "layout.tsx" },
  { name: "page.tsx", active: true },
  { name: "components", folder: true },
  { name: "sidebar.tsx" },
  { name: "chart.tsx" },
  { name: "lib", folder: true },
  { name: "utils.ts" },
]

const code = [
  ["import", " { Card } ", "from", ' "@/components/ui/card"'],
  ["", "", "", ""],
  ["export default", " function ", "Page", "() {"],
  ["  return", " (", "", ""],
  ["    ", "<Card ", "className", '="p-6">'],
  ["      ", "<h1>", "Revenue", "</h1>"],
  ["      ", "<Chart ", "data", "={monthly} />"],
  ["    ", "</Card>", "", ""],
  ["  )", "", "", ""],
  ["}", "", "", ""],
]

export default function ResizableDemo() {
  return (
    <div className="flex h-full min-h-[560px] w-full items-center justify-center p-6">
      <ResizablePanelGroup
        orientation="horizontal"
        className="h-[500px] max-w-4xl rounded-xl border border-border bg-card text-sm"
      >
        <ResizablePanel defaultSize="24%" minSize="14%">
          <div className="flex h-full flex-col gap-0.5 p-3">
            <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Explorer
            </p>
            {files.map((f) => (
              <div
                key={f.name}
                className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${
                  f.active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                } ${f.folder ? "" : "pl-6"}`}
              >
                {f.folder ? (
                  <Folder className="size-4" />
                ) : (
                  <FileCode2 className="size-4" />
                )}
                {f.name}
              </div>
            ))}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="76%">
          <ResizablePanelGroup orientation="vertical">
            <ResizablePanel defaultSize="66%">
              <div className="flex h-full flex-col">
                <div className="border-b border-border px-4 py-2 text-xs text-muted-foreground">
                  app/page.tsx
                </div>
                <pre className="flex-1 overflow-hidden p-4 font-mono text-[13px] leading-6">
                  {code.map((l, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="w-5 text-right text-muted-foreground/50">
                        {i + 1}
                      </span>
                      <span>
                        <span className="text-violet-400">{l[0]}</span>
                        <span className="text-foreground">{l[1]}</span>
                        <span className="text-sky-400">{l[2]}</span>
                        <span className="text-emerald-400">{l[3]}</span>
                      </span>
                    </div>
                  ))}
                </pre>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize="34%" minSize="12%">
              <div className="flex h-full flex-col p-4 font-mono text-xs">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                  <TerminalSquare className="size-4" /> Terminal
                </div>
                <p className="text-muted-foreground">$ npm run dev</p>
                <p className="text-emerald-400">▲ Next.js 15.5 ready on http://localhost:3000</p>
                <p className="text-muted-foreground">✓ Compiled /page in 412ms</p>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
