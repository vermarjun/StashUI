"use client";

import WarpText from "@/registry/react-bits/warp-text";

export default function Demo() {
  return (
    <div className="relative flex h-[520px] w-full items-center bg-background text-foreground">
      <WarpText text="Bend the moment" fontSize="7rem" fontWeight={800} className="h-full" />
    </div>
  );
}
