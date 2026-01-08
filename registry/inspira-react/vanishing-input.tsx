"use client";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

interface PixelData {
  x: number;
  y: number;
  color: string;
}

interface AnimatedPixel extends PixelData {
  r: number;
}

interface VanishingInputProps {
  placeholders?: string[];
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  className?: string;
}

export function VanishingInput({
  placeholders = ["Placeholder 1", "Placeholder 2", "Placeholder 3"],
  value: controlledValue,
  onChange,
  onSubmit,
  className,
}: VanishingInputProps) {
  const [internalValue, setInternalValue] = useState("");
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [animating, setAnimating] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const newDataRef = useRef<AnimatedPixel[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    function changePlaceholder() {
      intervalRef.current = window.setInterval(() => {
        setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
      }, 3000);
    }

    function handleVisibilityChange() {
      if (document.visibilityState !== "visible" && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      } else if (document.visibilityState === "visible") {
        changePlaceholder();
      }
    }

    changePlaceholder();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [placeholders.length]);

  const draw = useCallback(() => {
    if (!inputRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const computedStyles = getComputedStyle(inputRef.current);
    canvas.width = 800;
    canvas.height = 800;
    ctx.clearRect(0, 0, 800, 800);

    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
    ctx.fillStyle = "#FFF";
    ctx.fillText(value, 16, 40);

    const imageData = ctx.getImageData(0, 0, 800, 800);
    const pixelData = imageData.data;
    const newData: PixelData[] = [];

    for (let t = 0; t < 800; t++) {
      const i = 4 * t * 800;
      for (let n = 0; n < 800; n++) {
        const e = i + 4 * n;
        if (pixelData[e] !== 0 && pixelData[e + 1] !== 0 && pixelData[e + 2] !== 0) {
          newData.push({
            x: n,
            y: t,
            color: `rgba(${pixelData[e]}, ${pixelData[e + 1]}, ${pixelData[e + 2]}, ${pixelData[e + 3]})`,
          });
        }
      }
    }
    newDataRef.current = newData.map(({ x, y, color }) => ({ x, y, r: 1, color }));
  }, [value]);

  const animate = useCallback((start: number = 0) => {
    animationFrameRef.current = requestAnimationFrame(() => {
      const newArr: AnimatedPixel[] = [];
      for (const current of newDataRef.current) {
        if (current.x < start) {
          newArr.push(current);
        } else {
          if (current.r <= 0) {
            current.r = 0;
            continue;
          }
          current.x += Math.random() > 0.5 ? 1 : -1;
          current.y += Math.random() > 0.5 ? 1 : -1;
          current.r -= 0.05 * Math.random();
          newArr.push(current);
        }
      }
      newDataRef.current = newArr;

      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) {
        ctx.clearRect(start, 0, 800, 800);
        newDataRef.current.forEach(({ x, y, r, color }) => {
          if (x > start) {
            ctx.beginPath();
            ctx.rect(x, y, r, r);
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.stroke();
          }
        });
      }

      if (newDataRef.current.length > 0) {
        animate(start - 8);
      } else {
        if (controlledValue === undefined) setInternalValue("");
        onChange?.("");
        setAnimating(false);
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }
    });
  }, [controlledValue, onChange]);

  const vanishAndSubmit = useCallback(() => {
    if (!value) return;
    setAnimating(true);
    draw();
    const maxX = Math.max(...newDataRef.current.map(({ x }) => x));
    animate(maxX);
    onSubmit?.(value);
  }, [value, draw, animate, onSubmit]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!animating) {
      const newVal = e.target.value;
      if (controlledValue === undefined) setInternalValue(newVal);
      onChange?.(newVal);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !animating && value) {
      vanishAndSubmit();
    }
  };

  return (
    <form
      className={cn(
        "relative mx-auto h-12 w-full max-w-xl overflow-hidden rounded-full bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200 dark:bg-zinc-800",
        value && "bg-gray-50",
        className,
      )}
      onSubmit={(e) => {
        e.preventDefault();
        vanishAndSubmit();
      }}
    >
      <canvas
        ref={canvasRef}
        className={cn(
          "pointer-events-none absolute top-[20%] left-2 origin-top-left scale-50 pr-20 text-base invert sm:left-8 dark:invert-0",
          animating ? "opacity-100" : "opacity-0",
        )}
      />

      <input
        ref={inputRef}
        value={value}
        disabled={animating}
        type="text"
        className={cn(
          "relative z-50 size-full rounded-full border-none bg-transparent pr-20 pl-4 text-sm text-black focus:ring-0 focus:outline-none sm:pl-10 sm:text-base dark:text-white",
          animating && "text-transparent dark:text-transparent",
        )}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <button
        disabled={!value}
        type="submit"
        className="absolute top-1/2 right-2 z-50 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black transition duration-200 disabled:bg-gray-100 dark:bg-zinc-900 dark:disabled:bg-zinc-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4 text-gray-300"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M5 12l14 0"
            style={{
              strokeDasharray: "50%",
              strokeDashoffset: value ? "0" : "50%",
              transition: "stroke-dashoffset 0.3s linear",
            }}
          />
          <path d="M13 18l6 -6" />
          <path d="M13 6l6 6" />
        </svg>
      </button>

      <div className="pointer-events-none absolute inset-0 flex items-center rounded-full">
        <AnimatePresence mode="wait">
          {!value && (
            <motion.p
              key={currentPlaceholder}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="w-[calc(100%-2rem)] truncate pl-4 text-left text-sm font-normal text-neutral-500 sm:pl-10 sm:text-base dark:text-zinc-500"
            >
              {placeholders[currentPlaceholder]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
