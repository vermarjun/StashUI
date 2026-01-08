"use client";

import { BgSilk } from "@/registry/inspira-react/bg-silk";

export default function BgSilkDemo() {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
      <BgSilk hue={300} saturation={0.5} brightness={1} speed={1} />
      <div className="relative z-10 flex h-full items-center justify-center">
        <p className="text-2xl font-semibold text-white drop-shadow">Silk Background</p>
      </div>
    </div>
  );
}
