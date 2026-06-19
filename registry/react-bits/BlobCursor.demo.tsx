import BlobCursor from "@/registry/react-bits/BlobCursor";

export default function Demo() {
  return (
    <div className="relative h-[480px] w-full overflow-hidden rounded-xl border border-border bg-background">
      <BlobCursor
        fillColor="#7c3aed"
        trailCount={3}
        sizes={[50, 110, 65]}
        innerSizes={[18, 32, 22]}
        innerColor="rgba(255,255,255,0.85)"
        opacities={[0.65, 0.55, 0.6]}
        filterStdDeviation={28}
        useFilter
        blobType="circle"
      />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 select-none">
        <p className="text-2xl font-bold text-foreground">Move your cursor</p>
        <p className="text-sm text-muted-foreground">The blob follows your mouse</p>
      </div>
    </div>
  );
}
