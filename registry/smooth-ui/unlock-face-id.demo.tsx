"use client";

import UnlockFaceId from "./unlock-face-id";

export default function UnlockFaceIdDemo() {
  return (
    <div className="flex w-full items-center justify-center p-8">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-6">
        <UnlockFaceId label="Scan to view recovery codes" size={112}>
          <div className="rounded-2xl border border-border bg-background p-4">
            <p className="mb-3 font-medium text-foreground text-sm">
              Recovery codes
            </p>
            <div className="grid grid-cols-2 gap-2 font-mono text-foreground/90 text-xs">
              {[
                "7KQ2-9FXM",
                "H4TZ-1LPA",
                "R8WN-3CJD",
                "M2VB-6YSE",
                "D9GU-0QRK",
                "P5XE-8HNT",
              ].map((code) => (
                <span className="rounded-md bg-muted px-2 py-1.5" key={code}>
                  {code}
                </span>
              ))}
            </div>
          </div>
        </UnlockFaceId>
      </div>
    </div>
  );
}
