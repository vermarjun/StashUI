"use client";
import { Tooltip } from "@/registry/aceternity-ui/tooltip-card";

const cardContent = (
  <div className="flex flex-col gap-1">
    <p className="font-semibold text-foreground">Quick tip</p>
    <p className="text-muted-foreground">
      This tooltip follows your cursor and smartly repositions itself to stay
      within the viewport.
    </p>
  </div>
);

export default function Demo() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-8 p-12">
      <p className="text-sm text-muted-foreground">Hover the buttons to reveal tooltips</p>
      <div className="flex flex-wrap items-center justify-center gap-6">
        <Tooltip content={cardContent}>
          <button className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted">
            Hover me
          </button>
        </Tooltip>
        <Tooltip
          content="A simple string tooltip — minimal and clean."
        >
          <button className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted">
            Or hover me
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
