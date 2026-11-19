"use client";

import { useState } from "react";

import { DualRangeSlider } from "@/registry/ui-layouts/slider";

export default function Demo() {
  const [values, setValues] = useState([240, 760]);

  return (
    <div className="flex min-h-[420px] w-full items-center justify-center px-6">
      <div className="w-full max-w-md space-y-10 rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="space-y-1">
          <p className="font-medium text-foreground text-sm">Price range</p>
          <p className="text-muted-foreground text-xs">
            Drag either handle to filter products by price.
          </p>
        </div>
        <DualRangeSlider
          label={() => <span className="text-muted-foreground">$</span>}
          lableContenPos="left"
          max={1000}
          min={0}
          onValueChange={setValues}
          step={10}
          value={values}
        />
        <div className="flex justify-between text-muted-foreground text-xs">
          <span>$0</span>
          <span>$1,000</span>
        </div>
      </div>
    </div>
  );
}
