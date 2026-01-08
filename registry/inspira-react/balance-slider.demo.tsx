"use client";
import React from "react";
import { BalanceSlider } from "@/registry/inspira-react/balance-slider";

export default function BalanceSliderDemo() {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-8 bg-neutral-900 p-8">
      <h2 className="text-lg font-semibold text-white">Balance Slider</h2>
      <div className="rounded-xl bg-neutral-800 p-6">
        <BalanceSlider
          leftContent="LEFT"
          rightContent="RIGHT"
          leftColor="#e68a00"
          rightColor="#ffffff"
        />
      </div>
      <div className="rounded-xl bg-neutral-800 p-6">
        <BalanceSlider
          leftContent="WARM"
          rightContent="COOL"
          leftColor="#ff4444"
          rightColor="#4444ff"
          initialValue={30}
        />
      </div>
    </div>
  );
}
