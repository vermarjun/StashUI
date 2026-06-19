"use client";

import { ShiftCard } from "@/registry/cult-ui/shift-card";

const avatar =
  "https://api.dicebear.com/9.x/avataaars/svg?seed=shiftcard&size=48";

export default function ShiftCardDemo() {
  return (
    <div className="flex items-center justify-center w-full p-8">
      <ShiftCard
        topContent={
          <div className="flex items-center gap-2">
            <img
              src={avatar}
              alt="User"
              className="size-8 rounded-full border border-border"
            />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-foreground">
                Jordan Lee
              </p>
              <p className="text-xs text-muted-foreground">@jordanlee</p>
            </div>
          </div>
        }
        topAnimateContent={
          <p className="mt-1 text-xs text-muted-foreground">
            Full-stack dev · Open to work
          </p>
        }
        middleContent={
          <div className="flex flex-col items-center gap-3 py-4">
            <img
              src={avatar}
              alt="User large"
              className="size-20 rounded-full border-2 border-border"
            />
            <p className="text-sm font-medium text-foreground">Jordan Lee</p>
          </div>
        }
        bottomContent={
          <div className="flex flex-col gap-2 rounded-xl bg-muted/60 p-4">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Followers</span>
              <span className="font-semibold">4.2k</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Following</span>
              <span className="font-semibold">318</span>
            </div>
            <button className="mt-1 w-full rounded-lg bg-foreground py-1.5 text-xs font-medium text-background">
              Follow
            </button>
          </div>
        }
      />
    </div>
  );
}
