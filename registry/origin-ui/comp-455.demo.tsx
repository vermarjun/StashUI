import Cmp from "@/registry/origin-ui/comp-455";

const rows = [
  ["INV-2031", "Acme Corp", "$2,400.00", "Paid"],
  ["INV-2032", "Globex", "$1,150.00", "Pending"],
  ["INV-2033", "Initech", "$860.00", "Paid"],
  ["INV-2034", "Umbrella", "$3,200.00", "Overdue"],
];

export default function Demo() {
  return (
    <div className="w-full max-w-lg space-y-3 rounded-xl border border-border bg-card p-4">
      <div className="divide-y divide-border rounded-lg border border-border">
        {rows.map(([id, client, amount, status]) => (
          <div key={id} className="flex items-center justify-between px-4 py-3 text-sm">
            <span className="font-mono text-xs text-muted-foreground">{id}</span>
            <span className="flex-1 px-4 text-foreground">{client}</span>
            <span className="w-24 text-right tabular-nums text-foreground">{amount}</span>
            <span className="w-20 text-right text-xs text-muted-foreground">{status}</span>
          </div>
        ))}
      </div>
      <Cmp currentPage={3} totalPages={10} />
    </div>
  );
}
