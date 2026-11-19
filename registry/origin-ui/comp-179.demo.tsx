import Cmp from "@/registry/origin-ui/comp-179";

const ROWS = [
  { title: "GitHub sync", desc: "Mirror issues into your workspace." },
  { title: "Slack alerts", desc: "Post deploy events to #releases." },
  { title: "Calendar", desc: "Add due dates to your calendar." },
];

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-8">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
        <h3 className="font-semibold text-base">Integrations</h3>
        <p className="mt-1 text-muted-foreground text-sm">Switches that announce their state.</p>
        <div className="mt-5 divide-y divide-border">
          {ROWS.map((r) => (
            <div className="flex items-center justify-between gap-6 py-4" key={r.title}>
              <div>
                <p className="font-medium text-sm">{r.title}</p>
                <p className="text-muted-foreground text-xs">{r.desc}</p>
              </div>
              <Cmp />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
