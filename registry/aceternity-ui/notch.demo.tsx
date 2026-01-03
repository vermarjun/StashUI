"use client";
import { Notch } from "@/registry/aceternity-ui/notch";

export default function Demo() {
  return (
    <div className="relative w-full max-w-2xl h-64 bg-neutral-900 rounded-xl overflow-hidden">
      <div className="flex items-center justify-center h-full text-neutral-400 text-sm">
        Settings bar appears at the bottom
      </div>
      <Notch
        position="bottom"
        align="center"
        items={[
          {
            id: "theme",
            label: "Theme",
            options: [
              { id: "light", label: "Light" },
              { id: "dark", label: "Dark" },
              { id: "system", label: "System" },
            ],
            defaultValue: "dark",
          },
          {
            id: "language",
            label: "Language",
            options: [
              { id: "en", label: "English" },
              { id: "es", label: "Spanish" },
              { id: "fr", label: "French" },
            ],
            defaultValue: "en",
          },
        ]}
      />
    </div>
  );
}
