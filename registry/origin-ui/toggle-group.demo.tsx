"use client";

import { ToggleGroup, ToggleGroupItem } from "@/registry/origin-ui/toggle-group";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-[200px] p-8">
      <ToggleGroup type="multiple" variant="outline" aria-label="Text formatting">
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

      <ToggleGroup type="single" defaultValue="center" aria-label="Text alignment">
        <ToggleGroupItem value="left" aria-label="Left align">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Center align">
          Center
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Right align">
          Right
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
