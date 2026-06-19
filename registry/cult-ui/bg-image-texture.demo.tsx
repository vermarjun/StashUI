import { BackgroundImageTexture } from "@/registry/cult-ui/bg-image-texture"

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <BackgroundImageTexture
        variant="fabric-of-squares"
        opacity={0.6}
        className="h-full w-full bg-background"
      >
        <div className="flex h-[600px] flex-col items-center justify-center gap-4 px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Fabric of Squares
          </h2>
          <p className="max-w-md text-muted-foreground">
            A repeating texture overlay applied to any section or card background.
          </p>
        </div>
      </BackgroundImageTexture>
    </div>
  )
}
