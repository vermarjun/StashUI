"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/registry/origin-ui/hover-card";

export default function Demo() {
  return (
    <HoverCard openDelay={0} closeDelay={100}>
      <HoverCardTrigger asChild>
        <button className="rounded-md border border-border bg-background px-4 py-2 text-sm text-foreground hover:bg-muted">
          Hover me
        </button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="space-y-1">
          <p className="font-medium text-sm">Hover Card</p>
          <p className="text-muted-foreground text-xs leading-relaxed">
            This hover card appears when you hover the trigger. It supports rich
            content and smooth animations.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
