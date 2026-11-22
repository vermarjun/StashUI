import { TypewriterLoader } from "./typewriter-loader"

export default function TypewriterLoaderDemo() {
  return (
    <div className="flex flex-col items-center gap-10">
      <TypewriterLoader className="scale-[1.8]" />
      <div className="mt-6 text-center">
        <p className="text-sm font-medium text-foreground">Drafting your cover letter…</p>
        <p className="text-xs text-muted-foreground">This usually takes about 10 seconds</p>
      </div>
    </div>
  )
}
