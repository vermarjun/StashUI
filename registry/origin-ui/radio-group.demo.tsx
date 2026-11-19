import { RadioGroup, RadioGroupItem } from "@/registry/origin-ui/radio-group";

const PLANS = [
  { value: "hobby", label: "Hobby", desc: "For personal projects", price: "Free" },
  { value: "pro", label: "Pro", desc: "For growing teams", price: "$20/mo" },
  { value: "team", label: "Team", desc: "Advanced collaboration", price: "$49/mo" },
  { value: "enterprise", label: "Enterprise", desc: "SSO, audit logs and SLAs", price: "Custom" },
];

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-8">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
        <h3 className="font-semibold text-base">Choose a plan</h3>
        <p className="mt-1 text-muted-foreground text-sm">You can change this at any time.</p>
        <RadioGroup className="mt-5 gap-2" defaultValue="pro">
          {PLANS.map((p) => (
            <label
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-border px-4 py-3 transition-colors has-data-[state=checked]:border-primary/60 has-data-[state=checked]:bg-accent/40"
              htmlFor={`plan-${p.value}`}
              key={p.value}
            >
              <RadioGroupItem id={`plan-${p.value}`} value={p.value} />
              <span className="grid flex-1 gap-0.5">
                <span className="font-medium text-sm">{p.label}</span>
                <span className="text-muted-foreground text-xs">{p.desc}</span>
              </span>
              <span className="font-medium text-sm tabular-nums">{p.price}</span>
            </label>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
