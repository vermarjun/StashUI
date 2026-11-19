"use client";

import { SafariMockup } from "@/registry/inspira-react/safari-mockup";

export default function SafariMockupDemo() {
  return (
    <div className="flex flex-col items-center gap-10 p-8">
      {/* With a screenshot */}
      <div className="w-full max-w-2xl">
        <SafariMockup
          url="example.com"
          src="https://images.unsplash.com/photo-1605106715994-18d3fecffb98?w=1200&h=700&fit=crop&auto=format&q=80"
          className="w-full h-auto drop-shadow-xl"
        />
      </div>

      {/* Empty frame */}
      <div className="w-full max-w-2xl">
        <SafariMockup
          url="yourapp.vercel.app"
          className="w-full h-auto drop-shadow-xl"
        />
      </div>
    </div>
  );
}
