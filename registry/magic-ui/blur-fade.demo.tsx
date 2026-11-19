"use client"

import { useState } from "react"
import { BlurFade } from "@/registry/magic-ui/blur-fade"

const photos = [
  "1506905925346-21bda4d32df4",
  "1693581176773-a5f2362209e6",
  "1469474968028-56623f02e42e",
  "1759395073808-17782f3d8d66",
  "1573790387438-4da905039392",
  "1584043204475-8cc101d6c77a",
  "1718954572423-2780fe600028",
  "1475727946784-2890c8fdb9c8",
]

export default function Demo() {
  const [run, setRun] = useState(0)

  return (
    <div className="flex w-full flex-col items-center gap-6 px-6 py-10">
      <div key={run} className="w-full max-w-3xl">
        <BlurFade delay={0.1} duration={0.5}>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">Summer in the mountains</h2>
        </BlurFade>
        <BlurFade delay={0.2} duration={0.5}>
          <p className="mt-1 text-muted-foreground">Eight frames from three weeks on the road.</p>
        </BlurFade>
        <div className="mt-6 grid grid-cols-4 gap-3">
          {photos.map((id, i) => (
            <BlurFade key={id} delay={0.3 + i * 0.08} duration={0.5} inView>
              <img
                src={`https://images.unsplash.com/photo-${id}?w=400&h=400&fit=crop&auto=format&q=80`}
                alt=""
                className="aspect-square w-full rounded-xl object-cover"
              />
            </BlurFade>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setRun((n) => n + 1)}
        className="rounded-full border border-border px-4 py-1.5 text-xs text-muted-foreground transition hover:bg-muted hover:text-foreground"
      >
        Replay
      </button>
    </div>
  )
}
