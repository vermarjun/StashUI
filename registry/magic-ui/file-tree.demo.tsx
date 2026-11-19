"use client"

import { Tree, type TreeViewElement } from "@/registry/magic-ui/file-tree"

const elements: TreeViewElement[] = [
  {
    id: "1",
    name: "src",
    type: "folder",
    children: [
      {
        id: "2",
        name: "components",
        type: "folder",
        children: [
          { id: "3", name: "Button.tsx", type: "file" },
          { id: "4", name: "Input.tsx", type: "file" },
          { id: "5", name: "Modal.tsx", type: "file" },
        ],
      },
      {
        id: "6",
        name: "pages",
        type: "folder",
        children: [
          { id: "7", name: "index.tsx", type: "file" },
          { id: "8", name: "about.tsx", type: "file" },
        ],
      },
      { id: "9", name: "App.tsx", type: "file" },
      { id: "10", name: "main.tsx", type: "file" },
    ],
  },
  {
    id: "11",
    name: "public",
    type: "folder",
    children: [
      { id: "12", name: "favicon.ico", type: "file" },
      { id: "13", name: "logo.svg", type: "file" },
    ],
  },
  { id: "14", name: "package.json", type: "file" },
  { id: "15", name: "tsconfig.json", type: "file" },
]

export default function Demo() {
  return (
    <div className="h-96 w-full max-w-sm overflow-hidden rounded-lg border border-border bg-card p-4 text-card-foreground">
      <Tree
        elements={elements}
        initialExpandedItems={["1", "2"]}
        initialSelectedId="3"
      />
    </div>
  )
}
