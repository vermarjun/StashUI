"use client";

import { Input } from "@/registry/aceternity-ui/input";

export default function Demo() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-6 p-8">
      <div className="w-full max-w-sm space-y-2">
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
          Email
        </label>
        <Input
          type="email"
          placeholder="you@example.com"
        />
      </div>
      <div className="w-full max-w-sm space-y-2">
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
          Full Name
        </label>
        <Input
          type="text"
          placeholder="John Doe"
        />
      </div>
    </div>
  );
}
