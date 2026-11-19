"use client";
import { Languages, Monitor, Moon, Sun, Type } from "lucide-react";

import { Notch } from "@/registry/aceternity-ui/notch";

export default function Demo() {
  return (
    // The notch is `position: fixed` to the viewport. `transform` on this frame
    // makes it the containing block, so the notch pins to the frame instead.
    <div className="relative h-[560px] w-full overflow-hidden bg-neutral-950 [transform:translateZ(0)]">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-8 pt-16">
        <p className="font-medium text-neutral-500 text-xs uppercase tracking-[0.2em]">Field notes · Issue 14</p>
        <h1 className="font-semibold text-4xl text-neutral-100 tracking-tight">
          Designing calm interfaces for people who read on the train
        </h1>
        <p className="text-neutral-400 leading-relaxed">
          Reading apps fight for attention with everything else on the phone. The best ones get out of the
          way: generous type, a theme that follows the light, and settings that sit one tap away instead of
          three menus deep. This issue looks at how small controls can carry a lot of weight.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-lg border border-white/5 bg-gradient-to-br from-neutral-900 to-neutral-800" />
          ))}
        </div>
      </div>
      <Notch
        position="bottom"
        align="center"
        offset={28}
        showSelectedValue
        showDividers
        accentColor="#6366f1"
        items={[
          {
            id: "theme",
            label: "Theme",
            icon: <Moon className="size-3.5" />,
            options: [
              { id: "light", label: "Light", icon: <Sun className="size-3.5" /> },
              { id: "dark", label: "Dark", icon: <Moon className="size-3.5" /> },
              { id: "system", label: "System", icon: <Monitor className="size-3.5" /> },
            ],
            defaultValue: "dark",
          },
          {
            id: "size",
            label: "Text",
            icon: <Type className="size-3.5" />,
            options: [
              { id: "s", label: "Small" },
              { id: "m", label: "Medium" },
              { id: "l", label: "Large" },
            ],
            defaultValue: "m",
          },
          {
            id: "language",
            label: "Language",
            icon: <Languages className="size-3.5" />,
            options: [
              { id: "en", label: "English" },
              { id: "es", label: "Español" },
              { id: "fr", label: "Français" },
            ],
            defaultValue: "en",
          },
        ]}
      />
    </div>
  );
}
