"use client";

import { CreditUsageCard } from "@/registry/watermelon-ui/credit-usage-card";

const history = [
  { date: "Nov 21", model: "gpt-4.1", credits: "4.2M", cost: "$12.60" },
  { date: "Nov 20", model: "llama-3.3-70b", credits: "2.8M", cost: "$3.36" },
  { date: "Nov 19", model: "gpt-4.1-mini", credits: "6.1M", cost: "$4.88" },
  { date: "Nov 18", model: "mistral-large", credits: "1.9M", cost: "$5.70" },
];

export default function CreditUsageCardDemo() {
  return (
    <div className="flex w-full justify-center">
      <CreditUsageCard
        usedCreditsPercent={56.4}
        creditsUsedLabel="56.4M"
        creditsLeftLabel="43.6M"
        totalCreditsLabel="100M CREDITS"
        usageHistory={history}
      />
    </div>
  );
}
