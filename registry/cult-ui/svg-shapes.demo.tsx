import {
  TriangleShapeSvg,
  CircleShapeSvg,
  FlowerOfLifeSvg,
  GoldenSpiralSvg,
  MetatronsCubeSvg,
} from "@/registry/cult-ui/svg-shapes"

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-background">
      <div className="grid h-full grid-cols-3 grid-rows-2 gap-4 p-6">
        <div className="flex items-center justify-center">
          <TriangleShapeSvg className="w-40 text-foreground" />
        </div>
        <div className="flex items-center justify-center">
          <CircleShapeSvg className="w-40 text-foreground" />
        </div>
        <div className="flex items-center justify-center">
          <FlowerOfLifeSvg className="w-40 text-foreground" />
        </div>
        <div className="flex items-center justify-center">
          <GoldenSpiralSvg className="w-40 text-foreground" />
        </div>
        <div className="col-span-2 flex items-center justify-center">
          <MetatronsCubeSvg className="w-72 text-foreground" />
        </div>
      </div>
    </div>
  )
}
