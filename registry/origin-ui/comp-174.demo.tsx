import Cmp from "@/registry/origin-ui/comp-174";

const ROWS = [
  { title: "Public profile", desc: "Anyone can view your profile page." },
  { title: "Show activity", desc: "Display your recent contributions." },
  { title: "Search indexing", desc: "Let search engines find your profile." },
];

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-8">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
        <h3 className="font-semibold text-base">Privacy</h3>
        <p className="mt-1 text-muted-foreground text-sm">Control what other people can see.</p>
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
