"use client";
import React from "react";
import { AuroraBackground } from "@/registry/inspira-react/aurora-background";

export default function AuroraBackgroundDemo() {
  return (
    <AuroraBackground>
      <div className="relative flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-3xl font-bold text-slate-800 dark:text-white md:text-5xl">
          Hello from Aurora
        </p>
        <p className="text-base text-slate-600 dark:text-neutral-200">
          A beautiful aurora background effect, perfect for landing pages and
          hero sections.
        </p>
        <button className="rounded-full bg-black px-6 py-2 text-white transition hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80">
          Get Started
        </button>
      </div>
    </AuroraBackground>
  );
}
