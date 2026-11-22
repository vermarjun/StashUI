"use client";

import { GooDropdown } from "./gooey-dropdown";

export default function GooeyDropdownDemo() {
  return (
    <div className="flex min-h-[420px] w-full items-start justify-center pt-24">
      <GooDropdown
        trigger="Share"
        width={260}
        items={[
          { label: "Copy link" },
          { label: "Send by email" },
          { label: "Embed on site" },
          { label: "Download PDF" },
        ]}
      />
    </div>
  );
}
