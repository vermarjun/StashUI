"use client";

import { TypewriterEffect } from "@/registry/aceternity-ui/typewriter-effect";

export default function Demo() {
  const words = [
    { text: "Build" },
    { text: "awesome" },
    { text: "apps" },
    { text: "with" },
    {
      text: "Aceternity.",
      className: "text-blue-500 dark:text-blue-400",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto py-16">
      <p className="text-neutral-600 dark:text-neutral-200 text-base mb-4">
        The road to freedom starts from here
      </p>
      <TypewriterEffect words={words} />
    </div>
  );
}
