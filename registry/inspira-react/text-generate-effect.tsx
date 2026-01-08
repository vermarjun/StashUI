"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface TextGenerateEffectProps {
  words: string;
  filter?: boolean;
  duration?: number;
  delay?: number;
  className?: string;
}

export function TextGenerateEffect({
  words,
  filter = true,
  duration = 0.7,
  delay = 0,
  className,
}: TextGenerateEffectProps) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (!scopeRef.current) return;
    const spans = scopeRef.current.querySelectorAll<HTMLSpanElement>("span");

    const timer = setTimeout(() => {
      spans.forEach((span, index) => {
        setTimeout(() => {
          span.style.opacity = "1";
          span.style.filter = filter ? "blur(0px)" : "none";
        }, index * 200);
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [words, filter, delay, duration]);

  return (
    <div className={cn("leading-snug tracking-wide", className)}>
      <div ref={scopeRef}>
        {wordsArray.map((word, idx) => (
          <span
            key={word + idx}
            className="inline-block"
            style={{
              opacity: 0,
              filter: filter ? "blur(10px)" : "none",
              transition: `opacity ${duration}s, filter ${duration}s`,
            }}
          >
            {word}&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}
