"use client";

import React from "react";
import { SpinningText } from "@/registry/inspira-react/spinning-text";

export default function SpinningTextDemo() {
  return (
    <div className="flex items-center justify-center h-48 w-full">
      <SpinningText
        text="Spinning Text • React Port •"
        duration={8}
        radius={5}
        className="text-sm font-semibold w-40 h-40"
      />
    </div>
  );
}
