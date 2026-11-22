import { WeightWidget } from "./weight-widget";

export default function WeightWidgetDemo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <WeightWidget initialValue={64} min={30} max={150} />
    </div>
  );
}
