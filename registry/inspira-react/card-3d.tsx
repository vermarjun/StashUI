"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ── Context ────────────────────────────────────────────────────────────────

interface Card3DContextValue {
  isMouseEntered: boolean;
}

const Card3DContext = React.createContext<Card3DContextValue>({
  isMouseEntered: false,
});

function useCard3D() {
  return React.useContext(Card3DContext);
}

// ── CardContainer ──────────────────────────────────────────────────────────

export interface CardContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  containerClassName?: string;
}

export const CardContainer = React.forwardRef<HTMLDivElement, CardContainerProps>(
  ({ className, containerClassName, children, ...props }, _ref) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isMouseEntered, setIsMouseEntered] = React.useState(false);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
      if (!containerRef.current) return;
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / 25;
      const y = (e.clientY - top - height / 2) / 25;
      containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    }

    function handleMouseEnter() {
      setIsMouseEntered(true);
    }

    function handleMouseLeave() {
      setIsMouseEntered(false);
      if (!containerRef.current) return;
      containerRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
    }

    return (
      <Card3DContext.Provider value={{ isMouseEntered }}>
        <div
          style={{ perspective: "1000px" }}
          className={cn(
            "flex items-center justify-center p-2",
            containerClassName,
          )}
          {...props}
        >
          <div
            ref={containerRef}
            style={{ transformStyle: "preserve-3d" }}
            className={cn(
              "relative flex items-center justify-center transition-all duration-200 ease-linear",
              className,
            )}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {children}
          </div>
        </div>
      </Card3DContext.Provider>
    );
  },
);
CardContainer.displayName = "CardContainer";

// ── CardBody ───────────────────────────────────────────────────────────────

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      style={{ transformStyle: "preserve-3d" }}
      className={cn("h-96 w-96", className)}
      {...props}
    >
      {children}
    </div>
  ),
);
CardBody.displayName = "CardBody";

// ── CardItem ───────────────────────────────────────────────────────────────

export interface CardItemProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  translateX?: number;
  translateY?: number;
  translateZ?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
}

export const CardItem = React.forwardRef<HTMLElement, CardItemProps>(
  (
    {
      as: Tag = "div",
      className,
      children,
      translateX = 0,
      translateY = 0,
      translateZ = 0,
      rotateX = 0,
      rotateY = 0,
      rotateZ = 0,
      ...props
    },
    ref,
  ) => {
    const { isMouseEntered } = useCard3D();

    const transform = isMouseEntered
      ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
      : "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)";

    return (
      <Tag
        ref={ref}
        style={{ transform }}
        className={cn("w-fit transition duration-500 ease-in-out", className)}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);
CardItem.displayName = "CardItem";
