"use client";

import {
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@/registry/animate-ui/primitives-headless-popover";

export default function Demo() {
  return (
    <div className="flex min-h-[400px] items-center justify-center p-8">
      <Popover className="relative">
        <PopoverButton className="rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors focus:outline-none">
          Open Popover
        </PopoverButton>
        <PopoverPanel className="absolute left-1/2 mt-2 w-64 -translate-x-1/2 rounded-lg border border-border bg-popover p-4 shadow-lg">
          <p className="font-semibold text-sm text-foreground">Quick settings</p>
          <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
            Adjust preferences from here. Changes save automatically and take
            effect immediately across all your devices.
          </p>
          <button className="mt-3 w-full rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:opacity-90 transition-opacity">
            Save changes
          </button>
        </PopoverPanel>
      </Popover>
    </div>
  );
}
