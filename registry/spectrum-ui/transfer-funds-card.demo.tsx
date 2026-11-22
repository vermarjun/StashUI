"use client";

import { TransferFundsCard } from "./transfer-funds-card";

export default function TransferFundsCardDemo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center bg-background p-8">
      <TransferFundsCard
        className="max-w-[380px]"
        amount="2,450.00"
        fromAccount="Everyday Checking (··8402): $12,450.00"
        toAccount="Emergency Savings (··1192): $18,300.00"
        summary={[
          { label: "Estimated arrival", value: "Today, Nov 22" },
          { label: "Transaction fee", value: "$0.00" },
          { label: "Total amount", value: "$2,450.00", emphasized: true },
        ]}
      />
    </div>
  );
}
