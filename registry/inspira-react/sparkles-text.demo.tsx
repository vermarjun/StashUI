"use client";

import React from "react";
import { SparklesText } from "@/registry/inspira-react/sparkles-text";

export default function SparklesTextDemo() {
  return (
    <div className="flex items-center justify-center p-12">
      <SparklesText
        text="Hello World"
        sparklesCount={10}
        colors={{ first: "#9E7AFF", second: "#FE8BBB" }}
        className="text-5xl"
      />
    </div>
  );
}
