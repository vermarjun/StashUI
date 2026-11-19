"use client";

import { motion } from "motion/react";
import { ArrowUpRight, MapPin } from "lucide-react";

import { ShiftCard } from "@/registry/cult-ui/shift-card";

const avatar =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=320&h=320&fit=crop&auto=format&q=80";

export default function ShiftCardDemo() {
  return (
    <div className="flex min-h-[460px] w-full items-center justify-center p-8">
      <ShiftCard
        className="min-h-[340px]"
        topContent={
          <div className="flex items-center justify-between rounded-md bg-muted/60 px-2.5 py-1.5 text-foreground">
            <div className="flex items-center gap-1.5 text-xs font-medium">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Open to work
            </div>
            <span className="text-xs text-muted-foreground">Design Engineer</span>
          </div>
        }
        topAnimateContent={
          <motion.img
            layoutId="shift-card-avatar"
            src={avatar}
            alt="Sofia Marquez"
            className="absolute top-12 left-1 size-14 rounded-xl object-cover shadow-lg"
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        }
        middleContent={
          <motion.img
            layoutId="shift-card-avatar"
            src={avatar}
            alt="Sofia Marquez"
            className="mt-3 size-36 rounded-2xl object-cover shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6)]"
            transition={{ duration: 0.3, ease: "easeIn" }}
          />
        }
        bottomContent={
          <div className="rounded-xl border-t border-border bg-card px-4 pb-4">
            <div className="flex h-[38px] items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">Sofia Marquez</h3>
              <ArrowUpRight className="size-4 text-muted-foreground" />
            </div>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" /> Lisbon · ex-Figma, ex-Linear
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Builds design systems and the motion that makes them feel alive.
            </p>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span>
                <b className="text-foreground">4.2k</b>{" "}
                <span className="text-muted-foreground">followers</span>
              </span>
              <span>
                <b className="text-foreground">318</b>{" "}
                <span className="text-muted-foreground">following</span>
              </span>
              <button className="rounded-md bg-foreground px-3 py-1 font-medium text-background">
                Follow
              </button>
            </div>
          </div>
        }
      />
    </div>
  );
}
