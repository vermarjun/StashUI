import NumberFlowTrading from "@/registry/ui-layouts/number-flow-trading";

export default function Demo() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 px-6 py-12 text-foreground">
      <span className="text-sm font-medium tracking-wide text-muted-foreground">
        NVDA · Nasdaq
      </span>
      <NumberFlowTrading />
    </div>
  );
}
