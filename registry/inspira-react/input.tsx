"use client";

import { cn } from "@/lib/utils";
import {
  InputHTMLAttributes,
  forwardRef,
  useCallback,
  useRef,
  useState,
} from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerClass?: string;
}

export const IInput = forwardRef<HTMLInputElement, IInputProps>(
  ({ className, containerClass, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);

    const radius = 100;

    const containerBg = `radial-gradient(
      ${visible ? `${radius}px` : "0px"} circle at ${mouse.x}px ${mouse.y}px,
      var(--blue-500, #3b82f6),
      transparent 80%
    )`;

    const handleMouseMove = useCallback(
      ({ clientX, clientY }: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const { left, top } = containerRef.current.getBoundingClientRect();
        setMouse({ x: clientX - left, y: clientY - top });
      },
      []
    );

    return (
      <div
        ref={containerRef}
        style={{ background: containerBg }}
        className={cn(
          "group/input rounded-lg p-[2px] transition duration-300",
          containerClass
        )}
        onMouseLeave={() => setVisible(false)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
      >
        <input
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black transition duration-400",
            "group-hover/input:shadow-none",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-neutral-400",
            "focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "dark:bg-zinc-800 dark:text-white",
            "dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]",
            "dark:focus-visible:ring-neutral-600",
            className
          )}
          style={{
            boxShadow:
              "0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)",
          }}
          {...props}
        />
      </div>
    );
  }
);

IInput.displayName = "IInput";
