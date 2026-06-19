"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/origin-ui/popover";

export default function Demo() {
  return (
    <div className="flex min-h-[400px] items-center justify-center p-8">
      <Popover>
        <PopoverTrigger asChild>
          <button className="rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
            Open Popover
          </button>
        </PopoverTrigger>
        <PopoverContent showArrow>
          <div className="space-y-2">
            <p className="font-semibold text-sm">Quick settings</p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Adjust your preferences here. Changes are saved automatically and
              take effect immediately.
            </p>
            <button className="mt-1 w-full rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:opacity-90 transition-opacity">
              Save changes
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
