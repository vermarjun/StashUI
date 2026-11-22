"use client"

import { useRef, useState } from "react"
import { Bug, BugOff } from "lucide-react"

import BoxCarousel, { type BoxCarouselRef, type CarouselItem } from "./box-carousel"

const img = (id: string) => `https://images.unsplash.com/${id}?w=900&q=80`

const carouselItems: CarouselItem[] = [
  { id: "1", type: "image", src: img("photo-1506905925346-21bda4d32df4"), alt: "Mountain range at sunrise" },
  { id: "2", type: "image", src: img("photo-1548192746-dd526f154ed9"), alt: "Modern architecture" },
  { id: "3", type: "image", src: img("photo-1460999158988-6f0380f81f4d"), alt: "City skyline at dusk" },
  { id: "4", type: "image", src: img("photo-1517849845537-4d257902454a"), alt: "Dog portrait" },
  { id: "5", type: "image", src: img("photo-1618220649687-ba860f3176e7"), alt: "Minimal interior" },
  { id: "6", type: "image", src: img("photo-1572851899646-a1f69c664e1e"), alt: "Abstract texture" },
  { id: "7", type: "image", src: img("photo-1518599904199-0ca897819ddb"), alt: "Landscape" },
]

const pill =
  "rounded-full border border-border px-3 py-1 text-xs text-foreground transition-all duration-300 ease-out hover:bg-muted active:scale-95"

export default function BoxCarouselDemo() {
  const carouselRef = useRef<BoxCarouselRef>(null)
  const [debug, setDebug] = useState(false)

  return (
    <div className="relative flex h-[560px] w-full items-center justify-center bg-background p-6 text-muted-foreground">
      <button
        onClick={() => setDebug(!debug)}
        className="absolute left-4 top-4 cursor-pointer rounded-full border border-border p-1.5 text-foreground transition-all duration-300 ease-out hover:bg-muted active:scale-95"
        title={debug ? "Debug Mode: ON" : "Debug Mode: OFF"}
      >
        {debug ? <Bug size={12} /> : <BugOff size={12} />}
      </button>

      <div className="space-y-20">
        <div className="flex justify-center pt-10">
          <BoxCarousel
            ref={carouselRef}
            items={carouselItems}
            width={350}
            height={250}
            direction="right"
            debug={debug}
            enableDrag
            perspective={1000}
          />
        </div>

        <div className="flex justify-center gap-2">
          <button onClick={() => carouselRef.current?.prev()} className={pill}>
            Prev
          </button>
          <button onClick={() => carouselRef.current?.next()} className={pill}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
