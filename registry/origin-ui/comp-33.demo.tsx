"use client";

import { useId } from "react";

export default function Demo() {
  const id = useId();
  return (
    <div className="relative rounded-md border border-input bg-background shadow-xs outline-none transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40">
      <label
        className="block px-3 pt-2 font-medium text-foreground text-xs"
        htmlFor={id}
      >
        Input with inset label
      </label>
      <input
        className="flex h-10 w-full bg-transparent px-3 pb-2 text-foreground text-sm placeholder:text-muted-foreground/70 focus-visible:outline-none"
        id={id}
        placeholder="Email"
        type="email"
      />
    </div>
  );
}
