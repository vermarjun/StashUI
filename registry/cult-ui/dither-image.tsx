"use client"

/**
 * `DitherImage`: compound figure that applies a CSS-only Bayer dither effect
 * to an image via the `dither-plugin` Tailwind utility. Safari-compatible (no
 * SVG filters), fully static (no JS runtime cost), and respects all the
 * plugin's tunable CSS custom properties as typed props.
 *
 * ## Installation
 *
 * ```bash
 * bun add dither-plugin
 * # or: npm install dither-plugin
 * # or: pnpm add dither-plugin
 * # or: yarn add dither-plugin
 * ```
 *
 * Then register the plugin in your Tailwind v4 stylesheet (alongside
 * `tailwindcss`):
 *
 * ```css
 * @import "tailwindcss";
 * @import "dither-plugin";
 * ```
 *
 * ## Usage
 *
 * ```tsx
 * <DitherImage>
 *   <DitherImageFrame aspectRatio="square" size="md">
 *     <DitherImageContent
 *       src="/images/apple-wallpaper.jpg"
 *       alt="Apple wallpaper"
 *       fill
 *       sizes="(min-width: 768px) 33vw, 100vw"
 *     />
 *   </DitherImageFrame>
 *   <DitherImageCaption>Apple wallpaper, dithered</DitherImageCaption>
 * </DitherImage>
 * ```
 *
 * Partial dither (masked clean layer + optional `invertOnDark`):
 *
 * ```tsx
 * <DitherImageReveal className="size-72 overflow-hidden rounded-xl">
 *   <DitherImageFrame invertOnDark size="lg" aspectRatio="square">
 *     <DitherImageContent src="/photo.jpg" alt="" fill sizes="288px" />
 *   </DitherImageFrame>
 *   <DitherImageOverlay src="/photo.jpg" alt="" fill sizes="288px" from={0} to={65} />
 * </DitherImageReveal>
 * ```
 *
 * ## Notes
 *
 * - The dither class must live on a **wrapper** around the image. The plugin
 *   paints the dot matrix via a `::after` pseudo-element, which `<img>` /
 *   `<video>` elements do not render.
 * - The wrapper applies `filter: grayscale() brightness() blur() contrast()`
 *   to all children. Render captions / overlay text **outside** the
 *   `DitherImageFrame` (as `DitherImageCaption` does) so they stay crisp.
 * - `background: #000` ships from the plugin to give the `screen` blend-mode
 *   something to lift against. Override with an inline background if needed.
 *
 * @see https://github.com/flornkm/dither-plugin
 */
import {
  createContext,
  forwardRef,
  useContext,
  type ComponentProps,
  type CSSProperties,
  type HTMLAttributes,
} from "react"


import { cn } from "@/lib/utils"

/**
 * Plain-<img> props (universal React, no next/image). `fill` makes the image
 * cover its positioned parent, mirroring next/image's `fill`.
 */
export type ImageProps = Omit<ComponentProps<"img">, "src" | "alt"> & {
  src: string
  alt: string
  fill?: boolean
  priority?: boolean
  quality?: number
}

function toImgProps({ fill, priority, quality: _quality, className, ...rest }: ImageProps) {
  return {
    ...rest,
    loading: priority ? ("eager" as const) : rest.loading,
    className: cn(fill && "absolute inset-0 h-full w-full", className),
  }
}

/*
 * The dither surface CSS from `dither-plugin` (MIT, flornkm), inlined so the
 * component is self-contained and needs no Tailwind plugin registration.
 */
const DITHER_IMAGE_URL =
  "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAu0lEQVQ4T6WSMQqFMBBEE2wDXiVgG8gtglilCuIpcoogVqlEPIVgK3gVIa2Qzw9YbIpttlqGgbcMM5wxlr33LMbI/nccx3I/PQwD0LXPj+OgAaSUBWCtLZ+2bSv308uyAF37/HkeGkAIASL0fQ8yT9MEdO3z67poAKUUiDDPM8i87zvQtc/f96UBmqZBazTG4Ds4z5MG6LoOrTGEgO8gpUQDtG2L1uicw3dw3zcNoLVGa1zXFd9BzpkE+AFp94/4eKx9+AAAAABJRU5ErkJggg==)"

const DITHER_CSS = `.stashui-dither{--dither-gray:1;--dither-contrast:120;--dither-bright:1;--dither-blur:0px;--dither-opacity:1;--dither-image:${DITHER_IMAGE_URL};position:relative;isolation:isolate;overflow:hidden;z-index:0;background:#000;filter:grayscale(var(--dither-gray)) brightness(var(--dither-bright)) blur(var(--dither-blur)) contrast(var(--dither-contrast))}.stashui-dither::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:1;background-image:var(--dither-image);background-repeat:repeat;background-size:var(--dither-cell) var(--dither-cell);background-position:0 0;image-rendering:pixelated;opacity:var(--dither-opacity);mix-blend-mode:screen}`

/** Cell size of the underlying dither matrix: maps to plugin `--dither-cell-*` theme tokens. */
export type DitherSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

const NUMERIC_SIZE_RE = /^\d+$/

const DITHER_CELL: Record<DitherSize, string> = {
  xs: "8px",
  sm: "12px",
  md: "16px",
  lg: "20px",
  xl: "28px",
  "2xl": "40px",
}

/** Shorthand aspect-ratio values; pass any valid `aspect-ratio` string for custom. */
export type DitherAspectRatio =
  | "square"
  | "video"
  | "portrait"
  | "wide"
  | (string & {})
  | number

function resolveAspectRatio(ratio: DitherAspectRatio): string {
  if (typeof ratio === "number") {
    return String(ratio)
  }
  if (ratio === "square") {
    return "1 / 1"
  }
  if (ratio === "video") {
    return "16 / 9"
  }
  if (ratio === "portrait") {
    return "3 / 4"
  }
  if (ratio === "wide") {
    return "21 / 9"
  }
  return ratio
}

/** CSS custom properties exposed by `dither-plugin`. Numbers are used directly by the plugin's `filter`. */
interface DitherVars {
  "--dither-gray"?: number | string
  "--dither-contrast"?: number | string
  "--dither-bright"?: number | string
  "--dither-blur"?: string
  "--dither-cell"?: string
  "--dither-opacity"?: number | string
  "--dither-image"?: string
}

/* ─── Frame context (invert on dark) ───────────────────────────────────── */

const DitherImageFrameContext = createContext<{ invertOnDark: boolean } | null>(
  null
)

/* ─── Root figure ──────────────────────────────────────────────────────── */

export type DitherImageProps = ComponentProps<"figure">

/**
 * `<figure>` wrapper grouping a dithered frame with its caption. Stays
 * unfiltered so child captions read at full fidelity.
 */
const DitherImage = forwardRef<HTMLElement, DitherImageProps>(
  function DitherImage({ className, ...props }, ref) {
    return (
      <figure
        className={cn("inline-flex flex-col gap-3", className)}
        data-slot="dither-image"
        ref={ref}
        {...props}
      />
    )
  }
)
DitherImage.displayName = "DitherImage"

/* ─── Frame (the dither surface) ───────────────────────────────────────── */

export interface DitherImageFrameProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
  /** Cell size: maps to `dither-{size}` utility. Defaults to `lg` (matches the plugin's bare `dither` class). */
  size?: DitherSize
  /** Shorthand: `"square" | "video" | "portrait" | "wide"` or any valid `aspect-ratio` string. */
  aspectRatio?: DitherAspectRatio
  /** `--dither-gray` (0 = color, 1 = grayscale). Default `1`. */
  grayscale?: number
  /** `--dither-contrast`: unitless CSS `contrast()` value. Plugin default `120` (crushes to 1-bit). */
  contrast?: number
  /** `--dither-bright`: unitless CSS `brightness()` value. Default `1`. */
  brightness?: number
  /** `--dither-blur`: accepts a number (px) or any CSS length. Default `0`. */
  blur?: number | string
  /** `--dither-opacity`: dot-pattern overlay opacity (0–1). Default `1`. */
  opacity?: number
  /** Round the frame corners. `true` uses `rounded-xl`; pass a string for a custom class. */
  rounded?: boolean | string
  /**
   * Wrap the dither surface in `dark:invert` and counter-invert the image in
   * dark mode so the dither dots read correctly while photo colors stay true.
   */
  invertOnDark?: boolean
  /** Merged with generated CSS variables; your values take precedence. */
  style?: CSSProperties & DitherVars
}

/**
 * The element that actually wears the dither class. Must be a direct parent
 * of the `<img>`/`<video>`: the plugin paints via `::after` which media
 * elements don't support.
 */
const DitherImageFrame = forwardRef<HTMLDivElement, DitherImageFrameProps>(
  function DitherImageFrame(
    {
      className,
      size = "lg",
      aspectRatio,
      grayscale,
      contrast,
      brightness,
      blur,
      opacity,
      rounded = true,
      invertOnDark = false,
      style,
      ...props
    },
    ref
  ) {
    const vars: CSSProperties & DitherVars = {
      "--dither-cell": DITHER_CELL[size],
      ...style,
    }

    if (grayscale !== undefined) {
      vars["--dither-gray"] = grayscale
    }
    if (contrast !== undefined) {
      vars["--dither-contrast"] = contrast
    }
    if (brightness !== undefined) {
      vars["--dither-bright"] = brightness
    }
    if (blur !== undefined) {
      vars["--dither-blur"] = typeof blur === "number" ? `${blur}px` : blur
    }
    if (opacity !== undefined) {
      vars["--dither-opacity"] = opacity
    }
    if (aspectRatio !== undefined && vars.aspectRatio === undefined) {
      vars.aspectRatio = resolveAspectRatio(aspectRatio)
    }

    let roundedClass: string | undefined
    if (rounded === true) {
      roundedClass = "rounded-xl"
    } else if (typeof rounded === "string") {
      roundedClass = rounded
    }

    const frame = (
      <div
        className={cn(
          "stashui-dither",
          "relative block w-full",
          roundedClass,
          className
        )}
        data-size={size}
        data-slot="dither-image-frame"
        ref={ref}
        style={vars}
        {...props}
      />
    )

    return (
      <DitherImageFrameContext.Provider value={{ invertOnDark }}>
        <style>{DITHER_CSS}</style>
        {invertOnDark ? <div className="dark:invert">{frame}</div> : frame}
      </DitherImageFrameContext.Provider>
    )
  }
)
DitherImageFrame.displayName = "DitherImageFrame"

/* ─── Reveal stage ─────────────────────────────────────────────────────── */

export type DitherImageRevealProps = ComponentProps<"div"> & {
  /** Tailwind size shorthand (`72` → `size-72`). Non-numeric strings are applied as extra classes. */
  size?: number | string
}

/**
 * Positioning stage for partial dither: stacks the dithered frame with a
 * masked clean `DitherImageOverlay` as siblings inside `relative overflow-hidden`.
 */
const DitherImageReveal = forwardRef<HTMLDivElement, DitherImageRevealProps>(
  function DitherImageReveal({ className, size, ...props }, ref) {
    let sizeClass: string | undefined
    if (size !== undefined) {
      if (typeof size === "number") {
        sizeClass = `size-${size}`
      } else if (NUMERIC_SIZE_RE.test(size)) {
        sizeClass = `size-${size}`
      } else {
        sizeClass = size
      }
    }

    return (
      <div
        className={cn("relative overflow-hidden", sizeClass, className)}
        data-slot="dither-image-reveal"
        ref={ref}
        {...props}
      />
    )
  }
)
DitherImageReveal.displayName = "DitherImageReveal"

/* ─── Overlay (masked clean copy) ─────────────────────────────────────── */

export type DitherRevealDirection =
  | "l"
  | "r"
  | "t"
  | "b"
  /** Top-left → bottom-right diagonal (clean top-left). */
  | "tl-br"
  /** Top-right → bottom-left diagonal (clean top-right). */
  | "tr-bl"
  /** Bottom-left → top-right diagonal (clean bottom-left). */
  | "bl-tr"
  /** Bottom-right → top-left diagonal (clean bottom-right). */
  | "br-tl"
  | "radial"

export type DitherImageOverlayProps = Omit<ImageProps, "style"> & {
  /**
   * Mask axis: clean image strongest where the gradient starts.
   * Axis-aligned: `l` | `r` | `t` | `b`; diagonals: `tl-br` | `tr-bl` | `bl-tr` | `br-tl`; `radial`.
   * Default `"r"` (clean left → dither right).
   */
  direction?: DitherRevealDirection
  /** Mask start % (0–100). Default `0`. */
  from?: number
  /** Mask end % (0–100). Default `65`. */
  to?: number
  /** Overrides typed mask utilities: use Tailwind `mask-*` classes or arbitrary values. */
  maskClassName?: string
  style?: CSSProperties
}

function revealMaskImage(
  direction: DitherRevealDirection,
  from: number,
  to: number
): string {
  const a = Math.min(from, to)
  const b = Math.max(from, to)
  switch (direction) {
    case "r":
      return `linear-gradient(to right, black ${a}%, transparent ${b}%)`
    case "l":
      return `linear-gradient(to left, black ${a}%, transparent ${b}%)`
    case "t":
      return `linear-gradient(to bottom, black ${a}%, transparent ${b}%)`
    case "b":
      return `linear-gradient(to top, black ${a}%, transparent ${b}%)`
    case "tl-br":
      return `linear-gradient(to bottom right, black ${a}%, transparent ${b}%)`
    case "tr-bl":
      return `linear-gradient(to bottom left, black ${a}%, transparent ${b}%)`
    case "bl-tr":
      return `linear-gradient(to top right, black ${a}%, transparent ${b}%)`
    case "br-tl":
      return `linear-gradient(to top left, black ${a}%, transparent ${b}%)`
    case "radial":
      return `radial-gradient(circle at center, black ${a}%, transparent ${b}%)`
    default: {
      const _never: never = direction
      return _never
    }
  }
}

function revealMaskStyle(
  direction: DitherRevealDirection,
  from: number,
  to: number
): CSSProperties {
  const img = revealMaskImage(direction, from, to)
  return {
    WebkitMaskImage: img,
    maskImage: img,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
  }
}

/**
 * Absolutely positioned clean copy of the image, masked so the dithered
 * layer underneath shows through where the mask is transparent.
 */
const DitherImageOverlay = forwardRef<
  HTMLImageElement,
  DitherImageOverlayProps
>(function DitherImageOverlay(
  {
    className,
    direction = "r",
    from = 0,
    to = 65,
    maskClassName,
    style,
    ...props
  },
  ref
) {
  const typedMaskStyle =
    maskClassName === undefined ? revealMaskStyle(direction, from, to) : {}

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...toImgProps(props)}
      alt={props.alt}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full object-cover",
        maskClassName,
        className
      )}
      data-slot="dither-image-overlay"
      ref={ref}
      style={{ ...typedMaskStyle, ...style }}
    />
  )
})
DitherImageOverlay.displayName = "DitherImageOverlay"

/* ─── Image content ────────────────────────────────────────────────────── */

export type DitherImageContentProps = ImageProps

/**
 * Plain `<img>` tuned for a `DitherImageFrame`. Fills the frame by default; pass
 * `width`/`height` explicitly for intrinsic sizing (and drop `fill`).
 */
const DitherImageContent = forwardRef<
  HTMLImageElement,
  DitherImageContentProps
>(function DitherImageContent({ className, alt, ...props }, ref) {
  const ctx = useContext(DitherImageFrameContext)
  const counterInvert = ctx?.invertOnDark === true ? "dark:invert" : undefined

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...toImgProps({ alt, ...props })}
      alt={alt}
      className={cn(
        "block h-full w-full object-cover",
        props.fill && "absolute inset-0",
        counterInvert,
        className
      )}
      data-slot="dither-image-content"
      ref={ref}
    />
  )
})
DitherImageContent.displayName = "DitherImageContent"

/* ─── Caption ──────────────────────────────────────────────────────────── */

export type DitherImageCaptionProps = ComponentProps<"figcaption">

/**
 * `<figcaption>` sibling to the frame. Renders **outside** the filtered
 * surface so text stays crisp and fully readable.
 */
const DitherImageCaption = forwardRef<HTMLElement, DitherImageCaptionProps>(
  function DitherImageCaption({ className, ...props }, ref) {
    return (
      <figcaption
        className={cn(
          "text-pretty text-muted-foreground text-sm leading-relaxed",
          className
        )}
        data-slot="dither-image-caption"
        ref={ref}
        {...props}
      />
    )
  }
)
DitherImageCaption.displayName = "DitherImageCaption"

export {
  DitherImage,
  DitherImageCaption,
  DitherImageContent,
  DitherImageFrame,
  DitherImageOverlay,
  DitherImageReveal,
}
