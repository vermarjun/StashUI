"use client";

import { useState } from "react";
import SignaturePad from "./signature-pad";

export default function SignaturePadDemo() {
  const [signed, setSigned] = useState(false);

  return (
    <div className="flex min-h-[460px] w-full items-center justify-center p-6">
      <div className="flex w-full max-w-[380px] flex-col gap-4">
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wider">
            Lease agreement · Unit 4B
          </p>
          <h3 className="mt-1 font-medium text-foreground text-lg">
            Sign to confirm your move-in
          </h3>
          <p className="mt-1 text-muted-foreground text-sm">
            12-month term starting March 1, 2027 at $2,450 / month.
          </p>
        </div>
        <SignaturePad
          label="Tenant signature"
          onChange={(svg) => setSigned(svg !== null)}
        />
        <button
          className="h-10 rounded-xl bg-foreground font-medium text-background text-sm transition-opacity disabled:opacity-40"
          disabled={!signed}
          type="button"
        >
          Submit signed lease
        </button>
      </div>
    </div>
  );
}
