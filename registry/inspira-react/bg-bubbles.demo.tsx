"use client";
import React from "react";
import { BubblesBg } from "@/registry/inspira-react/bg-bubbles";

export default function BubblesBgDemo() {
  return (
    <div className="w-full">
      <BubblesBg blur={2}>
        <div className="flex h-full items-center justify-center py-12">
          <div className="text-center">
            <p className="text-2xl font-bold text-white drop-shadow">
              Bubbles Background
            </p>
            <p className="mt-2 text-sm text-white/80">
              A three.js animated gradient bubble scene
            </p>
          </div>
        </div>
      </BubblesBg>
    </div>
  );
}
