"use client";

import { BoldIcon, ItalicIcon, LinkIcon, UnderlineIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/origin-ui/tooltip";

const tools = [
  { label: "Bold", shortcut: "⌘B", icon: BoldIcon },
  { label: "Italic", shortcut: "⌘I", icon: ItalicIcon },
  { label: "Underline", shortcut: "⌘U", icon: UnderlineIcon },
  { label: "Insert link", shortcut: "⌘K", icon: LinkIcon },
];

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center">
      <TooltipProvider delayDuration={0}>
        <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1 shadow-sm">
          {tools.map(({ label, shortcut, icon: Icon }) => (
            <Tooltip key={label}>
              <TooltipTrigger asChild>
                <Button aria-label={label} size="icon" variant="ghost">
                  <Icon aria-hidden="true" size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="px-2 py-1 text-xs">
                {label}{" "}
                <kbd className="ms-1 text-muted-foreground">{shortcut}</kbd>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
}
