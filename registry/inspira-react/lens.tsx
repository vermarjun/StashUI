"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LensProps {
  zoomFactor?: number;
  lensSize?: number;
  position?: { x: number; y: number };
  isStatic?: boolean;
  hovering?: boolean;
  onHoverUpdate?: (hovering: boolean) => void;
  children: React.ReactNode;
}

export function Lens({
  zoomFactor = 1.5,
  lensSize = 170,
  position = { x: 200, y: 150 },
  isStatic = false,
  hovering,
  onHoverUpdate,
  children,
}: LensProps) {
  const [localIsHovering, setLocalIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 100, y: 100 });

  const isHovering = hovering !== undefined ? hovering : localIsHovering;

  const handleSetHovering = useCallback(
    (hover: boolean) => {
      setLocalIsHovering(hover);
      onHoverUpdate?.(hover);
    },
    [onHoverUpdate]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    []
  );

  const pos = isStatic ? position : mousePosition;
  const maskPosition = `circle ${lensSize / 2}px at ${pos.x}px ${pos.y}px`;
  const transformOrigin = `${pos.x}px ${pos.y}px`;

  return (
    <div
      className="relative z-20 overflow-hidden rounded-lg"
      onMouseEnter={() => handleSetHovering(true)}
      onMouseLeave={() => handleSetHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {children}

      <AnimatePresence>
        {(isStatic || isHovering) && (
          <motion.div
            key="lens"
            initial={{ opacity: 0, scale: 0.58 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 overflow-hidden"
            style={{
              maskImage: `radial-gradient(${maskPosition}, black 100%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(${maskPosition}, black 100%, transparent 100%)`,
              transformOrigin,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                transform: `scale(${zoomFactor})`,
                transformOrigin,
              }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
