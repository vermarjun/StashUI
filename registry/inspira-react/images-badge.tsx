"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

interface ImagesBadgeProps {
  text: string;
  images: string[];
  className?: string;
  href?: string;
  target?: string;
  folderSize?: { width: number; height: number };
  teaserImageSize?: { width: number; height: number };
  hoverImageSize?: { width: number; height: number };
  hoverTranslateY?: number;
  hoverSpread?: number;
  hoverRotation?: number;
}

export function ImagesBadge({
  text,
  images,
  className,
  href,
  target,
  folderSize = { width: 32, height: 24 },
  teaserImageSize = { width: 20, height: 14 },
  hoverImageSize = { width: 48, height: 32 },
  hoverTranslateY = -35,
  hoverSpread = 20,
  hoverRotation = 15,
}: ImagesBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);

  const displayImages = useMemo(() => images.slice(0, 3), [images]);

  const tabWidth = folderSize.width * 0.375;
  const tabHeight = folderSize.height * 0.25;

  const getSpreadX = (index: number, total: number) => {
    if (!isHovered) return "-50%";
    if (total === 1) return "-50%";
    if (total === 2) return `calc(-50% + ${(index - 0.5) * hoverSpread}px)`;
    return `calc(-50% + ${(index - 1) * hoverSpread}px)`;
  };

  const getRotation = (index: number, total: number, hovered: boolean) => {
    if (total === 1) return 0;
    if (total === 2) {
      return hovered ? (index - 0.5) * hoverRotation : (index - 0.5) * 3;
    }
    return hovered ? (index - 1) * hoverRotation : (index - 1) * 3;
  };

  const Wrapper = href ? "a" : "div";
  const wrapperProps = href
    ? {
        href,
        target,
        rel: target === "_blank" ? "noopener noreferrer" : undefined,
      }
    : {};

  return (
    <Wrapper
      {...(wrapperProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Folder Container */}
      <motion.div
        className="relative"
        style={{
          width: `${folderSize.width}px`,
          height: `${folderSize.height}px`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Folder Back */}
        <div className="absolute inset-0 rounded-[4px] bg-gradient-to-b from-amber-400 to-amber-500 shadow-sm dark:from-amber-500 dark:to-amber-600">
          {/* Folder Tab */}
          <div
            className="absolute left-0.5 rounded-t-[2px] bg-gradient-to-b from-amber-300 to-amber-400 dark:from-amber-400 dark:to-amber-500"
            style={{
              top: `${-tabHeight * 0.65}px`,
              width: `${tabWidth}px`,
              height: `${tabHeight}px`,
            }}
          />
        </div>

        {/* Images that pop out */}
        {displayImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute top-0.5 origin-bottom overflow-hidden rounded-[3px] bg-white shadow-sm ring-1 shadow-black/10 ring-black/10 dark:bg-neutral-800 dark:shadow-white/10 dark:ring-white/10"
            animate={{
              x: getSpreadX(index, displayImages.length),
              y: isHovered
                ? hoverTranslateY - (displayImages.length - 1 - index) * 3
                : -4 - (displayImages.length - 1 - index) * 1,
              rotate: getRotation(index, displayImages.length, isHovered),
              width: isHovered ? hoverImageSize.width : teaserImageSize.width,
              height: isHovered ? hoverImageSize.height : teaserImageSize.height,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              delay: index * 0.03,
            }}
            style={{
              left: "50%",
              zIndex: 10 + index,
            }}
          >
            <img
              src={image}
              alt={`Preview ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </motion.div>
        ))}

        {/* Folder Front */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[85%] origin-bottom rounded-[4px] bg-gradient-to-b from-amber-300 to-amber-400 shadow-sm dark:from-amber-400 dark:to-amber-500"
          animate={{
            rotateX: isHovered ? -45 : -25,
            scaleY: isHovered ? 0.8 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
          style={{
            transformStyle: "preserve-3d",
            zIndex: 20,
          }}
        >
          <div className="absolute top-1 right-1 left-1 h-px bg-amber-200/50 dark:bg-amber-300/50" />
        </motion.div>
      </motion.div>

      {/* Text */}
      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
        {text}
      </span>
    </Wrapper>
  );
}
