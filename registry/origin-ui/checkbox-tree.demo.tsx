"use client";

import { CheckboxTree } from "@/registry/origin-ui/checkbox-tree";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const tree = {
  id: "root",
  label: "All Categories",
  children: [
    {
      id: "frontend",
      label: "Frontend",
      children: [
        { id: "react", label: "React", defaultChecked: true },
        { id: "vue", label: "Vue" },
        { id: "svelte", label: "Svelte", defaultChecked: true },
      ],
    },
    {
      id: "backend",
      label: "Backend",
      children: [
        { id: "node", label: "Node.js", defaultChecked: true },
        { id: "python", label: "Python" },
        { id: "go", label: "Go" },
      ],
    },
    {
      id: "database",
      label: "Database",
      children: [
        { id: "postgres", label: "PostgreSQL" },
        { id: "mongo", label: "MongoDB" },
      ],
    },
  ],
};

export default function Demo() {
  return (
    <div className="flex items-center justify-center min-h-[300px] p-8">
      <div className="w-64 space-y-1">
        <CheckboxTree
          tree={tree}
          renderNode={({ node, isChecked, onCheckedChange, children }) => (
            <div key={node.id} className="space-y-1">
              <div className="flex items-center gap-2 py-0.5">
                <Checkbox
                  id={node.id}
                  checked={isChecked === true ? true : isChecked === "indeterminate" ? "indeterminate" : false}
                  onCheckedChange={onCheckedChange}
                />
                <Label htmlFor={node.id} className="cursor-pointer font-normal">
                  {node.label}
                </Label>
              </div>
              {children && (
                <div className="pl-6 space-y-1 border-l border-border ml-2">
                  {children}
                </div>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
}
