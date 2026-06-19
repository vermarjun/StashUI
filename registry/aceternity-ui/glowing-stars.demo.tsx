"use client";

import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "@/registry/aceternity-ui/glowing-stars";

export default function Demo() {
  return (
    <div className="flex items-center justify-center p-8">
      <GlowingStarsBackgroundCard>
        <GlowingStarsTitle>Component Library</GlowingStarsTitle>
        <GlowingStarsDescription>
          Beautiful, accessible components built with Radix UI and Tailwind CSS.
          Hover to see the stars glow.
        </GlowingStarsDescription>
      </GlowingStarsBackgroundCard>
    </div>
  );
}
