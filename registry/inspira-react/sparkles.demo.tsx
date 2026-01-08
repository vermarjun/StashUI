"use client";

import React from "react";
import { Sparkles } from "@/registry/inspira-react/sparkles";

export default function SparklesDemo() {
  return (
    <div className="h-64 w-full rounded-xl overflow-hidden">
      <Sparkles
        background="#0d47a1"
        particleColor="#ffffff"
        particleDensity={100}
        speed={3}
        minSize={1}
        maxSize={3}
      />
    </div>
  );
}
