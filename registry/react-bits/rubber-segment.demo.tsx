"use client";

import RubberSegment from "./rubber-segment";

export default function RubberSegmentDemo() {
  return (
    <div className="flex min-h-[360px] w-full flex-col items-center justify-center gap-8 bg-background p-8">
      <RubberSegment size="lg" items={["Day", "Week", "Month", "Year"]} defaultValue="Week" />
      <RubberSegment items={["Overview", "Analytics", "Reports"]} defaultValue="Overview" />
    </div>
  );
}
