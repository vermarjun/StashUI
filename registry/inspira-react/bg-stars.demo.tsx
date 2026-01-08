"use client";

import { BgStars } from "@/registry/inspira-react/bg-stars";

export default function BgStarsDemo() {
  return (
    <div className="h-[400px] w-full overflow-hidden rounded-xl">
      <BgStars starColor="#ffffff" speed={50} factor={0.05}>
        <div className="relative z-10 flex h-full items-center justify-center">
          <p className="text-2xl font-semibold text-white drop-shadow">Stars Background</p>
        </div>
      </BgStars>
    </div>
  );
}
