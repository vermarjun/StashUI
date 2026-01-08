"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from "motion/react";
import type { SpringOptions } from "motion/react";

export interface BgStarsProps {
  factor?: number;
  speed?: number;
  transition?: SpringOptions;
  starColor?: string;
  className?: string;
  children?: React.ReactNode;
}

function generateStars(count: number, starColor: string): string {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    shadows.push(`${x}px ${y}px ${starColor}`);
  }
  return shadows.join(", ");
}

export function BgStars({
  factor = 0.05,
  speed = 50,
  transition = { stiffness: 50, damping: 20 },
  starColor = "#fff",
  className,
  children,
}: BgStarsProps) {
  const offsetX = useMotionValue(1);
  const offsetY = useMotionValue(1);
  const springX = useSpring(offsetX, transition);
  const springY = useSpring(offsetY, transition);

  const [boxShadow1, setBoxShadow1] = React.useState("");
  const [boxShadow2, setBoxShadow2] = React.useState("");
  const [boxShadow3, setBoxShadow3] = React.useState("");

  React.useEffect(() => {
    setBoxShadow1(generateStars(1000, starColor));
    setBoxShadow2(generateStars(400, starColor));
    setBoxShadow3(generateStars(200, starColor));
  }, [starColor]);

  function handleMouseMove(e: React.MouseEvent) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    offsetX.set(-(e.clientX - centerX) * factor);
    offsetY.set(-(e.clientY - centerY) * factor);
  }

  const layer1Transition = React.useMemo(
    () => ({ repeat: Infinity, duration: speed, ease: "linear" as const }),
    [speed],
  );
  const layer2Transition = React.useMemo(
    () => ({ repeat: Infinity, duration: speed * 2, ease: "linear" as const }),
    [speed],
  );
  const layer3Transition = React.useMemo(
    () => ({ repeat: Infinity, duration: speed * 3, ease: "linear" as const }),
    [speed],
  );

  return (
    <div
      className={cn(
        "relative size-full overflow-hidden bg-[radial-gradient(ellipse_at_bottom,#262626_0%,#000_100%)]",
        className,
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div style={{ x: springX, y: springY }}>
        {/* Layer 1 — 1px stars */}
        <motion.div
          className="absolute left-0 top-0 h-[2000px] w-full"
          animate={{ y: [0, -2000] }}
          transition={layer1Transition}
        >
          <div
            className="absolute rounded-full bg-transparent"
            style={{ width: "1px", height: "1px", boxShadow: boxShadow1 }}
          />
          <div
            className="absolute top-[2000px] rounded-full bg-transparent"
            style={{ width: "1px", height: "1px", boxShadow: boxShadow1 }}
          />
        </motion.div>

        {/* Layer 2 — 2px stars */}
        <motion.div
          className="absolute left-0 top-0 h-[2000px] w-full"
          animate={{ y: [0, -2000] }}
          transition={layer2Transition}
        >
          <div
            className="absolute rounded-full bg-transparent"
            style={{ width: "2px", height: "2px", boxShadow: boxShadow2 }}
          />
          <div
            className="absolute top-[2000px] rounded-full bg-transparent"
            style={{ width: "2px", height: "2px", boxShadow: boxShadow2 }}
          />
        </motion.div>

        {/* Layer 3 — 3px stars */}
        <motion.div
          className="absolute left-0 top-0 h-[2000px] w-full"
          animate={{ y: [0, -2000] }}
          transition={layer3Transition}
        >
          <div
            className="absolute rounded-full bg-transparent"
            style={{ width: "3px", height: "3px", boxShadow: boxShadow3 }}
          />
          <div
            className="absolute top-[2000px] rounded-full bg-transparent"
            style={{ width: "3px", height: "3px", boxShadow: boxShadow3 }}
          />
        </motion.div>
      </motion.div>

      {children}
    </div>
  );
}
