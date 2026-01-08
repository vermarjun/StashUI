"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GradientButtonProps {
  borderWidth?: number;
  colors?: string[];
  duration?: number;
  borderRadius?: number;
  blur?: number;
  className?: string;
  bgColor?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function GradientButton({
  colors = ["#FF0000", "#FFA500", "#FFFF00", "#008000", "#0000FF", "#4B0082", "#EE82EE", "#FF0000"],
  duration = 2500,
  borderWidth = 2,
  borderRadius = 8,
  blur = 4,
  bgColor = "#000",
  className,
  children,
  onClick,
}: GradientButtonProps) {
  const allColors = colors.join(", ");

  const buttonStyle: React.CSSProperties = {
    padding: `${borderWidth}px`,
    borderRadius: `${borderRadius}px`,
    position: "relative",
    display: "inline-flex",
    minHeight: "40px",
    minWidth: "112px",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  };

  const beforeStyle: React.CSSProperties = {
    content: '""',
    position: "absolute",
    inset: "-200%",
    background: `conic-gradient(${allColors})`,
    animation: `rotate-rainbow ${duration}ms linear infinite`,
    filter: `blur(${blur}px)`,
  };

  const contentStyle: React.CSSProperties = {
    borderRadius: `${borderRadius}px`,
    backgroundColor: bgColor,
    zIndex: 0,
    display: "inline-flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 16px",
    position: "relative",
  };

  return (
    <>
      <style>{`
        @keyframes rotate-rainbow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .gradient-btn-before::before {
          content: "";
          position: absolute;
          inset: -200%;
          background: conic-gradient(${allColors});
          animation: rotate-rainbow ${duration}ms linear infinite;
          filter: blur(${blur}px);
        }
      `}</style>
      <button
        className={cn("gradient-btn-before relative overflow-hidden", className)}
        style={buttonStyle}
        onClick={onClick}
      >
        <span style={beforeStyle as React.CSSProperties} aria-hidden="true" />
        <span style={contentStyle}>{children}</span>
      </button>
    </>
  );
}
