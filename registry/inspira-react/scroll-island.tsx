"use client";
import React, { useEffect, useRef, useState } from "react";
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
  const [isDark, setIsDark] = useState(false);
  const hasChildren = Boolean(children);
  const borderRadius = `${height / 2}px`;

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

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
          "fixed left-1/2 top-12 z-[999] -translate-x-1/2 bg-primary/90 backdrop-blur-lg",
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
            width: open && hasChildren ? 320 : 260,
          }}
          className="relative cursor-pointer overflow-hidden bg-neutral-900 text-secondary"
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
              gaugeSecondaryColor={isDark ? "#6b728055" : "#6b728099"}
              gaugePrimaryColor={isDark ? "black" : "white"}
            />
            <h1 className="grow text-center font-bold">{title}</h1>
            <span className="tabular-nums">
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
