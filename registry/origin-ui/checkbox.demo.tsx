import { Checkbox } from "@/registry/origin-ui/checkbox";

const ITEMS = [
  { id: "cb-terms", label: "Accept terms and conditions", desc: "You agree to our Terms of Service and Privacy Policy.", checked: true },
  { id: "cb-news", label: "Subscribe to the newsletter", desc: "One email a month, no spam.", checked: false },
  { id: "cb-beta", label: "Join the beta program", desc: "Try new features before everyone else.", checked: "indeterminate" as const },
  { id: "cb-locked", label: "Share usage analytics", desc: "Managed by your organization.", checked: false, disabled: true },
];

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-8">
      <div className="w-full max-w-md space-y-5 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
        <div>
          <h3 className="font-semibold text-base">Account preferences</h3>
          <p className="mt-1 text-muted-foreground text-sm">Checked, unchecked, indeterminate and disabled.</p>
        </div>
        {ITEMS.map((it) => (
          <div className="flex items-start gap-3" key={it.id}>
            <Checkbox className="mt-0.5" defaultChecked={it.checked} disabled={it.disabled} id={it.id} />
            <label className="grid gap-1 text-sm leading-none" htmlFor={it.id}>
              <span className="font-medium">{it.label}</span>
              <span className="text-muted-foreground text-xs">{it.desc}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
