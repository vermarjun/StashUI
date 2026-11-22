"use client";

import FolderFloat from "./folder-float";

export default function FolderFloatDemo() {
  return (
    <div className="flex min-h-[520px] w-full items-center justify-center bg-background p-8 pt-40">
      <FolderFloat
        label="Design feedback"
        sublabel="4 notes from review"
        items={["Try a warmer palette", "Tighten the spacing", "Logo feels small", "Love the new hero"]}
        trigger="hover"
      />
    </div>
  );
}
