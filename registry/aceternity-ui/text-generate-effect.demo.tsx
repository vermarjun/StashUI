"use client";
import { TextGenerateEffect } from "@/registry/aceternity-ui/text-generate-effect";

export default function Demo() {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-10">
      <TextGenerateEffect
        words="Build beautiful animated interfaces with ease using Aceternity UI components."
        className="text-center"
      />
    </div>
  );
}
