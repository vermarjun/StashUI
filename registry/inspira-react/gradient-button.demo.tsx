"use client";

import { GradientButton } from "@/registry/inspira-react/gradient-button";

export default function GradientButtonDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-12 bg-black min-h-[200px]">
      <GradientButton>
        <span className="text-white font-semibold">Click me</span>
      </GradientButton>
      <GradientButton
        colors={["#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4"]}
        duration={1500}
        borderRadius={24}
        bgColor="#0f172a"
      >
        <span className="text-white font-semibold">Custom Colors</span>
      </GradientButton>
    </div>
  );
}
