"use client"

import { LiquidLogo } from "@/registry/inspira-react/liquid-logo"

// A neutral brand mark (two interlocking rounded tiles) on a transparent
// background: the shader reads the shape's alpha to build its depth map.
const mark = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><g fill="#000"><rect x="90" y="90" width="380" height="380" rx="110"/><rect x="330" y="330" width="380" height="380" rx="110"/></g></svg>`
const logo = `data:image/svg+xml;utf8,${encodeURIComponent(mark)}`

export default function LiquidLogoDemo() {
  return (
    <div className="flex h-[560px] w-full items-center justify-center bg-background">
      <div className="h-[400px] w-[400px]">
        <LiquidLogo
          imageUrl={logo}
          patternScale={2}
          refraction={0.015}
          edge={0.4}
          patternBlur={0.005}
          liquid={0.07}
          speed={0.3}
        />
      </div>
    </div>
  )
}
