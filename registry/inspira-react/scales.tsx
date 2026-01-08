"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface ScalesProps {
  orientation?: "horizontal" | "vertical" | "diagonal";
  size?: number;
  className?: string;
  color?: string;
  containerClassName?: string;
  children?: React.ReactNode;
}

function getGradientAngle(orientation: "horizontal" | "vertical" | "diagonal"): string {
  switch (orientation) {
    case "horizontal":
      return "0deg";
    case "vertical":
      return "90deg";
    case "diagonal":
    default:
      return "315deg";
  }
}

export function Scales({
  orientation = "diagonal",
  size = 10,
  color,
  className,
  containerClassName,
  children,
}: ScalesProps) {
  const angle = getGradientAngle(orientation);

  return (
    <div className={cn("relative h-full w-full", containerClassName)}>
      <div
        className={cn(
          "absolute inset-0 h-full w-full overflow-hidden",
          "[--pattern-scales:oklch(0.145_0_0)]/10",
          "dark:[--pattern-scales:white]/10",
          className,
        )}
        style={
          {
            "--scales-size": `${size}px`,
            "--scales-angle": angle,
            ...(color ? { "--pattern-scales": color } : {}),
          } as React.CSSProperties
        }
      >
        <div
          className="h-full w-full bg-[repeating-linear-gradient(var(--scales-angle),var(--pattern-scales)_0,var(--pattern-scales)_1px,transparent_0,transparent_50%)]"
          style={{ backgroundSize: "var(--scales-size) var(--scales-size)" }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
