"use client"

import CurvedLoop from "@/registry/react-bits/CurvedLoop"

export default function Demo() {
  return (
    <div className="w-full bg-background text-foreground overflow-hidden">
      <CurvedLoop
        marqueeText="Components • Animations • Design System • Open Source • "
        speed={2}
        curveAmount={300}
        direction="left"
        interactive={true}
        className="fill-foreground text-foreground"
      />
    </div>
  )
}
