"use client";
import { ScratchToReveal } from "@/registry/inspira-react/scratch-to-reveal";

export default function ScratchToRevealDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <ScratchToReveal
        width={300}
        height={200}
        gradientColors={["#A97CF8", "#F38CB8", "#FDCC92"]}
        onComplete={() => console.log("Scratch complete!")}
      >
        <div className="flex h-full w-full items-center justify-center rounded-lg bg-green-100">
          <p className="text-2xl font-bold text-green-600">You win! 🎉</p>
        </div>
      </ScratchToReveal>
    </div>
  );
}
