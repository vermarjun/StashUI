"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export function ShimmerButton({
  shimmerColor = "#ffffff",
  shimmerSize = "0.05em",
  shimmerDuration = "3s",
  borderRadius = "100px",
  background = "rgba(0, 0, 0, 1)",
  className,
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <>
      <style>{`
        @keyframes shimmer-btn-shimmer-slide {
          to {
            transform: translate(calc(100cqw - 100%), 0);
          }
        }
        @keyframes shimmer-btn-spin-around {
          0% { transform: translateZ(0) rotate(0); }
          15%, 35% { transform: translateZ(0) rotate(90deg); }
          65%, 85% { transform: translateZ(0) rotate(270deg); }
          100% { transform: translateZ(0) rotate(360deg); }
        }
        .shimmer-btn-slide {
          animation: shimmer-btn-shimmer-slide var(--speed) ease-in-out infinite alternate;
        }
        .shimmer-btn-spin {
          animation: shimmer-btn-spin-around calc(var(--speed) * 2) infinite linear;
        }
      `}</style>
      <button
        style={
          {
            "--spread": "90deg",
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": background,
          } as React.CSSProperties
        }
        className={cn(
          "group relative z-0 flex transform-gpu cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white transition-transform duration-300 ease-in-out [background:var(--bg)] [border-radius:var(--radius)] active:translate-y-px dark:text-black",
          className,
        )}
        {...props}
      >
        <div className="absolute inset-0 -z-30 overflow-visible blur-[2px] [container-type:size]">
          <div className="shimmer-btn-slide absolute inset-0 aspect-[1] h-[100cqh] rounded-none [mask:none]">
            <div className="shimmer-btn-spin absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
          </div>
        </div>

        {children}

        <div className="absolute inset-0 size-full transform-gpu rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f] transition-all duration-300 ease-in-out group-hover:shadow-[inset_0_-6px_10px_#ffffff3f] group-active:shadow-[inset_0_-10px_10px_#ffffff3f]" />

        <div className="absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] inset-[var(--cut)]" />
      </button>
    </>
  );
}
