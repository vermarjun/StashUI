import { Blocks, Code2, Headphones, Infinity as InfinityIcon, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BlobCard } from "./blob-card";

const FEATURES = [
  { label: "All premium components", icon: Blocks },
  { label: "Future premium releases included", icon: RefreshCw },
  { label: "Full source code and customization", icon: Code2 },
  { label: "Lifetime access. Pay once, own forever.", icon: InfinityIcon },
  { label: "Direct support from the maker", icon: Headphones },
];

export default function BlobCardDemo() {
  return (
    <div className="flex w-full items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <BlobCard
          headerHeight={224}
          header={
            <>
              <span className="font-serif text-lg">
                Pro{" "}
                <span className="text-sm text-foreground/50">
                  [ Early Supporter Price ]
                </span>
              </span>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-6xl font-medium tracking-tighter">
                  $99
                </span>
                <div className="flex flex-col text-xs leading-snug text-foreground/70">
                  <span className="text-xl tracking-wide line-through">
                    $149
                  </span>
                  <span>One-time payment</span>
                  <span>Lifetime access</span>
                </div>
              </div>
            </>
          }
        >
          <div className="flex w-full items-center justify-center px-8">
            <Button size="lg" className="w-full" asChild>
              <a href="#pricing">Get Instant Access</a>
            </Button>
          </div>
          <div className="px-8 pt-8 pb-8">
            <ul className="space-y-5">
              {FEATURES.map((f) => (
                <li
                  key={f.label}
                  className="flex items-center gap-4 text-sm text-foreground/80"
                >
                  <f.icon
                    className="size-5 shrink-0 text-foreground/50"
                    strokeWidth={1.5}
                  />
                  {f.label}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-center text-xs text-muted-foreground/80">
              Pay once. Own forever.
            </p>
          </div>
        </BlobCard>
      </div>
    </div>
  );
}
