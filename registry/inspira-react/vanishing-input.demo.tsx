"use client";
import React, { useState } from "react";
import { VanishingInput } from "@/registry/inspira-react/vanishing-input";

export default function VanishingInputDemo() {
  const [submitted, setSubmitted] = useState<string[]>([]);

  return (
    <div className="flex min-h-[340px] flex-col items-center justify-center gap-8 bg-white p-8 dark:bg-zinc-900">
      <div className="w-full max-w-xl">
        <h2 className="mb-6 text-center text-2xl font-bold text-neutral-800 dark:text-neutral-200">
          Vanishing Input
        </h2>
        <VanishingInput
          placeholders={[
            "Search for anything...",
            "What are you looking for?",
            "Type something and press Enter",
            "Ask me anything...",
          ]}
          onSubmit={(val) => setSubmitted((prev) => [val, ...prev])}
        />
      </div>
      {submitted.length > 0 && (
        <div className="w-full max-w-xl space-y-2">
          <p className="text-sm font-medium text-neutral-500">Submitted:</p>
          {submitted.map((item, i) => (
            <div
              key={i}
              className="rounded-lg bg-neutral-100 px-4 py-2 text-sm text-neutral-700 dark:bg-zinc-800 dark:text-neutral-300"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
