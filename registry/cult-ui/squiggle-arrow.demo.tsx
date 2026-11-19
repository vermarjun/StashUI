import SquigglyArrow from "@/registry/cult-ui/squiggle-arrow";

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-10 p-8">
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm text-muted-foreground -rotate-6">
          try it here
        </span>
        <SquigglyArrow width={180} height={90} variant="wavy" />
        <button className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background">
          Get started
        </button>
      </div>
      <div className="flex items-center gap-12 text-muted-foreground">
        <div className="flex flex-col items-center gap-2">
          <SquigglyArrow width={160} height={80} variant="bouncy" className="text-muted-foreground" />
          <span className="text-xs">bouncy</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <SquigglyArrow width={160} height={80} variant="smooth" direction="left" className="text-muted-foreground" />
          <span className="text-xs">smooth, left</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <SquigglyArrow width={100} height={100} variant="wavy" direction="down" className="text-muted-foreground" />
          <span className="text-xs">wavy, down</span>
        </div>
      </div>
    </div>
  );
}
