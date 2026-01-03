"use client";
import { useMotionValue } from "motion/react";
import { GoogleGeminiEffect } from "@/registry/aceternity-ui/google-gemini-effect";

export default function Demo() {
  const pathLength1 = useMotionValue(0.5);
  const pathLength2 = useMotionValue(0.5);
  const pathLength3 = useMotionValue(0.5);
  const pathLength4 = useMotionValue(0.5);
  const pathLength5 = useMotionValue(0.5);

  return (
    <div className="relative w-full h-[600px] bg-black overflow-hidden flex items-start justify-center">
      <GoogleGeminiEffect
        pathLengths={[pathLength1, pathLength2, pathLength3, pathLength4, pathLength5]}
        title="Build with Aceternity UI"
        description="Beautiful components built with Tailwind CSS and Framer Motion."
      />
    </div>
  );
}
