"use client";
import { GlareCard } from "@/registry/aceternity-ui/glare-card";

export default function Demo() {
  return (
    <div className="flex items-center justify-center min-h-[480px]">
      <GlareCard className="flex flex-col items-start justify-end py-8 px-6">
        <p className="font-bold text-white text-lg">The greatest trick</p>
        <p className="font-normal text-base text-neutral-200 mt-4">
          The greatest trick the devil ever pulled was convincing the world he
          didn&apos;t exist.
        </p>
      </GlareCard>
    </div>
  );
}
