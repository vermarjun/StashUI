"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

const CURSOR_IMG =
  "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj4KICA8Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNSIgc3R5bGU9ImZpbGw6I2ZmZjtzdHJva2U6IzAwMDtzdHJva2Utd2lkdGg6MXB4OyIgLz4KPC9zdmc+'), auto";

interface ScratchToRevealProps {
  className?: string;
  width: number;
  height: number;
  minScratchPercentage?: number;
  gradientColors?: [string, string, string];
  onComplete?: () => void;
  children?: React.ReactNode;
}

export function ScratchToReveal({
  className,
  width,
  height,
  minScratchPercentage = 50,
  gradientColors = ["#A97CF8", "#F38CB8", "#FDCC92"],
  onComplete,
  children,
}: ScratchToRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isScratchingRef = useRef(false);
  const isCompleteRef = useRef(false);
  const [scope, animate] = useAnimate();

  function drawCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ccc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, gradientColors[0]);
    gradient.addColorStop(0.5, gradientColors[1]);
    gradient.addColorStop(1, gradientColors[2]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function scratch(clientX: number, clientY: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left + 16;
    const y = clientY - rect.top + 16;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();
  }

  function checkCompletion() {
    if (isCompleteRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    const totalPixels = pixels.length / 4;
    let clearPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) clearPixels++;
    }

    const percentage = (clearPixels / totalPixels) * 100;

    if (percentage >= minScratchPercentage) {
      isCompleteRef.current = true;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (scope.current) {
        animate(scope.current, {
          scale: 1,
          rotate: [0, 10, -10, 10, -10, 0],
        });
      }
      onComplete?.();
    }
  }

  useEffect(() => {
    drawCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      if (!isScratchingRef.current) return;
      scratch(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isScratchingRef.current) return;
      const touch = e.touches[0];
      scratch(touch.clientX, touch.clientY);
    };

    const handleMouseUp = () => {
      isScratchingRef.current = false;
      checkCompletion();
    };

    const handleTouchEnd = () => {
      isScratchingRef.current = false;
      checkCompletion();
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchcancel", handleTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      ref={scope}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        cursor: CURSOR_IMG,
      }}
      initial={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      className={cn("relative select-none", className)}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="absolute left-0 top-0"
        onMouseDown={() => {
          isScratchingRef.current = true;
        }}
        onTouchStart={() => {
          isScratchingRef.current = true;
        }}
      />
      {children}
    </motion.div>
  );
}
