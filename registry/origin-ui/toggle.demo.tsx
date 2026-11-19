import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Strikethrough, Underline } from "lucide-react";

import { Toggle } from "@/registry/origin-ui/toggle";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-8">
      <div className="w-full max-w-lg rounded-xl border border-border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-wrap items-center gap-1 border-border border-b p-2">
          <Toggle aria-label="Bold" defaultPressed size="sm">
            <Bold />
          </Toggle>
          <Toggle aria-label="Italic" size="sm">
            <Italic />
          </Toggle>
          <Toggle aria-label="Underline" defaultPressed size="sm">
            <Underline />
          </Toggle>
          <Toggle aria-label="Strikethrough" size="sm">
            <Strikethrough />
          </Toggle>
          <span className="mx-1 h-5 w-px bg-border" />
          <Toggle aria-label="Align left" defaultPressed size="sm" variant="outline">
            <AlignLeft />
          </Toggle>
          <Toggle aria-label="Align center" size="sm" variant="outline">
            <AlignCenter />
          </Toggle>
          <Toggle aria-label="Align right" size="sm" variant="outline">
            <AlignRight />
          </Toggle>
        </div>
        <div className="space-y-3 p-6 text-sm leading-relaxed">
          <p className="font-bold underline">Release notes, v2.4</p>
          <p className="text-muted-foreground">
            Toggles hold a pressed state. Use them for formatting controls, view options and anything that is
            simply on or off.
          </p>
        </div>
      </div>
    </div>
  );
}
