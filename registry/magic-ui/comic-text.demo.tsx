"use client"

import { ComicText } from "@/registry/magic-ui/comic-text"

export default function Demo() {
  return (
    <div className="flex min-h-[480px] w-full items-center justify-center p-8">
      <ComicText fontSize={10}>Kaboom!</ComicText>
    </div>
  )
}
