import { HackerBackground } from "./hacker-background"

export default function HackerBackgroundDemo() {
  return (
    <div className="relative h-[560px] w-full overflow-hidden bg-black">
      <HackerBackground />
      <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center gap-3 text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-emerald-400/80 uppercase">
          Access granted
        </p>
        <h2 className="font-mono text-4xl font-bold text-white sm:text-5xl">
          Wake up, Neo.
        </h2>
      </div>
    </div>
  )
}
