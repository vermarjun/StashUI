"use client"

import type * as React from "react"
import type { ReactNode } from "react"
import { useId } from "react"

import { cn } from "@/lib/utils"

export interface FluidRenderingProps
  extends Omit<React.ComponentProps<"svg">, "width" | "height"> {
  width?: number
  height?: number
  // Colors
  cardFill?: string
  cardStroke?: string
  browserDotColor?: string
  placeholderFill?: string
  placeholderStroke?: string
  dashedStroke?: string
  imagePlaceholderFill?: string
  // Line colors
  lineColorTeal?: string
  lineColorBlue?: string
  lineColorOrange?: string
  lineColorRed?: string
  // Connector
  connectorFill?: string
  connectorStroke?: string
  connectorLineColor?: string
  // Logo
  logoColor?: string
  // Text color for destination cards
  textColor?: string
  mutedTextColor?: string
  // Custom icons for destination cards
  topIcon?: ReactNode
  upperMidIcon?: ReactNode
  lowerMidIcon?: ReactNode
  bottomIcon?: ReactNode
}

export function FluidRenderingBagIcon(props: React.ComponentProps<"path">) {
  return (
    <path
      clipRule="evenodd"
      d="M325 13V12.5C325 10.84 326.34 9.5 328 9.5C329.66 9.5 331 10.84 331 12.5V13H333.5C334.05 13 334.5 13.45 334.5 14V25C334.5 26.1 333.6 27 332.5 27H323.5C322.4 27 321.5 26.1 321.5 25V14C321.5 13.45 321.95 13 322.5 13H325ZM326.4 13H329.6V12.5C329.6 11.62 328.88 10.9 328 10.9C327.12 10.9 326.4 11.62 326.4 12.5V13Z"
      data-slot="fluid-rendering-bag-icon"
      fillRule="evenodd"
      {...props}
    />
  )
}

export function FluidRenderingHexIcon(props: React.ComponentProps<"path">) {
  return (
    <path
      clipRule="evenodd"
      d="M328 62.6L334.1 66.1V73.1L328 76.6L321.9 73.1V66.1L328 62.6ZM328 67.1C326.62 67.1 325.5 68.22 325.5 69.6C325.5 70.98 326.62 72.1 328 72.1C329.38 72.1 330.5 70.98 330.5 69.6C330.5 68.22 329.38 67.1 328 67.1Z"
      data-slot="fluid-rendering-hex-icon"
      fillRule="evenodd"
      {...props}
    />
  )
}

export function FluidRenderingLayersIcon(props: React.ComponentProps<"path">) {
  return (
    <path
      d="M328 115.4L335 119L328 122.6L321 119L328 115.4ZM322.6 121.7L328 124.5L333.4 121.7L335 122.5L328 126.1L321 122.5L322.6 121.7ZM322.6 125.2L328 128L333.4 125.2L335 126L328 129.6L321 126L322.6 125.2Z"
      data-slot="fluid-rendering-layers-icon"
      {...props}
    />
  )
}

export function FluidRenderingStoreIcon(props: React.ComponentProps<"path">) {
  return (
    <path
      d="M331.35 167.34C332 167.34 332.62 167.63 333.03 168.13L334.06 169.36C334.38 169.75 334.56 170.24 334.56 170.76V179.59H321.44V170.76C321.44 170.31 321.58 169.87 321.83 169.51L321.94 169.36L322.97 168.13C323.38 167.63 324 167.34 324.65 167.34H331.35ZM329.97 172.57C329.49 173.12 328.79 173.46 328 173.46C327.22 173.46 326.51 173.12 326.03 172.57C325.55 173.12 324.85 173.46 324.06 173.46C323.58 173.46 323.14 173.33 322.75 173.11V178.28H326.25V176.96C326.25 176 327.03 175.21 328 175.21C328.97 175.21 329.75 176 329.75 176.96V178.28H333.25V173.11C332.86 173.33 332.42 173.46 331.94 173.46C331.15 173.46 330.45 173.12 329.97 172.57ZM328 176.53C327.76 176.53 327.56 176.72 327.56 176.96V178.28H328.44V176.96C328.44 176.72 328.24 176.53 328 176.53ZM324.65 168.65C324.39 168.65 324.14 168.77 323.98 168.97L322.95 170.2C322.82 170.35 322.75 170.55 322.75 170.76V170.84C322.75 171.56 323.34 172.15 324.06 172.15C324.79 172.15 325.38 171.56 325.38 170.84H326.69C326.69 171.56 327.28 172.15 328 172.15C328.73 172.15 329.31 171.56 329.31 170.84H330.63C330.63 171.56 331.21 172.15 331.94 172.15C332.66 172.15 333.25 171.56 333.25 170.84V170.76C333.25 170.55 333.18 170.35 333.05 170.2L332.02 168.97C331.86 168.77 331.61 168.65 331.35 168.65H324.65Z"
      data-slot="fluid-rendering-store-icon"
      {...props}
    />
  )
}

export function FluidRendering({
  width = 448,
  height = 195,
  cardFill = "var(--card)",
  cardStroke = "var(--border)",
  browserDotColor = "color-mix(in oklab, var(--foreground) 12%, transparent)",
  placeholderFill = "var(--card)",
  placeholderStroke = "var(--border)",
  dashedStroke = "color-mix(in oklab, var(--muted-foreground) 35%, transparent)",
  imagePlaceholderFill = "var(--muted)",
  lineColorTeal = "#45DEC4",
  lineColorBlue = "#52AEFF",
  lineColorOrange = "#FFB224",
  lineColorRed = "#E5484D",
  connectorFill = "var(--card)",
  connectorStroke = "var(--border)",
  connectorLineColor = "color-mix(in oklab, var(--muted-foreground) 60%, transparent)",
  logoColor = "var(--card-foreground)",
  textColor = "var(--foreground)",
  mutedTextColor = "var(--muted-foreground)",
  topIcon,
  upperMidIcon,
  lowerMidIcon,
  bottomIcon,
  className,
  ...props
}: FluidRenderingProps) {
  const idBase = useId().replaceAll(":", "")
  const shadowFilterId = `${idBase}-fluid-rendering-shadow`
  const imgMaskId = `${idBase}-img-mask`

  return (
    <svg
      className={cn(className)}
      data-slot="fluid-rendering"
      fill="none"
      height={height}
      viewBox="0 0 448 195"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Fluid rendering flow illustration</title>
      {/* Shadow filter */}
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="210"
          id={shadowFilterId}
          width="470"
          x="-10"
          y="0"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            mode="normal"
            result="shape"
          />
          <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="1" />
        </filter>
      </defs>

      {/* Shadow elements */}
      <g
        data-slot="fluid-rendering-shadow-layer"
        filter={`url(#${shadowFilterId})`}
        opacity="0.04"
      >
        <rect
          fill="black"
          height="130.39"
          rx="12"
          width="163"
          x="2"
          y="32.67"
        />
        <path
          d="M191 76.76C191 70.14 196.37 64.76 203 64.76H245C251.63 64.76 257 70.14 257 76.76V118.96C257 125.59 251.63 130.96 245 130.96H203C196.37 130.96 191 125.59 191 118.96V76.76Z"
          fill="black"
        />
        <path
          d="M313 166.04C313 161.62 316.58 158.04 321 158.04H438C442.42 158.04 446 161.62 446 166.04V185C446 189.42 442.42 193 438 193H321C316.58 193 313 189.42 313 185V166.04Z"
          fill="black"
        />
        <path
          d="M313 114.89C313 110.47 316.58 106.89 321 106.89H438C442.42 106.89 446 110.47 446 114.89V133.85C446 138.27 442.42 141.85 438 141.85H321C316.58 141.85 313 138.27 313 133.85V114.89Z"
          fill="black"
        />
        <path
          d="M313 62.16C313 57.74 316.58 54.16 321 54.16H438C442.42 54.16 446 57.74 446 62.16V81.12C446 85.53 442.42 89.12 438 89.12H321C316.58 89.12 313 85.53 313 81.12V62.16Z"
          fill="black"
        />
        <path
          d="M313 11.01C313 6.59 316.58 3.01 321 3.01H438C442.42 3.01 446 6.59 446 11.01V29.96C446 34.38 442.42 37.96 438 37.96H321C316.58 37.96 313 34.38 313 29.96V11.01Z"
          fill="black"
        />
      </g>

      {/* Browser card */}
      <rect
        fill={cardFill}
        height="131"
        rx="12.5"
        width="164"
        x="1.5"
        y="30.5"
      />
      <rect
        height="131"
        rx="12.5"
        stroke={cardStroke}
        width="164"
        x="1.5"
        y="30.5"
      />

      {/* Browser dots */}
      <circle cx="15.06" cy="43.76" fill={browserDotColor} r="3.26" />
      <circle cx="24.86" cy="43.76" fill={browserDotColor} r="3.26" />
      <circle cx="34.65" cy="43.76" fill={browserDotColor} r="3.26" />

      {/* Dashed rectangle - top */}
      <rect
        fill="none"
        height="28.16"
        rx="1.12"
        stroke={dashedStroke}
        strokeDasharray="3.24 3.24"
        width="70.28"
        x="82.78"
        y="77.18"
      />

      {/* Solid rectangle - bottom */}
      <rect
        fill="none"
        height="28.16"
        rx="1.12"
        stroke={placeholderStroke}
        width="70.28"
        x="82.78"
        y="112.82"
      />

      {/* Navigation bar (dashed) */}
      <rect
        fill="none"
        height="15.2"
        rx="1.12"
        stroke={dashedStroke}
        strokeDasharray="3.24 3.24"
        width="141.56"
        x="12.5"
        y="54.5"
      />

      {/* Nav items */}
      <rect
        fill={placeholderFill}
        height="8.72"
        rx="1.12"
        stroke={placeholderStroke}
        width="28.16"
        x="15.74"
        y="57.74"
      />
      <rect
        fill={placeholderFill}
        height="5.48"
        rx="1.12"
        stroke={placeholderStroke}
        width="11.96"
        x="90.26"
        y="59.36"
      />
      <rect
        fill={placeholderFill}
        height="5.48"
        rx="1.12"
        stroke={placeholderStroke}
        width="11.96"
        x="106.46"
        y="59.36"
      />
      <rect
        fill={placeholderFill}
        height="5.48"
        rx="1.12"
        stroke={placeholderStroke}
        width="11.96"
        x="122.66"
        y="59.36"
      />
      <rect
        fill={imagePlaceholderFill}
        height="6.48"
        rx="1.62"
        width="12.96"
        x="138.36"
        y="58.86"
      />
      <rect
        fill="none"
        height="5.48"
        rx="1.12"
        stroke={dashedStroke}
        width="11.96"
        x="138.86"
        y="59.36"
      />

      {/* Image placeholder area */}
      <rect
        fill="none"
        height="63.8"
        rx="1.12"
        stroke={placeholderStroke}
        width="63.8"
        x="12.5"
        y="77.18"
      />
      <rect
        fill={imagePlaceholderFill}
        height="56.7"
        rx="1.62"
        width="56.7"
        x="16.05"
        y="80.73"
      />

      {/* Image placeholder icon (mountains/sun) */}
      <mask
        height="51"
        id={imgMaskId}
        maskUnits="userSpaceOnUse"
        style={{ maskType: "alpha" }}
        width="57"
        x="16"
        y="87"
      >
        <rect
          fill="#F2F2F2"
          height="50.22"
          rx="1.62"
          width="56.7"
          x="16.05"
          y="87.21"
        />
      </mask>
      <g mask={`url(#${imgMaskId})`}>
        <path
          d="M31.43 121.54L29.31 119.7C28.12 118.68 26.34 118.77 25.26 119.91L12.79 133.15C11.03 135.02 12.36 138.08 14.93 138.08H74.7C77.25 138.08 78.58 135.05 76.85 133.17L52.54 106.79C51.36 105.51 49.33 105.53 48.18 106.84L35.55 121.25C34.49 122.46 32.65 122.59 31.43 121.54Z"
          fill={cardFill}
        />
        <circle cx="27.77" cy="104.39" fill={cardFill} r="5.86" />
      </g>

      {/* Content placeholders - right side of image */}
      <rect
        fill={placeholderFill}
        height="5.48"
        rx="1.12"
        stroke={placeholderStroke}
        width="18.44"
        x="87.83"
        y="81.23"
      />
      <rect
        fill={placeholderFill}
        height="5.48"
        rx="1.12"
        stroke={placeholderStroke}
        width="18.44"
        x="87.83"
        y="116.87"
      />
      <rect
        fill={placeholderFill}
        height="2.24"
        rx="1.12"
        stroke={placeholderStroke}
        width="41.12"
        x="87.83"
        y="90.95"
      />
      <rect
        fill={placeholderFill}
        height="2.24"
        rx="1.12"
        stroke={placeholderStroke}
        width="41.12"
        x="87.83"
        y="126.59"
      />
      <rect
        fill={imagePlaceholderFill}
        height="3.24"
        rx="1.62"
        width="25.92"
        x="87.33"
        y="96.93"
      />
      <rect
        fill="none"
        height="2.24"
        rx="1.12"
        stroke={dashedStroke}
        width="24.92"
        x="87.83"
        y="97.43"
      />
      <rect
        fill={imagePlaceholderFill}
        height="3.24"
        rx="1.62"
        width="25.92"
        x="87.33"
        y="132.57"
      />
      <rect
        fill={placeholderFill}
        height="2.24"
        rx="1.12"
        stroke={placeholderStroke}
        width="24.92"
        x="87.83"
        y="133.07"
      />

      {/* Connection lines */}
      <path
        d="M244 95.86L276 95.86C282.63 95.86 288 101.23 288 107.86V161.09C288 167.72 293.37 173.09 300 173.09C316.05 173.09 330.36 173.09 330.36 173.09"
        stroke={lineColorTeal}
        strokeWidth="2"
      />
      <path
        d="M244 95.86L276 95.86C282.63 95.86 288 90.48 288 83.86V30.63C288 24 293.37 18.63 300 18.63C316.05 18.63 330.36 18.63 330.36 18.63"
        stroke={lineColorBlue}
        strokeWidth="2"
      />
      <path
        d="M243.59 95.86L276 95.86C282.63 95.86 288 101.23 288 107.86V111.94C288 117.46 292.48 121.94 298 121.94C314.75 121.94 329.98 121.94 329.98 121.94"
        stroke={lineColorOrange}
        strokeWidth="2"
      />
      <path
        d="M243.59 95.86L276 95.86C282.63 95.86 288 90.49 288 83.86V79.78C288 74.26 292.48 69.78 298 69.78C314.75 69.78 329.98 69.78 329.98 69.78"
        stroke={lineColorRed}
        strokeWidth="2"
      />

      {/* Connector line */}
      <path
        d="M166.05 95.86H191.35"
        stroke={connectorLineColor}
        strokeWidth="1.63"
      />

      {/* Center render card */}
      <path
        d="M245 62.35C251.85 62.35 257.41 67.91 257.41 74.76V116.96C257.41 123.81 251.85 129.36 245 129.36H203C196.15 129.36 190.59 123.81 190.59 116.96V74.76C190.59 67.91 196.15 62.35 203 62.35H245Z"
        fill={cardFill}
      />
      <path
        d="M245 62.35C251.85 62.35 257.41 67.91 257.41 74.76V116.96C257.41 123.81 251.85 129.36 245 129.36H203C196.15 129.36 190.59 123.81 190.59 116.96V74.76C190.59 67.91 196.15 62.35 203 62.35H245Z"
        stroke={cardStroke}
        strokeWidth="0.82"
      />

      {/* Render mark: four-square grid with an accent tile */}
      <rect fill={logoColor} height="8" rx="2" width="8" x="214.5" y="86.36" />
      <rect fill={logoColor} height="8" rx="2" width="8" x="225.5" y="86.36" />
      <rect fill={logoColor} height="8" rx="2" width="8" x="214.5" y="97.36" />
      <rect
        fill="none"
        height="7"
        rx="1.5"
        stroke={logoColor}
        width="7"
        x="226"
        y="97.86"
      />

      {/* Destination card 4 - Bottom (web store) */}
      <path
        d="M438 155.54C442.69 155.54 446.5 159.34 446.5 164.04V182.99C446.5 187.69 442.69 191.49 438 191.49H321C316.31 191.49 312.5 187.69 312.5 182.99V164.04C312.5 159.34 316.31 155.54 321 155.54H438Z"
        fill={cardFill}
      />
      <path
        d="M438 155.54C442.69 155.54 446.5 159.34 446.5 164.04V182.99C446.5 187.69 442.69 191.49 438 191.49H321C316.31 191.49 312.5 187.69 312.5 182.99V164.04C312.5 159.34 316.31 155.54 321 155.54H438Z"
        stroke={cardStroke}
      />

      {/* Store icon */}
      {bottomIcon ? (
        <g
          data-slot="fluid-rendering-card-icon-custom"
          transform="translate(321 167)"
        >
          {bottomIcon}
        </g>
      ) : (
        <FluidRenderingStoreIcon fill={lineColorTeal} />
      )}
      <text
        fill={mutedTextColor}
        fontFamily="system-ui, sans-serif"
        fontSize="9"
        x="340"
        y="175"
      >
        Web Store
      </text>
      <circle
        cx="312.27"
        cy="173.04"
        fill={connectorFill}
        r="3.77"
        stroke={connectorStroke}
      />

      {/* Destination card 3 - Lower Mid (CMS) */}
      <path
        d="M438 104.38C442.69 104.38 446.5 108.19 446.5 112.88V131.84C446.5 136.54 442.69 140.34 438 140.34H321C316.31 140.34 312.5 136.54 312.5 131.84V112.88C312.5 108.19 316.31 104.38 321 104.38H438Z"
        fill={cardFill}
      />
      <path
        d="M438 104.38C442.69 104.38 446.5 108.19 446.5 112.88V131.84C446.5 136.54 442.69 140.34 438 140.34H321C316.31 140.34 312.5 136.54 312.5 131.84V112.88C312.5 108.19 316.31 104.38 321 104.38H438Z"
        stroke={cardStroke}
      />

      {/* Layers mark */}
      {lowerMidIcon ? (
        <g
          data-slot="fluid-rendering-card-icon-custom"
          transform="translate(321 117)"
        >
          {lowerMidIcon}
        </g>
      ) : (
        <FluidRenderingLayersIcon fill={lineColorOrange} />
      )}
      <text
        fill={mutedTextColor}
        fontFamily="system-ui, sans-serif"
        fontSize="9"
        x="340"
        y="125"
      >
        CMS
      </text>
      <circle
        cx="312.5"
        cy="121.88"
        fill={connectorFill}
        r="3.77"
        stroke={connectorStroke}
      />

      {/* Destination card 2 - Upper Mid (commerce API) */}
      <path
        d="M438 51.65C442.69 51.65 446.5 55.46 446.5 60.15V79.11C446.5 83.8 442.69 87.61 438 87.61H321C316.31 87.61 312.5 83.8 312.5 79.11V60.15C312.5 55.46 316.31 51.65 321 51.65H438Z"
        fill={cardFill}
      />
      <path
        d="M438 51.65C442.69 51.65 446.5 55.46 446.5 60.15V79.11C446.5 83.8 442.69 87.61 438 87.61H321C316.31 87.61 312.5 83.8 312.5 79.11V60.15C312.5 55.46 316.31 51.65 321 51.65H438Z"
        stroke={cardStroke}
      />

      {/* Hexagon mark */}
      {upperMidIcon ? (
        <g
          data-slot="fluid-rendering-card-icon-custom"
          transform="translate(321 62)"
        >
          {upperMidIcon}
        </g>
      ) : (
        <FluidRenderingHexIcon fill={lineColorRed} />
      )}
      <text
        fill={mutedTextColor}
        fontFamily="system-ui, sans-serif"
        fontSize="9"
        x="340"
        y="73"
      >
        Commerce API
      </text>
      <circle
        cx="312.5"
        cy="69.63"
        fill={connectorFill}
        r="3.77"
        stroke={connectorStroke}
      />

      {/* Destination card 1 - Top (storefront) */}
      <path
        d="M438 0.5C442.69 0.5 446.5 4.31 446.5 9V27.96C446.5 32.65 442.69 36.46 438 36.46H321C316.31 36.46 312.5 32.65 312.5 27.96V9C312.5 4.31 316.31 0.5 321 0.5H438Z"
        fill={cardFill}
      />
      <path
        d="M438 0.5C442.69 0.5 446.5 4.31 446.5 9V27.96C446.5 32.65 442.69 36.46 438 36.46H321C316.31 36.46 312.5 32.65 312.5 27.96V9C312.5 4.31 316.31 0.5 321 0.5H438Z"
        stroke={cardStroke}
      />

      {/* Bag mark */}
      {topIcon ? (
        <g
          data-slot="fluid-rendering-card-icon-custom"
          transform="translate(318 7)"
        >
          {topIcon}
        </g>
      ) : (
        <FluidRenderingBagIcon fill={lineColorBlue} />
      )}
      <text
        fill={mutedTextColor}
        fontFamily="system-ui, sans-serif"
        fontSize="9"
        x="340"
        y="22"
      >
        Storefront
      </text>
      <circle
        cx="312.5"
        cy="18.48"
        fill={connectorFill}
        r="3.77"
        stroke={connectorStroke}
      />
    </svg>
  )
}
