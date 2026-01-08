"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollWordProps {
  word: string;
  progress: number;
  range: [number, number];
}

function ScrollWord({ word, progress, range }: ScrollWordProps) {
  const [start, end] = range;
  let opacity = 0;
  if (progress >= end) {
    opacity = 1;
  } else if (progress > start) {
    opacity = (progress - start) / (end - start);
  }

  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
      <span className="absolute opacity-30 dark:opacity-70">{word}</span>
      <span style={{ opacity }} className="text-black dark:text-white">
        {word}
      </span>
    </span>
  );
}

interface TextScrollRevealProps {
  text: string;
  className?: string;
}

export function TextScrollReveal({ text, className }: TextScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollYProgress, setScrollYProgress] = useState(0);

  const words = useMemo(() => text.split(" "), [text]);

  useEffect(() => {
    function updateScrollYProgress() {
      if (containerRef.current) {
        const boundingRect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        setScrollYProgress((boundingRect.y / windowHeight) * -1);
      }
    }

    window.addEventListener("scroll", updateScrollYProgress);
    window.addEventListener("resize", updateScrollYProgress);
    updateScrollYProgress();

    return () => {
      window.removeEventListener("scroll", updateScrollYProgress);
      window.removeEventListener("resize", updateScrollYProgress);
    };
  }, []);

  return (
    <div ref={containerRef} className={cn("relative z-0 h-[200vh]", className)}>
      <div className="sticky top-0 mx-auto flex h-1/2 max-w-4xl items-center bg-transparent px-4 py-20">
        <p className="flex flex-wrap p-5 text-2xl font-bold text-black/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl dark:text-white/20">
          {words.map((word, i) => (
            <ScrollWord
              key={i}
              word={word}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
            />
          ))}
        </p>
      </div>
    </div>
  );
}
