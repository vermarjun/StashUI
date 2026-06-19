import { GridPattern } from "@/registry/magic-ui/grid-pattern";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <GridPattern
        squares={[
          [4, 4], [5, 1], [8, 2], [5, 3], [5, 5],
          [10, 10], [12, 15], [15, 10], [10, 15],
          [2, 12], [14, 6], [7, 9], [11, 3],
        ]}
        className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
      />
    </div>
  );
}
