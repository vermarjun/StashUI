"use client";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";
import { cn } from "@/lib/utils";

interface WavyBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  containerClass?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
}

export function WavyBackground({
  children,
  className,
  containerClass,
  colors = ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"],
  waveWidth = 50,
  backgroundFill = "black",
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
}: WavyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSafari, setIsSafari] = useState(false);
  const animationIdRef = useRef<number>(0);

  const noiseRef = useRef(createNoise3D());
  const ntRef = useRef(0);

  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome"),
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;

    function resize() {
      if (parent && ctx && canvas) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        ctx.filter = `blur(${blur}px)`;
      }
    }

    resize();

    const getSpeed = () => (speed === "slow" ? 0.001 : 0.002);

    function drawWave(n: number) {
      ntRef.current += getSpeed();
      const w = canvas!.width;
      const h = canvas!.height;
      for (let i = 0; i < n; i++) {
        ctx!.beginPath();
        ctx!.lineWidth = waveWidth;
        ctx!.strokeStyle = colors[i % colors.length];
        for (let x = 0; x < w; x += 5) {
          const y = noiseRef.current(x / 800, 0.3 * i, ntRef.current) * 100;
          ctx!.lineTo(x, y + h * 0.5);
        }
        ctx!.stroke();
        ctx!.closePath();
      }
    }

    function render() {
      const w = canvas!.width;
      const h = canvas!.height;
      ctx!.fillStyle = backgroundFill;
      ctx!.globalAlpha = waveOpacity;
      ctx!.fillRect(0, 0, w, h);
      drawWave(5);
      animationIdRef.current = requestAnimationFrame(render);
    }

    render();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [colors, waveWidth, backgroundFill, blur, speed, waveOpacity]);

  return (
    <div
      className={cn(
        "flex h-screen flex-col items-center justify-center",
        containerClass,
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute z-0"
        style={isSafari ? { filter: `blur(${blur}px)` } : undefined}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}
