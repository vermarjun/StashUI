"use client"

import SparklesTitle from "./sparkles-title"

export default function SparklesTitleDemo() {
  return (
    <div className="h-[600px] w-full overflow-hidden bg-black [&>div]:min-h-[600px]">
      <SparklesTitle title="STASH UI">
        A curated library of animated, copy-paste React components. Browse,
        preview and install the best pieces from across the ecosystem in one
        place.
      </SparklesTitle>
    </div>
  )
}
