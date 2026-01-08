"use client";

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
type DataOrientation = "vertical" | "horizontal";
type Direction = "top" | "middle" | "bottom";

// ─── Context ──────────────────────────────────────────────────────────────────
interface DockContextValue {
  mouseX: number;
  mouseY: number;
  magnification: number;
  distance: number;
  orientation: DataOrientation;
}

const DockContext = createContext<DockContextValue>({
  mouseX: Infinity,
  mouseY: Infinity,
  magnification: 60,
  distance: 140,
  orientation: "horizontal",
});

// ─── Dock ─────────────────────────────────────────────────────────────────────
interface DockProps {
  className?: string;
  magnification?: number;
  distance?: number;
  direction?: Direction;
  orientation?: DataOrientation;
  children?: ReactNode;
}

export function Dock({
  className,
  magnification = 60,
  distance = 140,
  direction = "middle",
  orientation = "horizontal",
  children,
}: DockProps) {
  const [mouseX, setMouseX] = useState(Infinity);
  const [mouseY, setMouseY] = useState(Infinity);

  const directionClass = {
    top: "items-start",
    middle: "items-center",
    bottom: "items-end",
  }[direction];

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    requestAnimationFrame(() => {
      setMouseX(e.pageX);
      setMouseY(e.pageY);
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    requestAnimationFrame(() => {
      setMouseX(Infinity);
      setMouseY(Infinity);
    });
  }, []);

  const contextValue = useMemo(
    () => ({ mouseX, mouseY, magnification, distance, orientation }),
    [mouseX, mouseY, magnification, distance, orientation]
  );

  return (
    <DockContext.Provider value={contextValue}>
      <div
        className={cn(
          "mx-auto mt-8 flex h-[58px] w-max gap-4 rounded-2xl border p-2 backdrop-blur-md transition-all supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10",
          orientation === "vertical" && "h-max w-[58px] flex-col",
          directionClass,
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    </DockContext.Provider>
  );
}

// ─── DockIcon ─────────────────────────────────────────────────────────────────
interface DockIconProps {
  className?: string;
  children?: ReactNode;
}

export function DockIcon({ className, children }: DockIconProps) {
  const iconRef = useRef<HTMLDivElement>(null);
  const { mouseX, mouseY, distance, magnification, orientation } =
    useContext(DockContext);

  const isVertical = orientation === "vertical";

  const iconWidth = useMemo(() => {
    if (!iconRef.current) return 40;
    const bounds = iconRef.current.getBoundingClientRect();
    const distanceCalc = isVertical
      ? mouseY - bounds.y - bounds.height / 2
      : mouseX - bounds.x - bounds.width / 2;

    if (Math.abs(distanceCalc) < distance) {
      return (1 - Math.abs(distanceCalc) / distance) * magnification + 40;
    }
    return 40;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouseX, mouseY, distance, magnification, isVertical]);

  return (
    <div
      ref={iconRef}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full transition-all duration-200 ease-out",
        className
      )}
      style={{ width: `${iconWidth}px`, height: `${iconWidth}px` }}
    >
      {children}
    </div>
  );
}

// ─── DockSeparator ────────────────────────────────────────────────────────────
interface DockSeparatorProps {
  className?: string;
}

export function DockSeparator({ className }: DockSeparatorProps) {
  const { orientation } = useContext(DockContext);
  return (
    <div
      className={cn(
        "bg-secondary relative block",
        orientation === "vertical" ? "h-0.5 w-4/5" : "h-4/5 w-0.5",
        className
      )}
    />
  );
}
