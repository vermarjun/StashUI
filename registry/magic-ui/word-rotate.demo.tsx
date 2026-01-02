"use client";
import { WordRotate } from "@/registry/magic-ui/word-rotate";

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full max-w-md p-8">
      <WordRotate
        className="text-4xl font-bold text-black dark:text-white"
        words={["Innovative", "Scalable", "Reliable", "Fast", "Beautiful"]}
      />
    </div>
  );
}
