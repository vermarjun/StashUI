"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";

const METEOR_KEYFRAMES = `
@keyframes meteor-effect {
  0% { transform: rotate(215deg) translateX(0); opacity: 1; }
  70% { opacity: 1; }
  100% { transform: rotate(215deg) translateX(-500px); opacity: 0; }
}
.animate-meteor-effect { animation: meteor-effect 5s linear infinite; }
`;

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteorCount = number || 20;
  // Random timings are generated after mount so server and client markup match.
  const [timings, setTimings] = useState<{ delay: string; duration: string }[]>(
    [],
  );
  useEffect(() => {
    setTimings(
      Array.from({ length: meteorCount }, () => ({
        delay: Math.random() * 5 + "s", // Random delay between 0-5s
        duration: Math.floor(Math.random() * (10 - 5) + 5) + "s",
      })),
    );
  }, [meteorCount]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <style>{METEOR_KEYFRAMES}</style>
      {timings.map((t, idx) => {
        // Calculate position to evenly distribute meteors across container width
        const position = idx * (800 / meteorCount) - 400; // Spread across 800px range, centered
        return (
          <span
            key={"meteor" + idx}
            className={cn(
              "animate-meteor-effect absolute h-0.5 w-0.5 rotate-[45deg] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
              "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
              className,
            )}
            style={{
              top: "-40px", // Start above the container
              left: position + "px",
              animationDelay: t.delay,
              animationDuration: t.duration,
            }}
          ></span>
        );
      })}
    </motion.div>
  );
};
