import { Switch } from "@/registry/origin-ui/switch";

const ROWS = [
  { id: "sw-dark", title: "Dark mode", desc: "Use a dark theme across the app.", on: true },
  { id: "sw-sounds", title: "Sounds", desc: "Play a sound for new messages.", on: false },
  { id: "sw-autosave", title: "Autosave", desc: "Save drafts every few seconds.", on: true },
  { id: "sw-sso", title: "Single sign-on", desc: "Requires an Enterprise plan.", on: false, disabled: true },
];

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-8">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
        <h3 className="font-semibold text-base">Preferences</h3>
        <p className="mt-1 text-muted-foreground text-sm">Changes are saved automatically.</p>
        <div className="mt-5 divide-y divide-border">
          {ROWS.map((r) => (
            <div className="flex items-center justify-between gap-6 py-4" key={r.id}>
              <label className="grid gap-0.5" htmlFor={r.id}>
                <span className="font-medium text-sm">{r.title}</span>
                <span className="text-muted-foreground text-xs">{r.desc}</span>
              </label>
              <Switch defaultChecked={r.on} disabled={r.disabled} id={r.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
