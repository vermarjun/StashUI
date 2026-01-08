"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

interface GlowBorderProps {
  borderRadius?: number;
  color?: string | string[];
  borderWidth?: number;
  duration?: number;
  className?: string;
}

export function GlowBorder({
  borderRadius = 10,
  color = "#FFF",
  borderWidth = 2,
  duration = 10,
  className,
}: GlowBorderProps) {
  const colorValue = Array.isArray(color) ? color.join(",") : color;

  const styles: React.CSSProperties = useMemo(
    () => ({
      "--border-radius": `${borderRadius}px`,
      "--border-width": `${borderWidth}px`,
      "--duration": `${duration}s`,
      backgroundImage: `radial-gradient(transparent,transparent, ${colorValue},transparent,transparent)`,
      backgroundSize: "300% 300%",
      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
      padding: "var(--border-width)",
      borderRadius: "var(--border-radius)",
      animation: `glow-border-spin var(--duration) linear infinite`,
    } as React.CSSProperties),
    [borderRadius, borderWidth, duration, colorValue],
  );

  return (
    <>
      <style>{`
        @keyframes glow-border-spin {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
      `}</style>
      <div
        style={styles}
        className={cn(
          "pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position]",
          className,
        )}
      />
    </>
  );
}
