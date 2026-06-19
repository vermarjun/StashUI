"use client";

import { Input } from "@/registry/origin-ui/input";

export default function Demo() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <label
        className="text-sm font-medium text-foreground"
        htmlFor="demo-input"
      >
        Email address
      </label>
      <Input
        id="demo-input"
        placeholder="you@example.com"
        type="email"
      />
    </div>
  );
}
