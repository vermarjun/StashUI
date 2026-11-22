"use client";

import { Copy, Heart, Plus, Share2 } from "lucide-react";
import * as React from "react";

import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialContent,
  SpeedDialItem,
  SpeedDialLabel,
  SpeedDialTrigger,
} from "./speed-dial";

export default function SpeedDialDemo() {
  const [last, setLast] = React.useState<string | null>(null);

  return (
    <div className="flex h-[360px] w-full max-w-md flex-col items-center justify-end gap-6">
      <p className="h-5 text-sm text-muted-foreground">
        {last ? `${last} ✓` : "Open the menu to see quick actions"}
      </p>
      <SpeedDial>
        <SpeedDialTrigger className="transition-transform duration-200 ease-out data-[state=closed]:rotate-0 data-[state=open]:rotate-135">
          <Plus />
        </SpeedDialTrigger>
        <SpeedDialContent>
          <SpeedDialItem>
            <SpeedDialLabel>Share</SpeedDialLabel>
            <SpeedDialAction onSelect={() => setLast("Link shared")}>
              <Share2 />
            </SpeedDialAction>
          </SpeedDialItem>
          <SpeedDialItem>
            <SpeedDialLabel>Copy</SpeedDialLabel>
            <SpeedDialAction onSelect={() => setLast("Copied to clipboard")}>
              <Copy />
            </SpeedDialAction>
          </SpeedDialItem>
          <SpeedDialItem>
            <SpeedDialLabel>Like</SpeedDialLabel>
            <SpeedDialAction onSelect={() => setLast("Added to favourites")}>
              <Heart />
            </SpeedDialAction>
          </SpeedDialItem>
        </SpeedDialContent>
      </SpeedDial>
    </div>
  );
}
