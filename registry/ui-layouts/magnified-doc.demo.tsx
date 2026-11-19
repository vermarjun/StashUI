"use client";

import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  MailIcon,
  MusicIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";
import {
  type MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { type ComponentType, useRef } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/ui-layouts/magnified-doc";

const dockItems = [
  { label: "Home", icon: HomeIcon },
  { label: "Search", icon: SearchIcon },
  { label: "Files", icon: FolderIcon },
  { label: "Mail", icon: MailIcon },
  { label: "Calendar", icon: CalendarIcon },
  { label: "Music", icon: MusicIcon },
  { label: "Settings", icon: SettingsIcon },
];

function DockIcon({
  mouseX,
  label,
  icon: Icon,
}: {
  mouseX: MotionValue<number>;
  label: string;
  icon: ComponentType<{ className?: string }>;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const size = useSpring(useTransform(distance, [-120, 0, 120], [48, 76, 48]), {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.button
          aria-label={label}
          className="flex items-center justify-center rounded-2xl border border-border bg-muted text-foreground shadow-sm transition-colors hover:bg-accent focus:outline-none"
          ref={ref}
          style={{ width: size, height: size }}
        >
          <Icon className="size-1/2" />
        </motion.button>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={10}>
        <p className="font-medium text-xs">{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default function Demo() {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="flex min-h-[420px] w-full flex-col items-center justify-end gap-6 pb-16">
      <p className="text-muted-foreground text-sm">Hover the dock</p>
      <TooltipProvider delayDuration={0}>
        <motion.div
          className="flex h-20 items-end gap-3 rounded-3xl border border-border bg-card/80 px-4 pb-3 shadow-lg backdrop-blur-sm"
          onMouseLeave={() => mouseX.set(Infinity)}
          onMouseMove={(e) => mouseX.set(e.clientX)}
        >
          {dockItems.map((item) => (
            <DockIcon
              icon={item.icon}
              key={item.label}
              label={item.label}
              mouseX={mouseX}
            />
          ))}
        </motion.div>
      </TooltipProvider>
    </div>
  );
}
