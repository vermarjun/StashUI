import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function Component() {
  return (
    <div className="*:not-first:mt-4">
      <Label>Disabled slider</Label>
      <Slider aria-label="Disabled slider" defaultValue={[25]} disabled />
    </div>
  );
}
