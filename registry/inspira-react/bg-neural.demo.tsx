"use client";

import { BgNeural } from "@/registry/inspira-react/bg-neural";

export default function BgNeuralDemo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-xl bg-black">
      <BgNeural hue={200} saturation={0.8} chroma={0.6} />
      <div className="relative z-10 flex h-full items-center justify-center">
        <p className="text-2xl font-semibold text-white">Neural Background</p>
      </div>
    </div>
  );
}
