"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/ui-layouts/magnified-doc";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";

const dockItems = [
  { label: "Home", icon: "⌂" },
  { label: "Search", icon: "⌕" },
  { label: "Files", icon: "⊟" },
  { label: "Messages", icon: "✉" },
  { label: "Settings", icon: "⚙" },
];

function DockIcon({
  mouseX,
  label,
  icon,
}: {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  label: string;
  icon: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const size = useSpring(useTransform(distance, [-80, 0, 80], [40, 60, 40]), {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.button
          ref={ref}
          style={{ width: size, height: size }}
          className="flex items-center justify-center rounded-xl border border-border bg-background text-xl shadow-sm transition-colors hover:bg-muted focus:outline-none"
          aria-label={label}
        >
          {icon}
        </motion.button>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={8}>
        <p className="text-xs font-medium">{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default function Demo() {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="flex min-h-[280px] flex-col items-center justify-end pb-10">
      <TooltipProvider delayDuration={0}>
        <motion.div
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="flex h-16 items-end gap-2 rounded-2xl border border-border bg-background/80 px-4 pb-2 shadow-lg backdrop-blur-sm"
        >
          {dockItems.map((item) => (
            <DockIcon
              key={item.label}
              mouseX={mouseX}
              label={item.label}
              icon={item.icon}
            />
          ))}
        </motion.div>
      </TooltipProvider>
    </div>
  );
}
