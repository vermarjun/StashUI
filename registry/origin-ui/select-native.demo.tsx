import { Label } from "@/components/ui/label";
import { SelectNative } from "@/registry/origin-ui/select-native";

export default function Demo() {
  return (
    <div className="flex min-h-[480px] w-full items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-5 rounded-xl border border-border bg-card p-6 shadow-sm">
        <p className="font-medium text-foreground text-sm">Shipping details</p>
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <SelectNative defaultValue="de" id="country">
            <option value="us">United States</option>
            <option value="de">Germany</option>
            <option value="in">India</option>
            <option value="jp">Japan</option>
          </SelectNative>
        </div>
        <div className="space-y-2">
          <Label htmlFor="speed">Delivery speed</Label>
          <SelectNative defaultValue="" id="speed">
            <option disabled value="">
              Choose a delivery speed
            </option>
            <option value="standard">Standard (5-7 days)</option>
            <option value="express">Express (2-3 days)</option>
          </SelectNative>
        </div>
        <div className="space-y-2">
          <Label htmlFor="extras">Extras</Label>
          <SelectNative defaultValue={["gift"]} id="extras" multiple>
            <option value="gift">Gift wrapping</option>
            <option value="insurance">Shipping insurance</option>
            <option value="signature">Signature on delivery</option>
            <option value="carbon">Carbon-neutral shipping</option>
          </SelectNative>
        </div>
      </div>
    </div>
  );
}
