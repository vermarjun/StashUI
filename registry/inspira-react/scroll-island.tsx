"use client";
import React, { useEffect, useState } from "react";
import { motion, MotionConfig } from "motion/react";
import { cn } from "@/lib/utils";
import { AnimatedCircularProgressBar } from "@/registry/inspira-react/animated-circular-progressbar";

interface ScrollIslandProps {
  className?: string;
  title?: string;
  height?: number;
  children?: React.ReactNode;
}

export function ScrollIsland({
  className = "",
  title = "Progress",
  height = 44,
  children,
}: ScrollIslandProps) {
  const [open, setOpen] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const hasChildren = Boolean(children);
  const borderRadius = `${height / 2}px`;

  useEffect(() => {
    function updatePageScroll() {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setScrollPercentage(isNaN(pct) ? 0 : pct);
    }

    window.addEventListener("scroll", updatePageScroll);
    updatePageScroll();
    return () => window.removeEventListener("scroll", updatePageScroll);
  }, []);

  return (
    <MotionConfig
      transition={{
        duration: 0.7,
        type: "spring",
        bounce: 0.5,
      }}
    >
      <div
        className={cn(
          "fixed left-1/2 top-12 z-[999] -translate-x-1/2 overflow-hidden bg-neutral-900/90 shadow-2xl backdrop-blur-lg",
          className,
        )}
        style={{ borderRadius }}
        onClick={() => setOpen((v) => !v)}
      >
        <motion.div
          layout
          initial={{ height, width: 0 }}
          animate={{
            height: open && hasChildren ? "auto" : height,
            width: open && hasChildren ? 380 : 300,
          }}
          className="relative cursor-pointer overflow-hidden bg-neutral-900 text-white"
        >
          <header className="flex h-11 cursor-pointer items-center gap-2 px-4">
            <AnimatedCircularProgressBar
              value={scrollPercentage * 100}
              min={0}
              max={100}
              circleStrokeWidth={10}
              className="w-6"
              showPercentage={false}
              duration={0.3}
              gaugeSecondaryColor="#ffffff33"
              gaugePrimaryColor="#ffffff"
            />
            <h1 className="grow text-center text-sm font-semibold">{title}</h1>
            <span className="text-sm tabular-nums text-white/70">
              {Math.round(scrollPercentage * 100)}%
            </span>
          </header>
          {hasChildren && (
            <motion.div className="mb-2 flex h-full max-h-60 flex-col gap-1 overflow-y-auto px-4 text-sm">
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </MotionConfig>
  );
}
