"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";

const DEFAULT_COLORS = [
  "rgb(131,179,32)",
  "rgb(47,195,106)",
  "rgb(42,169,210)",
  "rgb(4,112,202)",
  "rgb(107,10,255)",
  "rgb(183,0,218)",
  "rgb(218,0,171)",
  "rgb(230,64,92)",
  "rgb(232,98,63)",
  "rgb(249,129,47)",
];

export interface ColourfulTextProps {
  /** The text whose characters will be animated. */
  text: string;
  /** Colour palette to cycle through (defaults to a rainbow set). */
  colors?: string[];
  /** Initial / exit colour for each character. */
  startColor?: string;
  /** Per-character animation duration in seconds. */
  duration?: number;
}

/**
 * Renders each character of `text` with an animated colour that shuffles
 * through a palette every 5 seconds.
 */
export function ColourfulText({
  text,
  colors = DEFAULT_COLORS,
  startColor = "rgb(255,255,255)",
  duration = 0.5,
}: ColourfulTextProps) {
  const [currentColors, setCurrentColors] = React.useState(colors);
  const [epoch, setEpoch] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setCurrentColors([...colors].sort(() => 0.5 - Math.random()));
      if (document.visibilityState === "visible") {
        setEpoch((n) => n + 1);
      }
    }, 5000);
    return () => clearInterval(id);
  }, [colors]);

  return (
    <>
      {Array.from(text).map((char, index) => (
        <motion.span
          key={`${char}-${epoch}-${index}`}
          initial={{
            y: 0,
            opacity: 0.2,
            color: startColor,
            scale: 1,
            filter: "blur(5px)",
          }}
          animate={{
            y: [0, -3, 0],
            opacity: [1, 0.8, 1],
            scale: [1, 1.01, 1],
            filter: ["blur(0px)", "blur(5px)", "blur(0px)"],
            color: currentColors[index % currentColors.length],
          }}
          exit={{
            y: -3,
            opacity: 1,
            scale: 1,
            filter: "blur(5px)",
            color: startColor,
          }}
          transition={{
            duration,
            delay: index * 0.05,
          }}
        >
          {char}
        </motion.span>
      ))}
    </>
  );
}
