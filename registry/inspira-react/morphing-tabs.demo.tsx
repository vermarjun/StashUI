"use client";

import { useState } from "react";
import { MorphingTabs } from "@/registry/inspira-react/morphing-tabs";

export default function MorphingTabsDemo() {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className="flex min-h-32 flex-col items-center justify-center gap-6 p-8">
      <MorphingTabs
        tabs={["Home", "About", "Work", "Contact"]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <p className="text-sm text-muted-foreground">
        Active: <span className="font-semibold">{activeTab}</span>
      </p>
    </div>
  );
}
