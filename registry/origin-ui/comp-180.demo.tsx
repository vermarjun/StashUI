import Cmp from "@/registry/origin-ui/comp-180";

const ROWS = [
  { title: "Preview builds", desc: "Build every pull request." },
  { title: "Auto deploy", desc: "Ship main to production on merge." },
  { title: "Maintenance", desc: "Show a maintenance page to visitors." },
];

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-8">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
        <h3 className="font-semibold text-base">Deploy settings</h3>
        <p className="mt-1 text-muted-foreground text-sm">Labels on both sides of the switch.</p>
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
