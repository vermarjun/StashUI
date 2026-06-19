"use client";

import { BgThunderstorm } from "@/registry/inspira-react/bg-thunderstorm";

export default function BgThunderstormDemo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-xl bg-black">
      <BgThunderstorm hue={0} saturation={1} brightness={1} speed={1} />
      <div className="relative z-10 flex h-full items-center justify-center">
        <p className="text-2xl font-semibold text-white drop-shadow">Thunderstorm</p>
      </div>
    </div>
  );
}
