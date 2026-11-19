"use client";

import { Input } from "@/registry/aceternity-ui/input";

export default function Demo() {
  return (
    <div className="flex min-h-[360px] w-full items-center justify-center p-8">
      <div className="w-full max-w-md space-y-5 rounded-2xl border border-border bg-card p-8 shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-foreground">Welcome to StashUI</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Create an account to save components to your stash.
          </p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="email">
            Email
          </label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="name">
            Full name
          </label>
          <Input id="name" type="text" placeholder="Maya Chen" />
        </div>
      </div>
    </div>
  );
}
