"use client";

import { RadiantText } from "@/registry/inspira-react/radiant-text";

export default function RadiantTextDemo() {
  return (
    <div className="flex flex-col items-center gap-8 p-12">
      <RadiantText duration={8} radiantWidth={120} className="text-2xl font-bold">
        The quick brown fox jumps over the lazy dog
      </RadiantText>

      <RadiantText duration={12} radiantWidth={200} className="text-xl font-medium">
        Shine a light on what matters most in your product.
      </RadiantText>

      <RadiantText duration={6} radiantWidth={80} className="text-base">
        Fast radiant sweep — speed things up.
      </RadiantText>
    </div>
  );
}
