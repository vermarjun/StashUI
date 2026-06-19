import { FlickeringGrid } from "@/registry/inspira-react/flickering-grid";

export default function FlickeringGridDemo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-xl border">
      <FlickeringGrid
        className="absolute inset-0"
        squareSize={4}
        gridGap={6}
        color="#6366f1"
        maxOpacity={0.5}
        flickerChance={0.1}
      />
      <div className="relative z-10 flex h-full items-center justify-center">
        <p className="text-lg font-semibold">Flickering Grid Background</p>
      </div>
    </div>
  );
}
