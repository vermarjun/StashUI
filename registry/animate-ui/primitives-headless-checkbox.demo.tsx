"use client";

import { Checkbox, CheckboxIndicator } from "@/registry/animate-ui/primitives-headless-checkbox";

const TASKS = [
  { label: "Write the release notes", done: true },
  { label: "Record the product demo", done: true },
  { label: "Review open pull requests", done: false },
  { label: "Ship v2.4 to production", done: false },
];

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-8">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
        <h3 className="font-semibold text-base">Launch checklist</h3>
        <p className="mt-1 text-muted-foreground text-sm">The tick draws itself in when checked.</p>
        <div className="mt-5 space-y-4">
          {TASKS.map((t) => (
            <label className="flex cursor-pointer items-center gap-3 text-sm" key={t.label}>
              <Checkbox
                className="flex size-5 shrink-0 items-center justify-center rounded-[5px] border border-input bg-background transition-colors data-checked:border-primary data-checked:bg-primary"
                defaultChecked={t.done}
              >
                <CheckboxIndicator className="size-3.5 text-primary-foreground" />
              </Checkbox>
              <span>{t.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
