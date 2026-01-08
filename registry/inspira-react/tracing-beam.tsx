"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface TracingBeamProps {
  children: React.ReactNode;
  className?: string;
}

function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function useSpringValue(target: number, config = { tension: 80, friction: 26 }) {
  const [value, setValue] = useState(target);
  const valueRef = useRef(value);
  const velocityRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const { tension, friction } = config;

    function step() {
      const delta = target - valueRef.current;
      const spring = tension * delta;
      velocityRef.current = (velocityRef.current + spring * 0.001) * (1 - friction * 0.001);
      valueRef.current += velocityRef.current;

      if (Math.abs(delta) > 0.01 || Math.abs(velocityRef.current) > 0.01) {
        setValue(valueRef.current);
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        valueRef.current = target;
        setValue(target);
      }
    }

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [target]);

  return value;
}

export function TracingBeam({ children, className }: TracingBeamProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [scrollYProgress, setScrollYProgress] = useState(0);
  const [svgHeight, setSvgHeight] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const rawY1 =
    mapRange(scrollYProgress, 0, 0.8, scrollYProgress, svgHeight) *
    (1.4 - scrollPercentage);
  const rawY2 =
    mapRange(scrollYProgress, 0, 1, scrollYProgress, svgHeight - 500) *
    (1.4 - scrollPercentage);

  const springY1 = useSpringValue(rawY1);
  const springY2 = useSpringValue(rawY2);

  useEffect(() => {
    function updateScrollYProgress() {
      if (containerRef.current) {
        const boundingRect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementHeight = boundingRect.height;

        setScrollPercentage(
          (windowHeight - boundingRect.top) / (windowHeight + elementHeight),
        );
        setScrollYProgress((boundingRect.y / windowHeight) * -1);
      }
    }

    window.addEventListener("scroll", updateScrollYProgress);
    window.addEventListener("resize", updateScrollYProgress);
    updateScrollYProgress();

    return () => {
      window.removeEventListener("scroll", updateScrollYProgress);
      window.removeEventListener("resize", updateScrollYProgress);
    };
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;

    function updateSVGHeight() {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.offsetHeight);
      }
    }

    const resizeObserver = new ResizeObserver(updateSVGHeight);
    resizeObserver.observe(contentRef.current);
    updateSVGHeight();

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative mx-auto h-full w-full max-w-4xl", className)}
    >
      <div className="absolute top-3 -left-4 md:-left-12">
        <div
          style={{
            boxShadow:
              scrollYProgress > 0 ? "none" : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          className="border-neutral-200 ml-[27px] flex size-4 items-center justify-center rounded-full border shadow-sm"
        >
          <motion.div
            animate={{
              backgroundColor:
                scrollYProgress > 0 ? "white" : "rgb(16, 185, 129)",
              borderColor:
                scrollYProgress > 0 ? "white" : "rgb(5, 150, 105)",
            }}
            className="size-2 rounded-full border border-neutral-300 bg-white"
          />
        </div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block"
          aria-hidden="true"
        >
          <path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
          />
          <path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#tracing-gradient)"
            strokeWidth="1.25"
          />
          <defs>
            <linearGradient
              id="tracing-gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={springY1}
              y2={springY2}
            >
              <stop stopColor="#18CCFC" stopOpacity="0" />
              <stop stopColor="#18CCFC" />
              <stop offset="0.325" stopColor="#6344F5" />
              <stop offset="1" stopColor="#AE48FF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div ref={contentRef}>{children}</div>
    </div>
  );
}
