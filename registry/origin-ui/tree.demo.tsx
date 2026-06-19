"use client";

import { hotkeysCoreFeature, selectionFeature, syncDataLoaderFeature } from "@headless-tree/core";
import { useTree } from "@headless-tree/react";
import { FileIcon, FolderIcon, FolderOpenIcon } from "lucide-react";

import { Tree, TreeItem, TreeItemLabel } from "@/registry/origin-ui/tree";

interface Item {
  name: string;
  children?: string[];
}

const items: Record<string, Item> = {
  root:       { name: "my-app",     children: ["src", "public", "pkg"] },
  src:        { name: "src",        children: ["components", "lib", "app-ts"] },
  components: { name: "components", children: ["button-tsx", "card-tsx", "modal-tsx"] },
  lib:        { name: "lib",        children: ["utils-ts", "hooks-ts"] },
  "app-ts":   { name: "app.ts" },
  "button-tsx": { name: "Button.tsx" },
  "card-tsx":   { name: "Card.tsx" },
  "modal-tsx":  { name: "Modal.tsx" },
  "utils-ts":   { name: "utils.ts" },
  "hooks-ts":   { name: "hooks.ts" },
  public:     { name: "public",     children: ["favicon-ico", "logo-svg"] },
  "favicon-ico": { name: "favicon.ico" },
  "logo-svg":    { name: "logo.svg" },
  pkg:        { name: "package.json" },
};

const indent = 20;

export default function Demo() {
  const tree = useTree<Item>({
    dataLoader: {
      getChildren: (id) => items[id].children ?? [],
      getItem: (id) => items[id],
    },
    features: [syncDataLoaderFeature, selectionFeature, hotkeysCoreFeature],
    getItemName: (item) => item.getItemData().name,
    indent,
    initialState: {
      expandedItems: ["src", "components"],
      selectedItems: ["button-tsx"],
    },
    isItemFolder: (item) => (item.getItemData().children?.length ?? 0) > 0,
    rootItemId: "root",
  });

  return (
    <div className="w-64 rounded-xl border bg-background p-3">
      <Tree indent={indent} tree={tree}>
        {tree.getItems().map((item) => (
          <TreeItem item={item} key={item.getId()}>
            <TreeItemLabel>
              <span className="flex items-center gap-2">
                {item.isFolder() ? (
                  item.isExpanded() ? (
                    <FolderOpenIcon className="pointer-events-none size-4 text-muted-foreground" />
                  ) : (
                    <FolderIcon className="pointer-events-none size-4 text-muted-foreground" />
                  )
                ) : (
                  <FileIcon className="pointer-events-none size-4 text-muted-foreground" />
                )}
                {item.getItemName()}
              </span>
            </TreeItemLabel>
          </TreeItem>
        ))}
      </Tree>
    </div>
  );
}
