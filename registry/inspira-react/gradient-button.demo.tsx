"use client";

import { GradientButton } from "@/registry/inspira-react/gradient-button";

export default function GradientButtonDemo() {
  return (
    <div className="flex min-h-[360px] w-full flex-wrap items-center justify-center gap-x-24 gap-y-12 p-12">
      <GradientButton borderWidth={3} blur={6} className="scale-125">
        <span className="px-4 py-1 text-lg font-semibold text-white">Get early access</span>
      </GradientButton>
      <GradientButton
        colors={["#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4"]}
        duration={1800}
        borderWidth={3}
        borderRadius={999}
        blur={6}
        bgColor="#0b1020"
        className="scale-125"
      >
        <span className="px-4 py-1 text-lg font-semibold text-white">Explore templates</span>
      </GradientButton>
    </div>
  );
}
