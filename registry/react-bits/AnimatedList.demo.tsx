import Cmp from "@/registry/react-bits/AnimatedList";

const items = [
  "Invoice #4021 paid by Northwind Labs",
  "Maya Chen invited you to Q3 Roadmap",
  "Production deploy succeeded in 42s",
  "New comment on Pricing page redesign",
  "Your weekly analytics report is ready",
  "Payout of $12,480 is on its way",
  "Design review moved to Thursday, 3 pm",
  "Alex merged #482 into main",
  "Nightly database backup completed",
  "18 new sign-ups from the launch post",
  "SSL certificate renews in 14 days",
  "Sam requested access to Billing",
];

export default function Demo() {
  return (
    <div className="[&_p]:text-[17px] [&_p]:font-medium">
      <Cmp items={items} itemClassName="border border-white/10" />
    </div>
  );
}
