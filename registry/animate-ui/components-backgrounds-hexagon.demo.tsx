import { HexagonBackground } from "@/registry/animate-ui/components-backgrounds-hexagon";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <HexagonBackground className="absolute inset-0 h-full w-full" />
    </div>
  );
}
