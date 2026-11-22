"use client";

import { useState } from "react";
import JellyRadio from "@/registry/react-bits/jelly-radio";

const PLANS = ["Hobby", "Starter", "Pro", "Team", "Enterprise"];
const PRICE: Record<string, string> = { Hobby: "$0", Starter: "$9", Pro: "$24", Team: "$59", Enterprise: "Custom" };

export default function Demo() {
  const [plan, setPlan] = useState("Pro");
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-6 bg-background px-6">
      <span className="text-sm text-muted-foreground">Choose a plan</span>
      <JellyRadio items={PLANS} defaultValue="Pro" onChange={value => setPlan(value)} ariaLabel="Plan" size="lg" />
      <div className="text-center">
        <span className="text-4xl font-semibold tracking-tight text-foreground">{PRICE[plan]}</span>
        {plan !== "Enterprise" ? <span className="text-muted-foreground"> / month</span> : null}
      </div>
    </div>
  );
}
