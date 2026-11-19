"use client"

import BackgroundMedia from "@/registry/cult-ui/bg-media"

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <BackgroundMedia
        type="image"
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=900&fit=crop&auto=format&q=80"
        alt="Background landscape"
        variant="light"
      />
    </div>
  )
}
