"use client";
import { useRef } from "react";
import { useScroll, useTransform } from "motion/react";
import { GoogleGeminiEffect } from "@/registry/aceternity-ui/google-gemini-effect";

export default function Demo() {
  const ref = useRef<HTMLDivElement>(null);
  // the demo owns its scroller: the preview wrapper is overflow:auto, which
  // would otherwise stop the sticky title + SVG from pinning
  const scroller = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: scroller,
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <div ref={scroller} className="h-screen w-full overflow-y-auto bg-black [scrollbar-width:none]">
    <div
      ref={ref}
      className="relative h-[300vh] w-full overflow-clip bg-black pt-24"
    >
      <GoogleGeminiEffect
        className="top-24"
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
        title="Build with Aceternity UI"
        description="Scroll down and watch the five paths draw themselves in and meet in the middle."
      />
    </div>
    </div>
  );
}
