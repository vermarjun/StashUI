"use client";

import { RippleButton } from "@/registry/inspira-react/ripple-button";

export default function RippleButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-12">
      <RippleButton>Click me</RippleButton>

      <RippleButton rippleColor="#6366f1" className="border-indigo-400 text-indigo-700">
        Indigo ripple
      </RippleButton>

      <RippleButton rippleColor="#f43f5e" duration={800} className="border-rose-400 text-rose-700">
        Rose ripple (slow)
      </RippleButton>

      <RippleButton rippleColor="#10b981" duration={300} className="border-emerald-400 text-emerald-700">
        Emerald (fast)
      </RippleButton>

      <RippleButton disabled className="opacity-50">
        Disabled
      </RippleButton>
    </div>
  );
}
