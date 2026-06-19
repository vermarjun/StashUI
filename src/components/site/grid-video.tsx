"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * A looped, muted grid clip that only plays while on screen.
 *
 * Every card mounts one of these, but an IntersectionObserver pauses any clip
 * scrolled out of view and resumes it on the way back — so no matter how long
 * the gallery gets, only the handful of cards in the viewport are ever
 * decoding video. The poster frame shows while paused/offscreen, so idle cards
 * cost nothing.
 */
export function GridVideo({
  name,
  title,
  className,
}: {
  name: string;
  title?: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLVideoElement>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(!!entry?.isIntersecting),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (inView) {
      const p = el.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } else {
      el.pause();
    }
  }, [inView]);

  return (
    <div
      className={cn(
        "relative aspect-[8/5] w-full overflow-hidden bg-background",
        className,
      )}
    >
      <video
        ref={ref}
        poster={`/previews/${name}.jpg`}
        muted
        loop
        playsInline
        preload="none"
        aria-label={title ? `${title} preview` : undefined}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={`/previews/${name}.webm`} type="video/webm" />
        <source src={`/previews/${name}.mp4`} type="video/mp4" />
      </video>
    </div>
  );
}
