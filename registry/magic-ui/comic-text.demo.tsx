"use client"

import { ComicText } from "@/registry/magic-ui/comic-text"

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-12 bg-white min-h-[200px]">
      <ComicText fontSize={4}>POW!</ComicText>
      <ComicText fontSize={3}>Kaboom!</ComicText>
      <ComicText fontSize={2}>Zap!</ComicText>
    </div>
  )
}
