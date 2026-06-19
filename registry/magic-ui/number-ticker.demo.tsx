import { NumberTicker } from "@/registry/magic-ui/number-ticker";

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-10">
      <div className="flex flex-col items-center gap-1">
        <span className="text-6xl font-bold tabular-nums text-foreground">
          <NumberTicker value={12500} />
        </span>
        <span className="text-sm text-muted-foreground">Active Users</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-5xl font-semibold tabular-nums text-foreground">
          <NumberTicker value={99} decimalPlaces={1} />
          <span className="text-3xl">%</span>
        </span>
        <span className="text-sm text-muted-foreground">Uptime</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-4xl font-semibold tabular-nums text-foreground">
          $<NumberTicker value={4820000} />
        </span>
        <span className="text-sm text-muted-foreground">Revenue</span>
      </div>
    </div>
  );
}
