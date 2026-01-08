"use client"

import { LiquidLogo } from "@/registry/inspira-react/liquid-logo"

export default function LiquidLogoDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-neutral-950 rounded-xl w-full h-80">
      <div className="w-64 h-64">
        <LiquidLogo
          imageUrl="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          patternScale={2}
          refraction={0.015}
          edge={0.4}
          patternBlur={0.005}
          liquid={0.07}
          speed={0.3}
          showProcessing={true}
        />
      </div>
    </div>
  )
}
