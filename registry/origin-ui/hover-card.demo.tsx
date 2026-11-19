"use client";

import { CalendarIcon } from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/registry/origin-ui/hover-card";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center">
      <p className="text-muted-foreground text-sm">
        Built and maintained by{" "}
        <HoverCard closeDelay={100} openDelay={0}>
          <HoverCardTrigger asChild>
            <a
              className="font-medium text-foreground underline underline-offset-4"
              href="#"
            >
              @origin_ui
            </a>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex items-start gap-3">
              <img
                alt="Origin UI"
                className="size-10 shrink-0 rounded-full"
                height={40}
                src="https://i.pravatar.cc/80?img=32"
                width={40}
              />
              <div className="space-y-1">
                <p className="font-medium text-sm">@origin_ui</p>
                <p className="text-muted-foreground text-sm">
                  Beautiful UI components built with Tailwind CSS and React.
                </p>
                <div className="flex items-center gap-1.5 pt-1 text-muted-foreground text-xs">
                  <CalendarIcon aria-hidden="true" size={12} />
                  Joined December 2023
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        .
      </p>
    </div>
  );
}
