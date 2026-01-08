"use client";

import { SafariMockup } from "@/registry/inspira-react/safari-mockup";

export default function SafariMockupDemo() {
  return (
    <div className="flex flex-col items-center gap-10 p-8">
      {/* With a screenshot */}
      <div className="w-full max-w-2xl">
        <SafariMockup
          url="example.com"
          src="https://picsum.photos/seed/safari1/1200/700"
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
