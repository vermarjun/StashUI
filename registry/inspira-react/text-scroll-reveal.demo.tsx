"use client";
import React from "react";
import { TextScrollReveal } from "@/registry/inspira-react/text-scroll-reveal";

export default function TextScrollRevealDemo() {
  return (
    <div className="bg-white dark:bg-neutral-950">
      <div className="flex h-screen items-center justify-center">
        <p className="text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
          Scroll down to see the effect
        </p>
      </div>
      <TextScrollReveal text="This text reveals itself as you scroll down the page, word by word, creating a beautiful reading experience for your visitors." />
    </div>
  );
}
