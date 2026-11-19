"use client";

import Ballpit from "@/registry/react-bits/Ballpit";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <Ballpit
        colors={[0xffffff, 0x9ca3af, 0x3f3f46]}
        count={140}
        followCursor
        friction={0.9975}
        gravity={0.5}
        wallBounce={0.95}
      />
      <div className="pointer-events-none absolute inset-x-0 top-16 flex flex-col items-center gap-2 text-center">
        <h3 className="font-semibold text-4xl text-foreground tracking-tight">Ballpit</h3>
        <p className="text-muted-foreground text-sm">Move your cursor to push the spheres around.</p>
      </div>
    </div>
  );
}
