"use client";
import React from "react";
import { BlackHoleBackground } from "@/registry/inspira-react/bg-black-hole";

export default function BlackHoleBackgroundDemo() {
  return (
    <div className="relative h-96 w-full bg-white dark:bg-black">
      <BlackHoleBackground
        strokeColor="#737373"
        numberOfLines={50}
        numberOfDiscs={50}
        particleRGBColor={[255, 255, 255]}
      >
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <p className="text-2xl font-bold text-neutral-800 dark:text-white">
            Black Hole
          </p>
        </div>
      </BlackHoleBackground>
    </div>
  );
}
