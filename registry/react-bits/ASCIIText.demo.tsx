"use client"

import ASCIIText from "@/registry/react-bits/ASCIIText"

export default function Demo() {
  return (
    <div className="relative w-full h-[400px] bg-background">
      <ASCIIText
        text="myui"
        asciiFontSize={8}
        textFontSize={200}
        textColor="#ffffff"
        planeBaseHeight={8}
        enableWaves={true}
      />
    </div>
  )
}
