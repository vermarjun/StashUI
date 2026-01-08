"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

// ------------ ContainerScrollTitle ------------
interface ContainerScrollTitleProps {
  translate: number;
  children: ReactNode;
  className?: string;
}

export function ContainerScrollTitle({
  translate,
  children,
  className,
}: ContainerScrollTitleProps) {
  return (
    <div
      className={cn("mx-auto max-w-5xl text-center", className)}
      style={{ transform: `translateY(${translate}px)` }}
    >
      {children}
    </div>
  );
}

// ------------ ContainerScrollCard ------------
interface ContainerScrollCardProps {
  rotate: number;
  scale: number;
  children: ReactNode;
  className?: string;
}

export function ContainerScrollCard({
  rotate,
  scale,
  children,
  className,
}: ContainerScrollCardProps) {
  return (
    <div
      className={cn(
        "mx-auto -mt-12 h-[30rem] w-full max-w-5xl rounded-[30px] border-4 border-[#6C6C6C] bg-[#222222] p-2 shadow-2xl md:h-[40rem] md:p-6",
        className,
      )}
      style={{
        transform: `rotateX(${rotate}deg) scale(${scale})`,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
    >
      <div className="size-full overflow-hidden rounded-2xl bg-gray-100 md:rounded-2xl md:p-4 dark:bg-zinc-900">
        {children}
      </div>
    </div>
  );
}

// ------------ ContainerScroll (main) ------------
interface ContainerScrollProps {
  titleContent: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ContainerScroll({
  titleContent,
  children,
  className,
}: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function updateIsMobile() {
      setIsMobile(window.innerWidth <= 768);
    }
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const p = 1 - Math.max(0, rect.bottom - window.scrollY) / window.innerHeight;
      setProgress(Math.max(0, Math.min(1, p)));
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scaleDimensions = isMobile ? [0.7, 0.9] : [1.05, 1];
  const rotate = 20 * (1 - progress);
  const scale = scaleDimensions[0] + (scaleDimensions[1] - scaleDimensions[0]) * progress;
  const translateY = -100 * progress;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-[60rem] items-center justify-center p-2 md:h-[80rem] md:p-20",
        className,
      )}
    >
      <div className="relative w-full py-10 md:py-40" style={{ perspective: "1000px" }}>
        <ContainerScrollTitle translate={translateY}>
          {titleContent}
        </ContainerScrollTitle>
        <ContainerScrollCard rotate={rotate} scale={scale}>
          {children}
        </ContainerScrollCard>
      </div>
    </div>
  );
}
