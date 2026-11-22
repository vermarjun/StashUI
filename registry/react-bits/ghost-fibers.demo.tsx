"use client";

import GhostFibers from "@/registry/react-bits/ghost-fibers";

export default function Demo() {
  return (
    <div className="relative h-[620px] w-full overflow-hidden bg-black">
      <GhostFibers />
    </div>
  );
}
