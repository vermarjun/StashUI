"use client";
import { TabsProvider, TabsBtn, TabsContent } from "@/registry/ui-layouts/tab";

const TABS = [
  {
    value: "overview",
    label: "Overview",
    content:
      "An overview gives stakeholders a concise picture of scope, goals, and current status. Keep it scannable — bullet-points and short sentences outperform dense paragraphs every time.",
  },
  {
    value: "features",
    label: "Features",
    content:
      "Features are the building blocks of your product. Prioritise ruthlessly: ship the 20 % that delivers 80 % of value first, then iterate based on real usage data.",
  },
  {
    value: "pricing",
    label: "Pricing",
    content:
      "Simple, transparent pricing builds trust. Three tiers — free, pro, and enterprise — cover most SaaS businesses without overwhelming prospective customers with choice.",
  },
];

export default function Demo() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 gap-6">
      <TabsProvider defaultValue="overview" wobbly>
        {/* Tab bar */}
        <div className="flex gap-1 p-1 rounded-lg bg-muted w-fit">
          {TABS.map((tab) => (
            <TabsBtn key={tab.value} value={tab.value}>
              <span className="relative z-10 text-sm font-medium px-1 select-none">
                {tab.label}
              </span>
            </TabsBtn>
          ))}
        </div>

        {/* Tab panels */}
        <div className="relative w-full max-w-lg min-h-[120px]">
          {TABS.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} yValue>
              <p className="text-sm text-muted-foreground leading-relaxed">{tab.content}</p>
            </TabsContent>
          ))}
        </div>
      </TabsProvider>
    </div>
  );
}
