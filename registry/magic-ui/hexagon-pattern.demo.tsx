import { HexagonPattern } from "@/registry/magic-ui/hexagon-pattern";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <HexagonPattern
        radius={36}
        gap={4}
        hexagons={[
          [3, 2], [5, 1], [7, 3], [2, 5], [6, 4],
          [9, 2], [4, 6], [8, 5], [1, 3], [10, 4],
        ]}
        className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
      />
    </div>
  );
}
