import GhostCursor from "@/registry/react-bits/GhostCursor";

export default function Demo() {
  return (
    <div className="relative h-[480px] w-full overflow-hidden rounded-xl border border-border bg-background">
      <GhostCursor
        color="#B497CF"
        trailLength={50}
        inertia={0.5}
        bloomStrength={0.15}
        bloomRadius={1.0}
        grainIntensity={0.04}
        mixBlendMode="screen"
      />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 select-none">
        <p className="text-2xl font-bold text-foreground">Move your cursor</p>
        <p className="text-sm text-muted-foreground">A ghostly trail follows your pointer</p>
      </div>
    </div>
  );
}
