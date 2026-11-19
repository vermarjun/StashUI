import { RetroGrid } from "@/registry/magic-ui/retro-grid";

export default function Demo() {
  return (
    <div className="relative flex h-[600px] w-full flex-col items-center overflow-hidden pt-[95px] bg-background">
      <span className="pointer-events-none z-10 bg-linear-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-8xl font-bold leading-none tracking-tighter text-transparent">
        Retro Grid
      </span>
      <RetroGrid
        className="inset-0"
        opacity={0.9}
        lightLineColor="#71717a"
        darkLineColor="#a1a1aa"
      />
    </div>
  );
}
