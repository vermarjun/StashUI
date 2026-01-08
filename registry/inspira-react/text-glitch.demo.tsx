"use client";

import { TextGlitch } from "@/registry/inspira-react/text-glitch";

export default function TextGlitchDemo() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-12 bg-[#060606] p-8">
      <TextGlitch text="GLITCH" speed={0.5} enableShadows enableOnHover={false} />
      <TextGlitch
        text="HOVER ME"
        speed={0.4}
        enableShadows
        enableOnHover
        className="text-4xl"
      />
    </div>
  );
}
