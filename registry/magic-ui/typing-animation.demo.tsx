"use client";

import { TypingAnimation } from "@/registry/magic-ui/typing-animation";

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full p-8">
      <TypingAnimation
        as="h2"
        className="text-4xl font-bold text-foreground"
        words={["Build faster.", "Ship smarter.", "Design better."]}
        loop
        duration={80}
        pauseDelay={1200}
      />
    </div>
  );
}
