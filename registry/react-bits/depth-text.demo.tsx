"use client";

import DepthText from "@/registry/react-bits/depth-text";

export default function Demo() {
  return (
    <div className="flex min-h-[520px] w-full items-center justify-center overflow-hidden bg-background px-6 text-foreground">
      <DepthText text="Elevate" fontSize="9rem" fontWeight={900} />
    </div>
  );
}
