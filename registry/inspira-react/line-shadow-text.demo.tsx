"use client";

import { LineShadowText } from "@/registry/inspira-react/line-shadow-text";

export default function LineShadowTextDemo() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-5xl font-bold">
        <LineShadowText shadowColor="black" className="italic">
          Shadow Text
        </LineShadowText>
      </h1>

      <h2 className="text-4xl font-bold text-white">
        <LineShadowText shadowColor="#3b82f6">
          Blue Shadow
        </LineShadowText>
      </h2>
    </div>
  );
}
