"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type AnimationType = "none" | "half" | "full";

interface NeonBorderProps {
  color1?: string;
  color2?: string;
  animationType?: AnimationType;
  duration?: number;
  className?: string;
  children?: ReactNode;
}

function getWidth(animationType: AnimationType): number {
  switch (animationType) {
    case "none":
      return 12;
    case "half":
      return 50;
    case "full":
      return 100;
  }
}

export function NeonBorder({
  color1 = "#0496ff",
  color2 = "#ff0a54",
  animationType = "half",
  duration = 6,
  className,
  children,
}: NeonBorderProps) {
  const animWidth = `${getWidth(animationType)}%`;
  const durationStr = `${duration}s`;
  const shouldAnimate = animationType !== "none";

  return (
    <div
      style={{ "--neon-border-duration": durationStr } as React.CSSProperties}
      className={cn(
        "relative z-10 inline-block h-10 w-full max-w-sm overflow-hidden rounded-lg p-px",
        className,
      )}
    >
      {/* Layer 1 - color1 side */}
      <div
        style={
          {
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            width: "100%",
            height: "100%",
            filter: `blur(1px) drop-shadow(0 0 12px ${color1})`,
            zIndex: -1,
            borderRadius: "inherit",
            ...(shouldAnimate
              ? { animation: `neon-border-anim ${duration}s linear infinite` }
              : {}),
          } as React.CSSProperties
        }
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: animWidth,
            height: "100%",
            background: `linear-gradient(135deg, ${color1}, ${color1}, transparent, transparent)`,
          }}
        />
      </div>

      {/* Layer 2 - color2 side */}
      <div
        style={
          {
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            width: "100%",
            height: "100%",
            filter: `blur(1px) drop-shadow(0 0 12px ${color2})`,
            zIndex: -1,
            borderRadius: "inherit",
            ...(shouldAnimate
              ? { animation: `neon-border-anim ${duration}s linear infinite` }
              : {}),
          } as React.CSSProperties
        }
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: animWidth,
            height: "100%",
            background: `linear-gradient(135deg, transparent, transparent, ${color2}, ${color2})`,
          }}
        />
      </div>

      {/* Border overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          border: `1px solid transparent`,
          background: `linear-gradient(135deg, ${color1}, ${color2}) border-box`,
          WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude",
        }}
      />

      {children}
    </div>
  );
}
