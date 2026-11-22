"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import ReactLenis from "lenis/react";
import { useEffect, useRef, useState } from "react";

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
  "https://images.unsplash.com/photo-1709949908058-a08659bfa922?w=1600&q=80",
  "https://images.unsplash.com/photo-1693581176773-a5f2362209e6?w=1600&q=80",
  "https://images.unsplash.com/photo-1548192746-dd526f154ed9?w=1600&q=80",
  "https://images.unsplash.com/photo-1761882725885-d3d8bd2032d1?w=1600&q=80",
  "https://images.unsplash.com/photo-1761775915848-467e41c1c4db?w=1600&q=80",
  "https://images.unsplash.com/photo-1760389005000-bf02bf24f463?w=1600&q=80",
];

const Skiper34 = ({ images = DEFAULT_IMAGES }: { images?: string[] }) => {
  return (
    <ReactLenis root>
      <section className="relative flex w-full flex-col items-center gap-[10vh] px-4 pt-[50vh]">
        <div className="absolute left-1/2 top-24 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center">
          <span className="after:from-background after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:content-['']">
            scroll down to see effect
          </span>
        </div>
        {images.map((img, idx) => (
          <StickyCard_003 key={idx} imgUrl={img} />
        ))}
      </section>
    </ReactLenis>
  );
};

const StickyCard_003 = ({ imgUrl }: { imgUrl: string }) => {
  const vertMargin = 10;
  const container = useRef(null);
  const [maxScrollY, setMaxScrollY] = useState(Infinity);

  const filter = useMotionValue(0);
  // Remove filter2, add negateFilter
  const negateFilter = useTransform(filter, (value) => -value);

  const { scrollY } = useScroll({
    target: container,
  });
  // A plain motion value driven by the scroll handler below. It used to be a
  // useTransform over [maxScrollY, maxScrollY + 10000], which with the initial
  // maxScrollY = Infinity resolved to scale 0, so every card stayed invisible.
  const scale = useMotionValue(1);
  const isInView = useInView(container, {
    margin: `0px 0px -${100 - vertMargin}% 0px`,
    once: true,
  });

  useMotionValueEvent(scrollY, "change", (scrollY) => {
    let animationValue = 1;
    if (scrollY > maxScrollY) {
      animationValue = Math.max(0, 1 - (scrollY - maxScrollY) / 10000);
    }

    scale.set(animationValue);
    filter.set((1 - animationValue) * 100);
  });

  useEffect(() => {
    if (isInView) {
      setMaxScrollY(scrollY.get());
    }
  }, [isInView]);

  return (
    <motion.div
      ref={container}
      className="rounded-4xl sticky h-[200px] w-full max-w-4xl overflow-hidden bg-muted"
      style={{
        scale: scale,
        rotate: filter,
        height: `${100 - 2 * vertMargin}vh`,
        top: `${vertMargin}vh`,
      }}
    >
      <motion.img
        src={imgUrl}
        alt={imgUrl}
        style={{
          rotate: negateFilter,
        }}
        className="h-full w-full scale-125 object-cover"
        sizes="90vw"
      />
    </motion.div>
  );
};

export { Skiper34, StickyCard_003 };

/**
 * Skiper 34 StickyCard_003: React + framer motion + lenis
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.me
 * Twitter: https://x.com/Gur__vi
 */
