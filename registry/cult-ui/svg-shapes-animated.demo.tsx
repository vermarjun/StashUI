import { TriangleShapeSvg, CircleShapeSvg, DiamondShapeSvg } from "@/registry/cult-ui/svg-shapes-animated";

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-8 w-full p-8">
      <div className="w-full max-w-sm">
        <TriangleShapeSvg />
      </div>
      <div className="w-full max-w-sm">
        <CircleShapeSvg />
      </div>
      <div className="w-full max-w-sm">
        <DiamondShapeSvg />
      </div>
    </div>
  );
}
