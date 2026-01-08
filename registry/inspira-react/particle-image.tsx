"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface ParticleImageProps {
  imageSrc: string;
  className?: string;
  canvasWidth?: string;
  canvasHeight?: string;
  gravity?: string;
  particleSize?: string;
  particleGap?: string;
  mouseForce?: string;
  renderer?: "default" | "webgl";
  color?: string;
  colorArr?: number[];
  initPosition?: "random" | "top" | "left" | "bottom" | "right" | "misplaced" | "none";
  initDirection?: "random" | "top" | "left" | "bottom" | "right" | "none";
  fadePosition?: "explode" | "top" | "left" | "bottom" | "right" | "random" | "none";
  fadeDirection?: "random" | "top" | "left" | "bottom" | "right" | "none";
  noise?: number;
  responsiveWidth?: boolean;
}

export function ParticleImage({
  imageSrc,
  className,
  canvasWidth,
  canvasHeight,
  gravity,
  particleSize,
  particleGap,
  mouseForce,
  renderer,
  color,
  colorArr,
  initPosition,
  initDirection,
  fadePosition,
  fadeDirection,
  noise,
  responsiveWidth,
}: ParticleImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    let particles: { stop?: () => void } = {};

    import("@/registry/inspira-react/inspira-image-particles").then((mod) => {
      const { inspiraImageParticles } = mod;
      const { InspiraImageParticle } = inspiraImageParticles();
      particles = new InspiraImageParticle(imageRef.current);
    });

    return () => {
      if (particles && typeof particles.stop === "function") {
        particles.stop();
      }
    };
  }, [imageSrc]);

  return (
    <img
      ref={imageRef}
      src={imageSrc}
      data-particle-gap={particleGap}
      data-width={canvasWidth}
      data-height={canvasHeight}
      data-gravity={gravity}
      data-particle-size={particleSize}
      data-mouse-force={mouseForce}
      data-renderer={renderer}
      data-color={color}
      data-color-arr={colorArr ? JSON.stringify(colorArr) : undefined}
      data-init-position={initPosition}
      data-init-direction={initDirection}
      data-fade-position={fadePosition}
      data-fade-direction={fadeDirection}
      data-noise={noise}
      data-responsive-width={responsiveWidth}
      className={cn("hidden h-32 w-32", className)}
      alt=""
      crossOrigin="anonymous"
    />
  );
}
