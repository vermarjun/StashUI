"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { StarField } from "@/registry/inspira-react/star-field";

interface CompareProps {
  firstImage?: string;
  secondImage?: string;
  firstImageAlt?: string;
  secondImageAlt?: string;
  className?: string;
  firstContentClass?: string;
  secondContentClass?: string;
  initialSliderPercentage?: number;
  slideMode?: "hover" | "drag";
  showHandlebar?: boolean;
  autoplay?: boolean;
  autoplayDuration?: number;
  onPercentageChange?: (value: number) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onHoverEnter?: () => void;
  onHoverLeave?: () => void;
  firstContent?: ReactNode;
  secondContent?: ReactNode;
  handle?: ReactNode;
}

export function Compare({
  firstImage = "",
  secondImage = "",
  firstImageAlt = "First image",
  secondImageAlt = "Second image",
  className,
  firstContentClass,
  secondContentClass,
  initialSliderPercentage = 50,
  slideMode = "hover",
  showHandlebar = true,
  autoplay = false,
  autoplayDuration = 5000,
  onPercentageChange,
  onDragStart,
  onDragEnd,
  onHoverEnter,
  onHoverLeave,
  firstContent,
  secondContent,
  handle,
}: CompareProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderXPercent, setSliderXPercent] = useState(initialSliderPercentage);
  const [isDragging, setIsDragging] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const autoplayRAF = useRef<number | null>(null);
  const autoplayTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSliderXPercent(initialSliderPercentage);
  }, [initialSliderPercentage]);

  const stopAutoplay = useCallback(() => {
    if (autoplayTimeout.current) {
      clearTimeout(autoplayTimeout.current);
      autoplayTimeout.current = null;
    }
    if (autoplayRAF.current) {
      cancelAnimationFrame(autoplayRAF.current);
      autoplayRAF.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    if (!autoplay || isMouseOver || isDragging) return;
    const startTime = Date.now();
    const animate = () => {
      if (isMouseOver || isDragging) {
        if (autoplayRAF.current) cancelAnimationFrame(autoplayRAF.current);
        return;
      }
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % (autoplayDuration * 2)) / autoplayDuration;
      const percentage = progress <= 1 ? progress * 100 : (2 - progress) * 100;
      setSliderXPercent(percentage);
      onPercentageChange?.(percentage);
      autoplayRAF.current = requestAnimationFrame(animate);
    };
    animate();
  }, [autoplay, autoplayDuration, isDragging, isMouseOver, onPercentageChange]);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  useEffect(() => {
    if (autoplay && !isMouseOver && !isDragging) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
  }, [autoplay, isDragging, isMouseOver, startAutoplay, stopAutoplay]);

  function handleMove(clientX: number) {
    if (!sliderRef.current) return;
    if (slideMode === "hover" || (slideMode === "drag" && isDragging)) {
      setIsInteracting(true);
      stopAutoplay();
      const rect = sliderRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percent = (x / rect.width) * 100;
      requestAnimationFrame(() => {
        const newPercent = Math.max(0, Math.min(100, percent));
        setSliderXPercent(newPercent);
        onPercentageChange?.(newPercent);
      });
    }
  }

  function handleStart() {
    if (slideMode === "drag") {
      setIsDragging(true);
      setIsInteracting(true);
      onDragStart?.();
      stopAutoplay();
    }
  }

  function handleEnd() {
    if (slideMode === "drag") {
      setIsDragging(false);
      setIsInteracting(false);
      onDragEnd?.();
      if (autoplay && !isMouseOver) startAutoplay();
    }
  }

  function mouseEnterHandler() {
    setIsMouseOver(true);
    onHoverEnter?.();
    if (autoplay) stopAutoplay();
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false);
    setIsInteracting(false);
    onHoverLeave?.();
    if (slideMode === "hover") {
      setSliderXPercent(initialSliderPercentage);
      onPercentageChange?.(initialSliderPercentage);
    }
    if (slideMode === "drag") setIsDragging(false);
    if (autoplay) startAutoplay();
  }

  return (
    <div
      ref={sliderRef}
      className={cn("h-[400px] w-[400px] overflow-hidden", className)}
      style={{
        position: "relative",
        cursor: slideMode === "drag" ? "grab" : "col-resize",
      }}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseLeave={mouseLeaveHandler}
      onMouseEnter={mouseEnterHandler}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      {/* Slider Line */}
      <div
        className="absolute top-0 z-30 m-auto h-full w-px bg-gradient-to-b from-transparent from-5% via-indigo-500 to-transparent to-95%"
        style={{ left: `${sliderXPercent}%`, zIndex: 40, pointerEvents: "none" }}
      >
        {/* Decorative Effects */}
        <div className="absolute top-1/2 left-0 z-20 h-full w-36 -translate-y-1/2 bg-gradient-to-r from-indigo-400 via-transparent to-transparent opacity-50 [mask-image:radial-gradient(100px_at_left,white,transparent)]" />
        <div className="absolute top-1/2 left-0 z-10 h-1/2 w-10 -translate-y-1/2 bg-gradient-to-r from-cyan-400 via-transparent to-transparent [mask-image:radial-gradient(50px_at_left,white,transparent)]" />
        <div className="absolute top-1/2 -right-10 h-3/4 w-10 -translate-y-1/2 [mask-image:radial-gradient(100px_at_left,white,transparent)]">
          <StarField starsCount={120} className="size-full" />
        </div>

        {/* Handle */}
        {handle ?? (
          showHandlebar && (
            <div className="pointer-events-auto absolute top-1/2 -right-2.5 z-30 flex size-5 -translate-y-1/2 cursor-grab items-center justify-center rounded-md bg-white shadow-[0px_-1px_0px_0px_#FFFFFF40]">
              <svg viewBox="0 0 24 24" className="size-4 text-black" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="12" r="1" fill="currentColor" />
                <circle cx="9" cy="6" r="1" fill="currentColor" />
                <circle cx="9" cy="18" r="1" fill="currentColor" />
                <circle cx="15" cy="12" r="1" fill="currentColor" />
                <circle cx="15" cy="6" r="1" fill="currentColor" />
                <circle cx="15" cy="18" r="1" fill="currentColor" />
              </svg>
            </div>
          )
        )}
      </div>

      {/* First Content */}
      <div
        className="relative z-20 size-full overflow-hidden"
        style={{ pointerEvents: isInteracting ? "none" : "auto" }}
      >
        <div
          className={cn(
            "absolute inset-0 z-20 h-full w-full shrink-0 overflow-hidden rounded-2xl select-none",
            firstContentClass,
          )}
          style={{ clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)` }}
        >
          {firstContent ?? (
            firstImage && (
              <img
                alt={firstImageAlt}
                src={firstImage}
                draggable={false}
                className={cn(
                  "absolute inset-0 z-20 h-full w-full shrink-0 rounded-2xl select-none",
                  firstContentClass,
                )}
              />
            )
          )}
        </div>
      </div>

      {/* Second Content */}
      <div
        className={cn(
          "absolute top-0 left-0 z-[19] h-full w-full rounded-2xl select-none",
          secondContentClass,
        )}
        style={{ pointerEvents: isInteracting ? "none" : "auto" }}
      >
        {secondContent ?? (
          secondImage && (
            <img
              alt={secondImageAlt}
              src={secondImage}
              draggable={false}
              className={cn("h-full w-full object-cover", secondContentClass)}
            />
          )
        )}
      </div>
    </div>
  );
}
