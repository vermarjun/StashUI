"use client";
import TrueFocus from "@/registry/react-bits/TrueFocus";

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full min-h-[320px] bg-background p-8">
      <TrueFocus
        sentence="Design With True Focus"
        blurAmount={4}
        borderColor="hsl(var(--foreground))"
        glowColor="hsl(var(--foreground) / 0.4)"
        animationDuration={0.5}
        pauseBetweenAnimations={1}
      />
    </div>
  );
}
