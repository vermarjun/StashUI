"use client";

import { FlipWords } from "@/registry/aceternity-ui/flip-words";

export default function Demo() {
  const words = ["beautiful", "modern", "powerful", "elegant", "stunning"];

  return (
    <div className="w-full max-w-2xl mx-auto flex items-center justify-center py-16">
      <div className="text-4xl font-normal text-neutral-600 dark:text-neutral-400">
        Build <FlipWords words={words} className="text-black dark:text-white font-bold" />
        interfaces
      </div>
    </div>
  );
}
