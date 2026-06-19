"use client";
import React from "react";
import { FallingStarsBg } from "@/registry/inspira-react/bg-falling-stars";

export default function FallingStarsBgDemo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-xl bg-black">
      <FallingStarsBg color="#ffffff" count={200} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-3xl font-bold text-white">Falling Stars</p>
          <p className="mt-2 text-sm text-white/60">
            Canvas-based 3D star field effect
          </p>
        </div>
      </div>
    </div>
  );
}
