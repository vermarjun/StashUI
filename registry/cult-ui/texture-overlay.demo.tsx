import { TextureOverlay } from "@/registry/cult-ui/texture-overlay"

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-background">
      <div className="grid h-full grid-cols-3 grid-rows-2">
        {(
          [
            { texture: "dots", label: "Dots" },
            { texture: "grid", label: "Grid" },
            { texture: "crosshatch", label: "Crosshatch" },
            { texture: "diagonal", label: "Diagonal" },
            { texture: "halftone", label: "Halftone" },
            { texture: "paperGrain", label: "Paper Grain" },
          ] as const
        ).map(({ texture, label }) => (
          <div key={texture} className="relative flex items-center justify-center border border-border/30">
            <div className="absolute inset-0 bg-muted/20" />
            <TextureOverlay texture={texture} opacity={0.8} />
            <span className="relative z-10 text-xs font-medium text-muted-foreground">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
