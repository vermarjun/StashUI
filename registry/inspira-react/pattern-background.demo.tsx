"use client";

import {
  PatternBackground,
  PATTERN_BACKGROUND_VARIANT,
  PATTERN_BACKGROUND_DIRECTION,
} from "@/registry/inspira-react/pattern-background";

export default function PatternBackgroundDemo() {
  return (
    <div className="flex flex-col gap-6 p-8">
      {/* Static grid */}
      <PatternBackground
        variant={PATTERN_BACKGROUND_VARIANT.Grid}
        size="md"
        mask="ellipse"
        className="flex h-48 w-full items-center justify-center rounded-xl border"
      >
        <p className="text-lg font-semibold">Grid – static</p>
      </PatternBackground>

      {/* Animated dots */}
      <PatternBackground
        variant={PATTERN_BACKGROUND_VARIANT.Dot}
        size="lg"
        animate
        direction={PATTERN_BACKGROUND_DIRECTION.Bottom}
        speed={8000}
        className="flex h-48 w-full items-center justify-center rounded-xl border"
      >
        <p className="text-lg font-semibold">Dots – animated downward</p>
      </PatternBackground>

      {/* Big dots with top-right animation */}
      <PatternBackground
        variant={PATTERN_BACKGROUND_VARIANT.BigDot}
        size="xl"
        animate
        direction={PATTERN_BACKGROUND_DIRECTION.TopRight}
        speed={6000}
        mask="ellipse-top"
        className="flex h-48 w-full items-center justify-center rounded-xl border"
      >
        <p className="text-lg font-semibold">Big Dots – diagonal</p>
      </PatternBackground>
    </div>
  );
}
