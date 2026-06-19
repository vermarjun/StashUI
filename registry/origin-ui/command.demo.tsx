"use client";

import { useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/registry/origin-ui/command";

const commands = [
  { group: "Suggestions", items: [
    { label: "Calendar", shortcut: "⌘C" },
    { label: "Search Emoji", shortcut: "⌘E" },
    { label: "Calculator", shortcut: "⌘K" },
  ]},
  { group: "Settings", items: [
    { label: "Profile", shortcut: "⌘P" },
    { label: "Billing", shortcut: "⌘B" },
    { label: "Appearance", shortcut: "⌘A" },
  ]},
];

export default function Demo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-[400px] items-center justify-center p-8">
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 rounded-md border border-border px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted transition-colors"
      >
        <span>Search commands…</span>
        <kbd className="pointer-events-none inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {commands.map((section) => (
            <CommandGroup key={section.group} heading={section.group}>
              {section.items.map((item) => (
                <CommandItem key={item.label} onSelect={() => setOpen(false)}>
                  {item.label}
                  <CommandShortcut>{item.shortcut}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </div>
  );
}
