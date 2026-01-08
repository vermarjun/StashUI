"use client";

import { IInput } from "@/registry/inspira-react/input";

export default function InputDemo() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-6 p-8 dark:bg-zinc-900">
      <div className="w-full max-w-sm space-y-2">
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
          Email
        </label>
        <IInput
          type="email"
          placeholder="you@example.com"
        />
      </div>
      <div className="w-full max-w-sm space-y-2">
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
          Password
        </label>
        <IInput
          type="password"
          placeholder="••••••••"
        />
      </div>
      <div className="w-full max-w-sm space-y-2">
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
          Disabled
        </label>
        <IInput
          type="text"
          placeholder="Cannot edit"
          disabled
        />
      </div>
    </div>
  );
}
