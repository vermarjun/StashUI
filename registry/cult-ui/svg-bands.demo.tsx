import {
  FlatSingleAngleBandSvg,
  CastleWallBandSvg,
  ZigzagSawtoothBandSvg,
  WavyBottomEdgeSvg,
  PyramidStepBandSvg,
} from "@/registry/cult-ui/svg-bands"

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-background">
      <div className="flex h-full flex-col items-center justify-around py-8">
        <div className="w-full">
          <FlatSingleAngleBandSvg />
        </div>
        <div className="w-full">
          <CastleWallBandSvg />
        </div>
        <div className="w-full">
          <ZigzagSawtoothBandSvg teeth={12} />
        </div>
        <div className="w-full">
          <WavyBottomEdgeSvg />
        </div>
        <div className="w-full">
          <PyramidStepBandSvg />
        </div>
      </div>
    </div>
  )
}
