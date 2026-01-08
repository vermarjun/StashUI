"use client"

import { LogoOrigami, LogoOrigamiItem } from "@/registry/inspira-react/logo-origami"

export default function LogoOrigamiDemo() {
  return (
    <div className="flex items-center justify-center p-12 min-h-64 bg-neutral-900 rounded-xl">
      <LogoOrigami duration={1.5} delay={2.5}>
        {[
          <LogoOrigamiItem key="react">⚛️</LogoOrigamiItem>,
          <LogoOrigamiItem key="next" className="bg-neutral-800">
            ▲
          </LogoOrigamiItem>,
          <LogoOrigamiItem key="ts" className="bg-blue-700">
            TS
          </LogoOrigamiItem>,
          <LogoOrigamiItem key="tailwind" className="bg-cyan-700">
            🌊
          </LogoOrigamiItem>,
        ]}
      </LogoOrigami>
    </div>
  )
}
