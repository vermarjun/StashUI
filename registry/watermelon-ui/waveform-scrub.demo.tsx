"use client";

import { WaveformScrub } from "@/registry/watermelon-ui/waveform-scrub";

export default function WaveformScrubDemo() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full max-w-[480px]">
        <WaveformScrub duration={24} fileName="Standup notes – Tue.m4a" />
      </div>
    </div>
  );
}
