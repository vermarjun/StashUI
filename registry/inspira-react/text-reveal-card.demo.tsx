"use client";

import { TextRevealCard } from "@/registry/inspira-react/text-reveal-card";

export default function TextRevealCardDemo() {
  return (
    <div className="flex min-h-[400px] items-center justify-center bg-[#0d0d0d] p-8">
      <TextRevealCard
        starsCount={130}
        header={
          <div className="mb-4">
            <p className="text-sm font-medium text-white/60">Hover to reveal</p>
            <h3 className="text-xl font-semibold text-white">
              What lies beneath?
            </h3>
          </div>
        }
        text={
          <p className="text-2xl font-bold text-white">
            The secret is revealed!
          </p>
        }
        revealText={
          <p className="text-2xl font-bold text-white/20">
            Hover to see the magic
          </p>
        }
      />
    </div>
  );
}
