"use client"

import SplashCursor from "@/registry/react-bits/SplashCursor";

export default function Demo() {
  return (
    <div className="relative h-[560px] w-full bg-black flex items-center justify-center">
      <p className="text-white/30 text-lg font-medium select-none z-10 pointer-events-none">
        Move or drag your cursor anywhere
      </p>
      <SplashCursor TRANSPARENT={false} BACK_COLOR={{ r: 0, g: 0, b: 0 }} RAINBOW_MODE />
    </div>
  );
}
