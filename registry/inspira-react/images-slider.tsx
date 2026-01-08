"use client";

import { cn } from "@/lib/utils";
import {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface ImagesSliderProps {
  images: string[];
  value?: number;
  onChange?: (index: number) => void;
  hideOverlay?: boolean;
  overlayClass?: string;
  imageClass?: string;
  autoplay?: boolean | number;
  direction?: "vertical" | "horizontal";
  perspective?: string;
  children?: ReactNode | ((currentIndex: number) => ReactNode);
  className?: string;
}

type SlideDirection = "up" | "down" | "left" | "right";

const SLIDE_LEAVE_CLASSES: Record<SlideDirection, string> = {
  up: "-translate-y-full",
  down: "translate-y-full",
  left: "-translate-x-full",
  right: "translate-x-full",
};

export function ImagesSlider({
  images,
  value,
  onChange,
  hideOverlay = false,
  overlayClass = "",
  imageClass = "object-cover w-full h-full",
  autoplay = false,
  direction = "vertical",
  perspective = "1000px",
  children,
  className,
}: ImagesSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(value ?? 0);
  const [currentDirection, setCurrentDirection] = useState<SlideDirection>("up");
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [displayedKey, setDisplayedKey] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Controlled / uncontrolled sync
  useEffect(() => {
    if (value !== undefined) setCurrentIndex(value);
  }, [value]);

  const autoplayInterval =
    autoplay === false
      ? 0
      : autoplay === true
      ? 5000
      : typeof autoplay === "string"
      ? Number(autoplay)
      : (autoplay as number);

  // Load images
  useEffect(() => {
    setIsLoading(true);
    const promises = images.map(
      (src): Promise<string> =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(src);
          img.onerror = () => reject(src);
        })
    );
    Promise.all(promises).then((resolved) => {
      setLoadedImages(resolved);
      setIsLoading(false);
    });
  }, [images]);

  const startAutoplay = useCallback(() => {
    if (!autoplayInterval) return;
    autoplayRef.current = setInterval(() => {
      goNext();
    }, autoplayInterval);
  }, [autoplayInterval]); // eslint-disable-line react-hooks/exhaustive-deps

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isLoading && autoplayInterval) {
      startAutoplay();
    }
    return stopAutoplay;
  }, [isLoading, autoplayInterval, startAutoplay, stopAutoplay]);

  const resolveDirection = (nav: "prev" | "next"): SlideDirection => {
    if (direction === "horizontal") return nav === "next" ? "left" : "right";
    return nav === "next" ? "up" : "down";
  };

  const navigate = useCallback(
    (nav: "prev" | "next") => {
      if (isLoading || isTransitioning) return;
      const dir = resolveDirection(nav);
      setCurrentDirection(dir);

      let target =
        nav === "next" ? currentIndex + 1 : currentIndex - 1;
      if (target < 0) target = loadedImages.length - 1;
      if (target >= loadedImages.length) target = 0;

      setCurrentIndex(target);
      onChange?.(target);
      setDisplayedKey((k) => k + 1);

      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 350);
    },
    [currentIndex, isLoading, isTransitioning, loadedImages.length, onChange, direction, resolveDirection] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const goPrev = useCallback(() => navigate("prev"), [navigate]);
  const goNext = useCallback(() => navigate("next"), [navigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (
        sliderRef.current &&
        document.activeElement !== sliderRef.current &&
        !sliderRef.current.contains(document.activeElement)
      )
        return;
      if (["ArrowUp", "ArrowLeft"].includes(e.key)) {
        e.preventDefault();
        stopAutoplay();
        goPrev();
      } else if (["ArrowDown", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        stopAutoplay();
        goNext();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goPrev, goNext, stopAutoplay]);

  // Show slot after loading
  useEffect(() => {
    if (!isLoading) {
      const t = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(t);
    }
  }, [isLoading]);

  const currentImage = loadedImages[currentIndex];

  return (
    <div
      ref={sliderRef}
      tabIndex={0}
      className={cn(
        "relative flex size-full items-center justify-center overflow-hidden transition-colors focus:ring-1 focus:outline-none",
        className
      )}
      style={{ perspective }}
      onTouchStart={(e) => {
        touchStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
        stopAutoplay();
      }}
      onTouchEnd={(e) => {
        if (!touchStartRef.current) return;
        const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
        const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
        if (Math.abs(dx) > Math.abs(dy)) {
          dx < 0 ? goPrev() : goNext();
        } else {
          dy < 0 ? goPrev() : goNext();
        }
        touchStartRef.current = null;
        startAutoplay();
      }}
    >
      {/* Current image with transition */}
      <div
        key={displayedKey}
        className={cn(
          "transition-transform duration-300 ease-in-out",
          SLIDE_LEAVE_CLASSES[currentDirection]
        )}
        style={{ animation: `slide-in-from-center 0.3s ease-in-out forwards` }}
      >
        {currentImage && (
          <img
            src={currentImage}
            alt={`Slide ${currentIndex + 1}`}
            className={cn(imageClass)}
          />
        )}
      </div>

      {/* Overlay and slot */}
      {!hideOverlay && (
        <div className={cn("absolute inset-0", overlayClass)}>
          <div
            className={cn(
              "transition-all duration-300 delay-300 ease-in-out",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            )}
          >
            {!isLoading &&
              (typeof children === "function"
                ? children(currentIndex)
                : children)}
          </div>
        </div>
      )}
    </div>
  );
}
