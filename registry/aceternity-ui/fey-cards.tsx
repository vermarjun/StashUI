"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import type * as React from "react";
import { motion, type Variants } from "motion/react";

const CARD_SPACING = 32;

type ScreenKind = "overview" | "markets" | "inbox" | "calendar" | "analysis";

type HeroCard = {
  id: ScreenKind;
  left: string;
  showIdleSwap?: boolean;
  className?: string;
};

const HERO_CARDS: HeroCard[] = [
  { id: "overview", left: "left-[32px]" },
  { id: "markets", left: "left-[64px]" },
  { id: "inbox", left: "left-[96px]" },
  { id: "calendar", left: "left-[128px]" },
  {
    id: "analysis",
    left: "left-[160px]",
    showIdleSwap: false,
    className: "transition-opacity duration-300",
  },
];

/*
 * Upstream shipped these faces as pre-skewed screenshots of a third-party app.
 * They are rebuilt here as neutral UI: each face is a flat 480x460 "screen"
 * rotated on the Y axis inside the 160x480 card, which reproduces the same
 * steep, receding device angle the stack depends on.
 */
const SCREEN_W = 480;
const SCREEN_H = 460;

const Tilted = ({
  children,
  className,
  style,
  width = SCREEN_W,
}: {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
}) => (
  <div
    className="pointer-events-none absolute inset-0"
    style={{ perspective: 3000, perspectiveOrigin: "50% 50%" }}
  >
    <div
      className={cn(
        "absolute top-1/2 left-1 overflow-hidden rounded-[14px] border border-white/10",
        className,
      )}
      style={{
        width,
        height: SCREEN_H,
        transformOrigin: "left center",
        transform: "translateY(-50%) rotateY(71deg)",
        ...style,
      }}
    >
      {children}
    </div>
  </div>
);

const Bar = ({ w, className }: { w: string; className?: string }) => (
  <div className={cn("h-1.5 rounded-full bg-white/15", className)} style={{ width: w }} />
);

const Spark = ({ points, stroke }: { points: string; stroke: string }) => (
  <svg viewBox="0 0 100 40" className="h-full w-full" preserveAspectRatio="none">
    <polyline points={points} fill="none" stroke={stroke} strokeWidth="1.5" />
  </svg>
);

const ROWS = [
  ["Northwind", "+2.4%", true],
  ["Halcyon", "+1.1%", true],
  ["Brightline", "-0.6%", false],
  ["Meridian", "+3.8%", true],
  ["Cobalt", "-1.9%", false],
  ["Juniper", "+0.7%", true],
  ["Atlas Group", "+1.6%", true],
  ["Sable & Co", "-0.3%", false],
] as const;

const ScreenHeader = ({ title }: { title: string }) => (
  <div className="flex items-center justify-between px-5 pt-5 pb-3">
    <div className="flex items-center gap-2">
      <div className="size-2 rounded-full bg-white/30" />
      <span className="text-[13px] font-semibold text-white/80">{title}</span>
    </div>
    <div className="flex gap-1.5">
      <div className="h-4 w-10 rounded bg-white/10" />
      <div className="h-4 w-10 rounded bg-white/5" />
      <div className="h-4 w-10 rounded bg-white/5" />
    </div>
  </div>
);

const Dock = () => (
  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1 rounded-md border border-white/10 bg-white/10 p-1">
    {Array.from({ length: 7 }).map((_, i) => (
      <div key={i} className="size-3 rounded-sm bg-white/25" />
    ))}
  </div>
);

const ActiveScreen = ({ kind }: { kind: ScreenKind }) => {
  const shell = "relative h-full w-full bg-[#0c0c0e]";
  if (kind === "overview" || kind === "markets") {
    const up = kind === "overview";
    return (
      <div className={shell}>
        <ScreenHeader title={up ? "Good morning, Alex" : "Markets"} />
        <div className="grid grid-cols-2 gap-3 px-5">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <span className="text-[10px] text-white/50">Today</span>
            <p className="text-[12px] font-medium text-white/80">
              Indexes are <span className="text-emerald-400">up 1.2%</span>
            </p>
            <div className="mt-2 h-24">
              <Spark
                stroke={up ? "#f5b26b" : "#a78bfa"}
                points="0,30 10,26 20,28 30,18 40,22 50,12 60,16 70,8 80,14 90,6 100,10"
              />
            </div>
          </div>
          <div className="space-y-2 rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <span className="text-[10px] text-white/50">Briefing</span>
            <Bar w="90%" />
            <Bar w="75%" />
            <Bar w="82%" />
            <Bar w="60%" />
            <Bar w="70%" />
          </div>
        </div>
        <div className="mx-5 mt-3 rounded-lg border border-white/10 bg-white/[0.03] p-3">
          {ROWS.map(([name, delta, pos]) => (
            <div key={name} className="flex items-center justify-between py-[5px] text-[10px]">
              <span className="text-white/60">{name}</span>
              <span className={pos ? "text-emerald-400" : "text-rose-400"}>{delta}</span>
            </div>
          ))}
        </div>
        <Dock />
      </div>
    );
  }
  if (kind === "inbox") {
    return (
      <div className={shell}>
        <ScreenHeader title="Inbox" />
        <div className="space-y-2.5 px-5">
          {["Quarterly review", "Design sync notes", "Invoice #2041", "Team offsite", "Weekly digest", "Launch checklist"].map(
            (subject, i) => (
              <div key={subject} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
                <div className="size-6 rounded-full" style={{ background: `hsl(${i * 55 + 20} 60% 55% / 0.6)` }} />
                <div className="flex-1 space-y-1.5">
                  <p className="text-[11px] font-medium text-white/80">{subject}</p>
                  <Bar w={`${70 - i * 6}%`} className="bg-white/10" />
                </div>
                <span className="text-[9px] text-white/40">{9 + i}:00</span>
              </div>
            ),
          )}
        </div>
        <Dock />
      </div>
    );
  }
  if (kind === "calendar") {
    return (
      <div className={shell}>
        <ScreenHeader title="This week" />
        <div className="grid grid-cols-7 gap-1.5 px-5">
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-12 rounded-md border border-white/[0.06] bg-white/[0.03]",
                [3, 9, 12, 17, 24, 29].includes(i) && "border-sky-400/30 bg-sky-400/15",
                [6, 20].includes(i) && "border-amber-400/30 bg-amber-400/15",
              )}
            />
          ))}
        </div>
        <Dock />
      </div>
    );
  }
  return (
    <div className={shell}>
      <ScreenHeader title="Analysis" />
      <div className="grid grid-cols-2 gap-3 px-5">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <span className="text-[10px] text-white/50">Summary</span>
          <p className="mt-2 text-[13px] leading-snug font-medium text-white/80">
            Hiring rose 3.1% in October, ahead of forecast. Retail demand held steady.
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <span className="text-[10px] text-white/50">Yield curve</span>
          <div className="mt-2 h-20">
            <Spark stroke="#e5e7eb" points="0,20 15,18 30,22 45,19 60,21 75,17 90,14 100,12" />
          </div>
        </div>
      </div>
      <div className="mx-5 mt-3 rounded-lg border border-white/10 bg-white/[0.03] p-3">
        <span className="text-[10px] text-white/50">Calendar</span>
        {ROWS.slice(0, 7).map(([name, delta, pos], i) => (
          <div key={name} className="flex items-center gap-3 py-[5px] text-[10px]">
            <div className="size-2 rounded-full" style={{ background: `hsl(${i * 47} 70% 60%)` }} />
            <span className="flex-1 text-white/60">{name} report</span>
            <span className="text-white/40">{10 + i}:30</span>
            <span className={pos ? "text-emerald-400" : "text-rose-400"}>{delta}</span>
          </div>
        ))}
      </div>
      <Dock />
    </div>
  );
};

const IdleScreen = () => (
  <div
    className="h-full w-full"
    style={{
      background:
        "radial-gradient(120% 60% at 40% 58%, rgba(196,170,120,0.22), transparent 60%), linear-gradient(180deg, #17181b 0%, #0d0d0f 55%, #08080a 100%)",
    }}
  />
);

const MainDevice = () => (
  <Tilted width={SCREEN_W + 40} className="rounded-[18px] border-[5px] border-neutral-800 bg-black">
    <img
      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"
      alt=""
      className="absolute inset-0 h-full w-full object-cover brightness-[0.45] grayscale-[0.4]"
    />
    <div className="absolute inset-x-0 top-0 flex h-6 items-center gap-4 bg-black/40 px-4 text-[10px] text-white/70">
      <div className="size-2.5 rounded-full bg-white/70" />
      <span className="font-semibold">Desktop</span>
      <span>File</span>
      <span>Edit</span>
      <span>View</span>
      <span>Window</span>
      <span>Help</span>
    </div>
  </Tilted>
);

type SpringConfig = {
  type: "spring";
  bounce?: number;
  visualDuration?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
};

const defaultSpring: SpringConfig = {
  type: "spring",
  visualDuration: 0.5,
  bounce: 0.2,
};

export interface FeyCardsProps {
  spring?: SpringConfig;
  shiftDistance?: number;
  swapDuration?: number;
  entranceStagger?: number;
}

export const controls = {
  spring: defaultSpring,
  shiftDistance: [60, 0, 200, 5],
  swapDuration: [0.5, 0, 2, 0.05],
  entranceStagger: [0.1, 0, 0.5, 0.01],
};

export const FeyCards = ({
  spring = defaultSpring,
  shiftDistance = 60,
  swapDuration = 0.5,
  entranceStagger = 0.2,
}: FeyCardsProps = {}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isHovered = activeIndex !== null;
  const swapStyle = { transitionDuration: `${swapDuration}s` };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: entranceStagger,
        staggerDirection: -1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: (offset: number) => ({ x: offset }),
    visible: { x: 0, transition: spring },
  };

  return (
    <div className="relative flex h-full min-h-[600px] w-full items-center justify-center overflow-hidden bg-black">
      <div>
        <motion.h1
          key="solid"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          className={cn(
            "pointer-events-none absolute top-1/2 left-1/2 z-50 mx-auto w-fit -translate-x-1/2 -translate-y-1/2 text-center text-xl font-bold tracking-tight whitespace-nowrap md:text-5xl",
            "bg-clip-text py-4 text-transparent transition-all duration-500",
            "bg-[linear-gradient(to_right,white_0%,rgba(255,255,255,0)_30%,rgba(255,255,255,0)_60%,rgba(255,255,255,0.2)_80%,white_100%)]",
          )}
        >
          Inspired by the pros. Made for you.
        </motion.h1>
        <motion.h1
          key="gradient"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? 0 : 1,
          }}
          className={cn(
            "pointer-events-none absolute top-1/2 left-1/2 z-50 mx-auto w-fit -translate-x-1/2 -translate-y-1/2 text-center text-xl font-bold tracking-tight whitespace-nowrap md:text-5xl",
            "bg-clip-text py-4 text-transparent transition-all duration-500",
            "bg-[linear-gradient(to_right,white,white)]",
          )}
        >
          Inspired by the pros. Made for you.
        </motion.h1>
        <motion.div
          className="relative flex h-120 w-96 mask-b-from-10%"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="absolute inset-y-0 left-0 h-120 w-40">
            <MainDevice />
          </div>

          {HERO_CARDS.map((card, index) => {
            const shouldShift = activeIndex !== null && index > activeIndex;
            const isActive = activeIndex === index;
            const entranceOffset = -index * CARD_SPACING;
            return (
              <motion.div
                key={card.id}
                className={`group absolute -bottom-2 ${card.left} z-20 h-120 w-40 cursor-pointer ${card.className ?? ""}`}
                variants={cardVariants}
                custom={entranceOffset}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={() =>
                  setActiveIndex((current) =>
                    current === index ? null : index,
                  )
                }
              >
                <motion.div
                  className="relative h-full w-full"
                  animate={{ x: shouldShift ? shiftDistance : 0 }}
                  transition={spring}
                >
                  {card.showIdleSwap !== false ? (
                    <>
                      <div
                        style={swapStyle}
                        className={cn(
                          "absolute inset-0 h-full w-full opacity-0 transition-opacity group-hover:opacity-100",
                          isActive && "opacity-100",
                        )}
                      >
                        <Tilted>
                          <ActiveScreen kind={card.id} />
                        </Tilted>
                      </div>
                      <div
                        style={swapStyle}
                        className={cn(
                          "absolute inset-0 h-full w-full opacity-100 transition-opacity group-hover:opacity-0",
                          isActive && "opacity-0",
                        )}
                      >
                        <Tilted>
                          <IdleScreen />
                        </Tilted>
                      </div>
                      <div className="absolute top-8 left-2 z-50 h-full w-4 bg-black blur-md" />
                    </>
                  ) : (
                    <div
                      style={swapStyle}
                      className="absolute inset-0 h-full w-full transition-opacity"
                    >
                      <Tilted>
                        <ActiveScreen kind={card.id} />
                      </Tilted>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default FeyCards;
