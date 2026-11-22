"use client"

import {
  Spring,
  SpringElement,
  SpringProvider,
} from "./spring-element"

export default function SpringDemo() {
  return (
    <div className="relative flex h-[420px] w-full items-center justify-center">
    <SpringProvider>
      <Spring className="z-10 text-muted-foreground" />
      <SpringElement className="relative z-20">
        <div
          aria-label="Drag me"
          className="flex size-16 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground shadow-md select-none"
        >
          Drag
        </div>
      </SpringElement>
    </SpringProvider>
    </div>
  )
}
