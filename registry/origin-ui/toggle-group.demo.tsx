"use client";

import { useState } from "react";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/registry/origin-ui/toggle-group";

export default function Demo() {
  const [marks, setMarks] = useState<string[]>(["bold"]);
  const [align, setAlign] = useState("left");

  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-8">
      <div className="w-full max-w-xl rounded-xl border border-border bg-card text-card-foreground shadow-sm">
        <div className="flex items-center gap-3 border-b border-border p-2">
          <ToggleGroup
            type="multiple"
            variant="outline"
            value={marks}
            onValueChange={setMarks}
            aria-label="Text formatting"
          >
            <ToggleGroupItem value="bold" aria-label="Bold">
              <BoldIcon className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
              <ItalicIcon className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">
              <UnderlineIcon className="size-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          <span className="h-6 w-px bg-border" />
          <ToggleGroup
            type="single"
            variant="outline"
            value={align}
            onValueChange={(v) => v && setAlign(v)}
            aria-label="Text alignment"
          >
            <ToggleGroupItem value="left" aria-label="Left align">
              <AlignLeftIcon className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Center align">
              <AlignCenterIcon className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Right align">
              <AlignRightIcon className="size-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div
          className={cn(
            "space-y-3 p-6 leading-relaxed transition-all",
            align === "center" && "text-center",
            align === "right" && "text-right",
          )}
        >
          <p
            className={cn(
              "text-lg text-foreground",
              marks.includes("bold") && "font-bold",
              marks.includes("italic") && "italic",
              marks.includes("underline") && "underline underline-offset-4",
            )}
          >
            Release notes, v2.4
          </p>
          <p className="text-sm text-muted-foreground">
            Offline drafts now sync the moment you reconnect, and conflicts are merged line by line instead of
            asking you to pick a version.
          </p>
        </div>
      </div>
    </div>
  );
}
