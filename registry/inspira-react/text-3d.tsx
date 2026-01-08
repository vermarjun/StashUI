"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface Text3dProps {
  textColor?: string;
  letterSpacing?: number;
  strokeColor?: string;
  shadowColor?: string;
  strokeSize?: number;
  shadow1Size?: number;
  shadow2Size?: number;
  className?: string;
  animate?: boolean;
  animationDuration?: number;
  children?: React.ReactNode;
}

export function Text3d({
  textColor = "white",
  letterSpacing = -0.1,
  strokeColor = "black",
  shadowColor = "yellow",
  strokeSize = 20,
  shadow1Size = 7,
  shadow2Size = 10,
  className,
  animate = true,
  animationDuration = 1500,
  children,
}: Text3dProps) {
  const style: React.CSSProperties = {
    paintOrder: "stroke fill",
    letterSpacing: `${letterSpacing}ch`,
    WebkitTextStroke: `${strokeSize}px ${strokeColor}`,
    textShadow: `${shadow1Size}px ${shadow1Size}px 0px ${strokeColor}, ${shadow2Size}px ${shadow2Size}px 0px ${shadowColor}`,
    color: textColor,
    animation: animate
      ? `text3dWiggle ${animationDuration}ms ease-in-out infinite alternate`
      : undefined,
    transformOrigin: "center",
  };

  return (
    <>
      <style>{`
        @keyframes text3dWiggle {
          0%   { transform: rotate(0deg); }
          12%  { transform: rotate(5deg); }
          25%  { transform: rotate(-5deg); }
          38%  { transform: rotate(3deg); }
          50%  { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
      <div
        className={cn("flex items-center justify-center", className)}
        style={style}
      >
        {children}
      </div>
    </>
  );
}
