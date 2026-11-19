import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/origin-ui/table";

const invoices = [
  { id: "INV-001", customer: "Alex Thompson", status: "Paid", method: "Credit card", amount: "$250.00" },
  { id: "INV-002", customer: "Sarah Chen", status: "Pending", method: "PayPal", amount: "$150.00" },
  { id: "INV-003", customer: "James Wilson", status: "Unpaid", method: "Bank transfer", amount: "$350.00" },
  { id: "INV-004", customer: "Maria Garcia", status: "Paid", method: "Credit card", amount: "$450.00" },
  { id: "INV-005", customer: "David Kim", status: "Paid", method: "PayPal", amount: "$550.00" },
];

export default function Demo() {
  return (
    <div className="flex min-h-[480px] w-full items-center justify-center px-6">
      <div className="w-full max-w-2xl rounded-xl border border-border bg-card p-2 shadow-sm">
        <Table>
          <TableCaption>Recent invoices from the last 30 days.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.customer}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell className="text-muted-foreground">
                  {invoice.method}
                </TableCell>
                <TableCell className="text-right">{invoice.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right">$1,750.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
