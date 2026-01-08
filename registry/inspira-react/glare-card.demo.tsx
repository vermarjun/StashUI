"use client";

import { GlareCard } from "@/registry/inspira-react/glare-card";

export default function GlareCardDemo() {
  return (
    <div className="flex items-center justify-center p-12 bg-neutral-950 min-h-[500px]">
      <GlareCard>
        <div className="flex flex-col items-center justify-center h-full gap-4 p-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
          <h3 className="text-white text-xl font-bold">Glare Card</h3>
          <p className="text-neutral-400 text-sm text-center">
            Move your cursor over the card to see the holographic glare effect.
          </p>
        </div>
      </GlareCard>
    </div>
  );
}
