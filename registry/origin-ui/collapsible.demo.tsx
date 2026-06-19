"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/origin-ui/collapsible";

export default function Demo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-sm px-4">
      <Collapsible open={open} onOpenChange={setOpen} className="rounded-md border bg-background">
        <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-3 font-semibold text-sm [&[data-state=open]>svg]:rotate-180">
          What is a collapsible?
          <ChevronDownIcon
            aria-hidden="true"
            className="shrink-0 opacity-60 transition-transform duration-200"
            size={16}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden px-4 pb-3 text-muted-foreground text-sm transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          A collapsible is a single expandable section that shows or hides its
          content when triggered. It is simpler than an accordion and has no
          concept of exclusive open state.
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
