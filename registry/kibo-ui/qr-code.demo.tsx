"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { QRCode } from "./qr-code";

export default function QRCodeDemo() {
  const [url, setUrl] = useState("https://en.wikipedia.org/wiki/QR_code");

  return (
    <div className="flex w-full items-center justify-center p-8">
      <div className="flex w-full max-w-2xl items-center gap-8 rounded-2xl border bg-background p-8">
        <div className="size-52 shrink-0 rounded-xl border bg-background p-4">
          <QRCode data={url || " "} robustness="H" />
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <div>
            <p className="font-semibold text-lg">Share this page</p>
            <p className="text-muted-foreground text-sm">
              The code is generated on the client and picks up your theme
              colours. Edit the link and it redraws.
            </p>
          </div>
          <Input
            aria-label="Link"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />
          <p className="text-muted-foreground text-xs">
            Custom foreground colours (OKLCH)
          </p>
          <div className="flex gap-3">
            {[
              "oklch(0.72 0.16 290)",
              "oklch(0.78 0.15 165)",
              "oklch(0.84 0.16 85)",
            ].map((fg) => (
              <div
                className="size-20 rounded-lg border p-2"
                key={fg}
                style={{ background: "oklch(0.18 0.01 280)" }}
              >
                <QRCode
                  background="oklch(0.18 0.01 280)"
                  data={url || " "}
                  foreground={fg}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
