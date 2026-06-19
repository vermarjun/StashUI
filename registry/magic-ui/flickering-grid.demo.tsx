import { FlickeringGrid } from "@/registry/magic-ui/flickering-grid";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <FlickeringGrid
        className="absolute inset-0 h-full w-full"
        squareSize={4}
        gridGap={6}
        flickerChance={0.3}
        color="rgb(100, 100, 100)"
        maxOpacity={0.3}
      />
    </div>
  );
}
