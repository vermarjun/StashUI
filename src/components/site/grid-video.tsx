"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { getPreview } from "@/__registry__/previews.gen";
import {
  clipUrls,
  pickTier,
  requestSlot,
  type Tier,
} from "@/lib/preview-quality";

/** How long a card must sit on screen before its clip starts downloading. */
const DWELL_MS = 250;

/**
 * A looped, muted grid clip, layered so a card is never an empty box:
 *
 *   1. lq: a ~100-byte 32px webp, blurred. Arrives almost instantly, so
 *               even a fast fling through the gallery shows the card's colours.
 *   2. poster: a 640px webp (a few KB), fades in over the blur.
 *   3. video: the clip, in the rendition this device + link can afford
 *               (src/lib/preview-quality.ts), fading in once frames paint.
 *
 * The clip only loads once the card is at least half on screen for DWELL_MS,
 * so scrolling past cards starts no downloads. Leaving the screen mid-download
 * cancels the transfer; a fully buffered clip just pauses (resuming is free).
 * A global ration caps how many clips play at once.
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
  const { v, tiers } = getPreview(name);
  const urls = React.useMemo(() => clipUrls(name, v, tiers), [name, v, tiers]);

  const boxRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const posterRef = React.useRef<HTMLImageElement>(null);
  const [inView, setInView] = React.useState(false);
  const [posterReady, setPosterReady] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);
  // On a slow link a clip waits for its poster, so the few KB of poster are
  // never stuck queueing behind a clip download. `retry` re-arms the effect.
  const posterLoaded = React.useRef(false);
  const waitingOnPoster = React.useRef(false);
  const [retry, setRetry] = React.useState(0);

  const onPosterLoad = React.useCallback(() => {
    posterLoaded.current = true;
    setPosterReady(true);
    if (waitingOnPoster.current) {
      waitingOnPoster.current = false;
      setRetry((r) => r + 1);
    }
  }, []);

  // A poster already in cache can finish before hydration attaches onLoad.
  React.useEffect(() => {
    if (posterRef.current?.complete && posterRef.current.naturalWidth) onPosterLoad();
  }, [urls.poster, onPosterLoad]);

  React.useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(!!entry && entry.intersectionRatio >= 0.5),
      { threshold: [0, 0.5] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    const video = videoRef.current;
    const box = boxRef.current;
    if (!video || !box || !inView) return;

    let release: (() => void) | null = null;
    let tier: Tier = "off";
    const dwell = window.setTimeout(() => {
      tier = pickTier(box.clientWidth);
      if (tier === "off") return; // posters only
      if (tier === "lo" && !posterLoaded.current) {
        waitingOnPoster.current = true;
        return;
      }
      release = requestSlot(tier, () => {
        const src = urls.video(tier as Exclude<Tier, "off">);
        if (video.getAttribute("src") !== src) video.src = src;
        const p = video.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      });
    }, DWELL_MS);

    return () => {
      window.clearTimeout(dwell);
      release?.();
      video.pause();
      if (!fullyBuffered(video)) {
        // Cancel the in-flight download instead of letting it finish offscreen.
        video.removeAttribute("src");
        video.load();
        setPlaying(false);
      }
    };
  }, [inView, urls, retry]);

  return (
    <div
      ref={boxRef}
      className={cn(
        "relative aspect-[8/5] w-full overflow-hidden bg-[#0a0a0a]",
        className,
      )}
    >
      {urls.lq && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={urls.lq}
          alt=""
          aria-hidden
          decoding="async"
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl"
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={posterRef}
        src={urls.poster}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        onLoad={onPosterLoad}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-out",
          posterReady || !urls.lq ? "opacity-100" : "opacity-0",
        )}
      />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        aria-label={title ? `${title} preview` : undefined}
        onPlaying={() => setPlaying(true)}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-out",
          playing ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}

function fullyBuffered(v: HTMLVideoElement) {
  if (!v.duration || !v.buffered.length) return false;
  return v.buffered.end(v.buffered.length - 1) >= v.duration - 0.1;
}
