"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface TextHighlightProps {
  delay?: number;
  duration?: number;
  className?: string;
  textEndColor?: string;
  highlightColor?: string;
  children?: React.ReactNode;
}

export function TextHighlight({
  delay = 0,
  duration = 2000,
  className,
  textEndColor,
  highlightColor = "hsl(var(--primary) / 0.3)",
  children,
}: TextHighlightProps) {
  const delayMs = `${delay}ms`;
  const durationMs = `${duration}ms`;

  const styleId = `th-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <>
      <style>{`
        @keyframes background-expand-${styleId} {
          0%   { background-size: 0% 100%; }
          100% { background-size: 100% 100%; }
        }
        @keyframes text-color-change-${styleId} {
          0%   { color: inherit; }
          100% { color: ${textEndColor ?? "inherit"}; }
        }
        .${styleId} {
          background-image: linear-gradient(${highlightColor}, ${highlightColor});
          background-size: 0% 100%;
          background-repeat: no-repeat;
          background-position: left center;
          animation:
            background-expand-${styleId} ${durationMs} ease-in-out ${delayMs} forwards${textEndColor ? `,\n            text-color-change-${styleId} ${durationMs} ease-in-out ${delayMs} forwards` : ""};
        }
      `}</style>
      <span className={cn(`${styleId} inline-block px-1 pb-1`, className)}>
        {children}
      </span>
    </>
  );
}
