import { BlurFade } from "@/registry/magic-ui/blur-fade"

const items = [
  { delay: 0, text: "Blur Fade", sub: false },
  { delay: 0.1, text: "Content fades in with a soft blur on mount.", sub: true },
  { delay: 0.2, text: "Each element staggers in independently.", sub: true },
  { delay: 0.3, text: "Powered by Framer Motion.", sub: true },
]

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 min-h-[280px] px-6 text-center">
      <BlurFade delay={items[0].delay} duration={0.5}>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          {items[0].text}
        </h2>
      </BlurFade>

      {items.slice(1).map((item, i) => (
        <BlurFade key={i} delay={item.delay} duration={0.45}>
          <p className="text-muted-foreground text-sm max-w-xs">{item.text}</p>
        </BlurFade>
      ))}

      <BlurFade delay={0.45} duration={0.5} direction="up">
        <div className="mt-4 rounded-xl border border-border bg-muted/30 px-8 py-4">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">
            direction: up
          </span>
        </div>
      </BlurFade>
    </div>
  )
}
