"use client";

import AITextLoading from "@/registry/kokonut-ui/ai-text-loading";

export default function AITextLoadingDemo() {
  return (
    <div className="flex flex-col items-center gap-10">
      <AITextLoading />
      <AITextLoading
        className="font-medium text-base text-muted-foreground"
        interval={1800}
        showElapsed
        texts={[
          "Reading 14 files",
          "Tracing the checkout flow",
          "Drafting the fix",
          "Running the tests",
        ]}
      />
    </div>
  );
}
