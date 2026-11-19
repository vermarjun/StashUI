import { CheckIcon } from "lucide-react";

import { Badge } from "@/registry/origin-ui/badge";

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge className="gap-1" variant="outline">
          <CheckIcon aria-hidden="true" className="text-emerald-500" size={12} />
          Verified
        </Badge>
        <Badge className="gap-1.5" variant="outline">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-amber-500" />
          Pending
        </Badge>
        <Badge className="min-w-5 px-1">12</Badge>
        <Badge asChild variant="secondary">
          <a href="#">Link badge</a>
        </Badge>
      </div>
    </div>
  );
}
