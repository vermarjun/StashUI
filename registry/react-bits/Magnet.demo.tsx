import Magnet from "@/registry/react-bits/Magnet";

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-10 py-16 w-full">
      <Magnet magnetStrength={2} padding={80}>
        <button className="rounded-full bg-foreground text-background px-8 py-3 text-sm font-semibold hover:opacity-90 transition-opacity">
          Hover me
        </button>
      </Magnet>

      <Magnet magnetStrength={3} padding={100}>
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-border bg-background shadow-md">
          <span className="text-3xl select-none">✦</span>
        </div>
      </Magnet>

      <Magnet magnetStrength={2.5} padding={80}>
        <div className="rounded-xl border border-border bg-background px-6 py-4 text-center shadow-sm">
          <p className="text-sm font-medium text-foreground">Magnetic card</p>
          <p className="text-xs text-muted-foreground mt-1">Move your cursor near me</p>
        </div>
      </Magnet>
    </div>
  );
}
