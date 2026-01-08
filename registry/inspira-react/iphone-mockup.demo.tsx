"use client";

import { IPhoneMockup } from "@/registry/inspira-react/iphone-mockup";

export default function IPhoneMockupDemo() {
  return (
    <div className="flex min-h-[500px] items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-8 dark:from-slate-900 dark:to-slate-800">
      <IPhoneMockup
        width={220}
        height={450}
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80"
      />
    </div>
  );
}
