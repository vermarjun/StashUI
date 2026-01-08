"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface LineShadowTextProps {
  shadowColor?: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children: string;
}

export function LineShadowText({
  shadowColor = "black",
  as: Component = "span",
  className,
  children,
}: LineShadowTextProps) {
  if (typeof children !== "string") {
    throw new Error("LineShadowText only accepts string content");
  }

  return (
    <>
      <style>{`
        .line-shadow-text-animate::after {
          animation: line-shadow-scroll 15s linear infinite;
        }
        @keyframes line-shadow-scroll {
          0% { background-position: 0 0; }
          100% { background-position: 100% -100%; }
        }
      `}</style>
      <Component
        data-text={children}
        style={{ "--shadow-color": shadowColor } as React.CSSProperties}
        className={cn(
          "line-shadow-text-animate relative z-0 inline-flex",
          "after:absolute after:top-[0.04em] after:left-[0.04em] after:-z-10",
          "after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_0)]",
          "after:[background-size:0.06em_0.06em]",
          "after:bg-clip-text after:text-transparent",
          "after:content-[attr(data-text)]",
          className
        )}
      >
        {children}
      </Component>
    </>
  );
}
