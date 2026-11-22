"use client";

import GlideSelect from "./glide-select";

export default function GlideSelectDemo() {
  return (
    <div className="flex min-h-[420px] w-full items-start justify-center bg-background pt-24">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span>Sort issues by</span>
        <GlideSelect
          ariaLabel="Sort issues"
          size="lg"
          defaultValue="updated"
          menuWidth={200}
          options={[
            { value: "updated", label: "Last updated", tag: "U" },
            { value: "created", label: "Newest first", tag: "N" },
            { value: "priority", label: "Priority", tag: "P" },
            { value: "comments", label: "Most discussed", tag: "D" },
            { value: "assignee", label: "Assignee", tag: "A" },
          ]}
        />
      </div>
    </div>
  );
}
