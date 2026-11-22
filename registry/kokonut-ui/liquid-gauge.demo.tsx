import LiquidGauge from "@/registry/kokonut-ui/liquid-gauge";

export default function LiquidGaugeDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-6 p-6">
      <LiquidGauge defaultValue={64} label="Storage" total={256} unit="GB" />
      <LiquidGauge
        defaultValue={93}
        label="Monthly bandwidth"
        readOnly
        total={2}
        unit="TB"
      />
    </div>
  );
}
