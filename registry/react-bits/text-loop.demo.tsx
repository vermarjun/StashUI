"use client";

import TextLoop from "./text-loop";

export default function TextLoopDemo() {
  return (
    <div className="relative flex h-[560px] w-full items-center justify-center overflow-hidden bg-background">
      <TextLoop text="Design systems ✦ Motion ✦ Interfaces" shape="wave" ribbon ribbonColor="#5227FF" color="#ffffff" cross />
    </div>
  );
}
