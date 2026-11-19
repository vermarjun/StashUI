import Cmp from "@/registry/origin-ui/comp-182";

const ROWS = [
  { title: "Interface", desc: "Light or dark application chrome." },
  { title: "Code blocks", desc: "Syntax theme for snippets." },
  { title: "Documents", desc: "Theme for exported PDFs." },
];

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-8">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
        <h3 className="font-semibold text-base">Appearance</h3>
        <p className="mt-1 text-muted-foreground text-sm">Sun and moon flank the switch.</p>
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
