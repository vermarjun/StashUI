"use client"

import Novatrix from "./novatrix-background"

export default function NovatrixBackgroundDemo() {
  return (
    <div className="relative h-[560px] w-full overflow-hidden">
      <Novatrix color={[1, 1, 1]} amplitude={0.1} speed={1.0} mouseReact />
    </div>
  )
}
