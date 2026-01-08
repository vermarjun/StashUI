"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ── type maps ──────────────────────────────────────────────────────────────

const BOOK_RADIUS_MAP = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
} as const;

const BOOK_SIZE_MAP = {
  sm: { width: "180px", spineTranslation: "152px" },
  md: { width: "220px", spineTranslation: "192px" },
  lg: { width: "260px", spineTranslation: "232px" },
  xl: { width: "300px", spineTranslation: "272px" },
} as const;

const BOOK_SHADOW_SIZE_MAP = {
  sm: "-5px 0 15px 5px var(--shadowColor)",
  md: "-7px 0 25px 7px var(--shadowColor)",
  lg: "-10px 0 35px 10px var(--shadowColor)",
  xl: "-12px 0 45px 12px var(--shadowColor)",
} as const;

const BOOK_COLOR_MAP = {
  slate: { from: "from-slate-900", to: "to-slate-700" },
  gray: { from: "from-gray-900", to: "to-gray-700" },
  zinc: { from: "from-zinc-900", to: "to-zinc-700" },
  neutral: { from: "from-neutral-900", to: "to-neutral-700" },
  stone: { from: "from-stone-900", to: "to-stone-700" },
  red: { from: "from-red-900", to: "to-red-700" },
  orange: { from: "from-orange-900", to: "to-orange-700" },
  amber: { from: "from-amber-900", to: "to-amber-700" },
  yellow: { from: "from-yellow-900", to: "to-yellow-700" },
  lime: { from: "from-lime-900", to: "to-lime-700" },
  green: { from: "from-green-900", to: "to-green-700" },
  emerald: { from: "from-emerald-900", to: "to-emerald-700" },
  teal: { from: "from-teal-900", to: "to-teal-700" },
  cyan: { from: "from-cyan-900", to: "to-cyan-700" },
  sky: { from: "from-sky-900", to: "to-sky-700" },
  blue: { from: "from-blue-900", to: "to-blue-700" },
  indigo: { from: "from-indigo-900", to: "to-indigo-700" },
  violet: { from: "from-violet-900", to: "to-violet-700" },
  purple: { from: "from-purple-900", to: "to-purple-700" },
  fuchsia: { from: "from-fuchsia-900", to: "to-fuchsia-700" },
  pink: { from: "from-pink-900", to: "to-pink-700" },
  rose: { from: "from-rose-900", to: "to-rose-700" },
} as const;

export type BookColor = keyof typeof BOOK_COLOR_MAP;
export type BookSize = keyof typeof BOOK_SIZE_MAP;
export type BookRadius = keyof typeof BOOK_RADIUS_MAP;
export type BookShadowSize = keyof typeof BOOK_SHADOW_SIZE_MAP;

// ── sub-components ─────────────────────────────────────────────────────────

export interface BookHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const BookHeader = React.forwardRef<HTMLDivElement, BookHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-wrap gap-2", className)} {...props}>
      {children}
    </div>
  ),
);
BookHeader.displayName = "BookHeader";

export interface BookTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const BookTitle = React.forwardRef<HTMLHeadingElement, BookTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn("mt-3 mb-1 font-bold text-balance select-none", className)}
      {...props}
    >
      {children}
    </h1>
  ),
);
BookTitle.displayName = "BookTitle";

export interface BookDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const BookDescription = React.forwardRef<HTMLParagraphElement, BookDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p ref={ref} className={cn("text-xs/relaxed select-none", className)} {...props}>
      {children}
    </p>
  ),
);
BookDescription.displayName = "BookDescription";

// ── main Book component ────────────────────────────────────────────────────

export interface BookProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number;
  color?: BookColor;
  isStatic?: boolean;
  size?: BookSize;
  radius?: BookRadius;
  shadowSize?: BookShadowSize;
}

export const Book = React.forwardRef<HTMLDivElement, BookProps>(
  (
    {
      className,
      children,
      duration = 1000,
      color = "zinc",
      isStatic = false,
      size = "md",
      radius = "md",
      shadowSize = "lg",
      ...props
    },
    ref,
  ) => {
    const gradient = BOOK_COLOR_MAP[color] ?? BOOK_COLOR_MAP.zinc;
    const sizeConfig = BOOK_SIZE_MAP[size];

    return (
      <div
        ref={ref}
        className={cn(
          "group z-10 w-min [--shadowColor:#bbb] perspective-midrange dark:[--shadowColor:#111]",
          className,
        )}
        {...props}
      >
        <div
          style={{
            width: sizeConfig.width,
            transition: `transform ${duration}ms ease`,
          }}
          className={cn(
            "relative aspect-3/4 transform-3d",
            isStatic
              ? "transform-[rotateY(-30deg)]"
              : "transform-[rotateY(0deg)] group-hover:transform-[rotateY(-30deg)]",
            BOOK_RADIUS_MAP[radius],
          )}
        >
          {/* Front face */}
          <div
            className={cn(
              "absolute inset-y-0 left-0 flex size-full flex-col justify-end overflow-hidden bg-linear-to-tr p-6 text-white",
              gradient.from,
              gradient.to,
              BOOK_RADIUS_MAP[radius],
            )}
            style={{
              transform: "translateZ(25px)",
              boxShadow: "5px 5px 20px var(--shadowColor)",
            }}
          >
            {/* Spine highlight overlay */}
            <div
              className="absolute top-0 left-0 h-full"
              style={{
                minWidth: "8.2%",
                background:
                  "linear-gradient(90deg, hsla(0,0%,100%,0), hsla(0,0%,100%,0) 12%, hsla(0,0%,100%,.25) 29.25%, hsla(0,0%,100%,0) 50.5%, hsla(0,0%,100%,0) 75.25%, hsla(0,0%,100%,.25) 91%, hsla(0,0%,100%,0)), linear-gradient(90deg, rgba(0,0,0,.03), rgba(0,0,0,.1) 12%, transparent 30%, rgba(0,0,0,.02) 50%, rgba(0,0,0,.2) 73.5%, rgba(0,0,0,.5) 75.25%, rgba(0,0,0,.15) 85.25%, transparent)",
                opacity: 0.2,
              }}
            />
            <div className="pl-1">{children}</div>
          </div>

          {/* Spine */}
          <div
            className="absolute left-0 bg-white"
            style={{
              top: "3px",
              bottom: "3px",
              width: "48px",
              transform: `translateX(${sizeConfig.spineTranslation}) rotateY(90deg)`,
              background:
                "linear-gradient(90deg, rgba(255,255,255,1) 50%, rgba(249,249,249,1) 50%)",
            }}
          />

          {/* Back face */}
          <div
            className={cn(
              "absolute inset-y-0 left-0 flex size-full flex-col justify-end overflow-hidden bg-linear-to-tr p-6 text-white",
              gradient.from,
              gradient.to,
              BOOK_RADIUS_MAP[radius],
            )}
            style={{
              transform: "translateZ(-25px)",
              boxShadow: BOOK_SHADOW_SIZE_MAP[shadowSize],
            }}
          />
        </div>
      </div>
    );
  },
);
Book.displayName = "Book";
