"use client";

import Blob from "@/registry/ui-layouts/r3f-blob.txt";

export default function Demo() {
  return (
    <div className="relative h-[560px] w-full overflow-hidden [&>div]:!h-full [&>div]:!w-full">
      <Blob />
    </div>
  );
}
