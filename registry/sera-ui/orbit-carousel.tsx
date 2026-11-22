"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";

export interface OrbitPerson {
  id: number | string;
  name: string;
  role: string;
  email: string;
  profile: string;
}

// --- Data: team members ---
const defaultPeople: OrbitPerson[] = [
  { id: 1, name: "Maya Lin", role: "Product Designer", email: "maya@stashui.dev", profile: "https://i.pravatar.cc/150?img=47" },
  { id: 2, name: "Daniel Okafor", role: "Staff Engineer", email: "daniel@stashui.dev", profile: "https://i.pravatar.cc/150?img=12" },
  { id: 3, name: "Sofia Ramirez", role: "Design Engineer", email: "sofia@stashui.dev", profile: "https://i.pravatar.cc/150?img=45" },
  { id: 4, name: "Kenji Watanabe", role: "Frontend Lead", email: "kenji@stashui.dev", profile: "https://i.pravatar.cc/150?img=13" },
  { id: 5, name: "Amara Nwosu", role: "Head of Research", email: "amara@stashui.dev", profile: "https://i.pravatar.cc/150?img=44" },
  { id: 6, name: "Lucas Moreau", role: "Motion Designer", email: "lucas@stashui.dev", profile: "https://i.pravatar.cc/150?img=59" },
  { id: 7, name: "Priya Nair", role: "Product Manager", email: "priya@stashui.dev", profile: "https://i.pravatar.cc/150?img=32" },
  { id: 8, name: "Ethan Brooks", role: "Platform Engineer", email: "ethan@stashui.dev", profile: "https://i.pravatar.cc/150?img=68" },
];

// --- Utility for fallback images ---
const safeImage = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.target as HTMLImageElement;
  target.src = "https://placehold.co/100x100/E0E7FF/4338CA?text=Error";
};

// --- Custom hook for mobile detection ---
const useIsMobile = (breakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const checkScreenSize = (): void =>
      setIsMobile(window.innerWidth < breakpoint);

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [breakpoint]);

  return isMobile;
};

// --- Main Component ---
export default function OrbitCarousel({
  people = defaultPeople,
}: {
  people?: OrbitPerson[];
}) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const isMobile = useIsMobile();
  const count = people.length;

  const containerRadius = isMobile ? 130 : 200;
  const profileSize = isMobile ? 60 : 80;
  const containerSize = containerRadius * 2 + 100;

  // Calculate rotation for each profile
  const getRotation = React.useCallback(
    (index: number): number => (index - activeIndex) * (360 / count),
    [activeIndex, count]
  );

  // Navigation
  const next = React.useCallback(
    () => setActiveIndex((i) => (i + 1) % count),
    [count]
  );
  const prev = React.useCallback(
    () => setActiveIndex((i) => (i - 1 + count) % count),
    [count]
  );

  const handleProfileClick = React.useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setActiveIndex(index);
    },
    [activeIndex]
  );

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "ArrowLeft") prev();
      else if (event.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  const active = people[activeIndex];

  return (
    <div className="relative flex min-h-[400px] flex-col items-center p-4 transition-colors duration-300">
      <div
        className="relative flex items-center justify-center"
        style={{ width: containerSize, height: containerSize }}
      >
        {/* Single orbit circle */}
        <div
          className="absolute rounded-full border border-border"
          style={{
            width: containerRadius * 2,
            height: containerRadius * 2,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Active Person Card - Smaller size */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="z-10 w-48 rounded-xl border border-border bg-card p-3 text-center shadow-xl backdrop-blur-sm md:w-52 md:p-4"
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              src={active.profile}
              alt={active.name}
              onError={safeImage}
              className="mx-auto -mt-10 h-16 w-16 rounded-full border-4 border-background object-cover shadow-md md:-mt-12 md:h-20 md:w-20"
            />
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <h2 className="mt-2 text-base font-bold text-card-foreground md:text-lg">
                {active.name}
              </h2>
              <div className="mt-1 flex items-center justify-center text-xs text-muted-foreground md:text-sm">
                <Briefcase size={12} className="mr-1" />
                <span className="truncate">{active.role}</span>
              </div>
              <div className="mt-0.5 flex items-center justify-center text-xs text-muted-foreground/80">
                <Mail size={12} className="mr-1" />
                <span className="truncate">{active.email}</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mt-3 flex items-center justify-center space-x-2"
            >
              <button
                onClick={prev}
                aria-label="Previous"
                className="rounded-full bg-muted p-1.5 transition-colors hover:bg-accent"
              >
                <ChevronLeft size={16} className="text-foreground/80" />
              </button>
              <button className="rounded-full bg-indigo-500 px-4 py-1 text-sm text-white transition-colors hover:bg-indigo-600">
                Connect
              </button>
              <button
                onClick={next}
                aria-label="Next"
                className="rounded-full bg-muted p-1.5 transition-colors hover:bg-accent"
              >
                <ChevronRight size={16} className="text-foreground/80" />
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Orbiting Profiles with Counter-Rotation */}
        {people.map((p, i) => {
          const rotation = getRotation(i);
          return (
            <motion.div
              key={p.id}
              animate={{
                transform: `rotate(${rotation}deg) translateY(-${containerRadius}px)`,
              }}
              transition={{
                duration: 0.8,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              style={{
                width: profileSize,
                height: profileSize,
                position: "absolute",
                top: `calc(50% - ${profileSize / 2}px)`,
                left: `calc(50% - ${profileSize / 2}px)`,
              }}
            >
              {/* Counter-rotation to keep image upright */}
              <motion.div
                animate={{ rotate: -rotation }}
                transition={{
                  duration: 0.8,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="h-full w-full"
              >
                <motion.img
                  src={p.profile}
                  alt={p.name}
                  onError={safeImage}
                  onClick={() => handleProfileClick(i)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`h-full w-full cursor-pointer rounded-full object-cover transition-all duration-300 ${
                    i === activeIndex
                      ? "border-4 border-indigo-400 shadow-lg"
                      : "border-2 border-border hover:border-indigo-500"
                  }`}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
