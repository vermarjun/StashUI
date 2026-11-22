/**
 * Picks which rendition of a grid clip to load, and rations how many play.
 *
 * Grid clips are short muted loops, so instead of HLS/DASH segment switching
 * each card picks ONE whole rendition at the moment it starts loading:
 *
 *   tier = min(what the link can sustain, what the card's pixels can show)
 *
 * - Link: a rolling estimate of real throughput, measured from the clips we
 *   have already downloaded (Resource Timing), persisted in localStorage so a
 *   return visit starts at the right tier. Before the first measurement it
 *   seeds from navigator.connection (Chromium) or assumes "md".
 * - Pixels: card CSS width × devicePixelRatio (capped at 2). A 360px card on a
 *   1x screen never needs the 960px rendition, whatever the bandwidth (it
 *   still gets md: lo is reserved for slow links).
 * - "off": Save-Data, 2G, or prefers-reduced-motion → posters only.
 */

export type ClipTier = "hi" | "md" | "lo";
export type Tier = ClipTier | "off";

const ORDER: Tier[] = ["off", "lo", "md", "hi"];
const rank = (t: Tier) => ORDER.indexOf(t);
const minTier = (a: Tier, b: Tier): Tier => (rank(a) <= rank(b) ? a : b);

/** Rendition widths, mirrored from scripts/encode-previews.mjs. */
const WIDTH: Record<ClipTier, number> = { hi: 960, md: 640, lo: 400 };

const STORE_KEY = "stashui:bw-kbps";
/** kbps a tier needs to keep ~4 clips loading without stalling. */
const NEEDS: Record<ClipTier, number> = { hi: 6000, md: 2500, lo: 0 };

interface NetInfo {
  saveData?: boolean;
  effectiveType?: string;
  downlink?: number;
  addEventListener?: (t: string, cb: () => void) => void;
}

const connection = (): NetInfo | undefined =>
  typeof navigator === "undefined"
    ? undefined
    : (navigator as Navigator & { connection?: NetInfo }).connection;

let estimateKbps: number | null = null;
let loaded = false;

function readStored() {
  if (loaded) return;
  loaded = true;
  try {
    const v = Number(localStorage.getItem(STORE_KEY));
    if (Number.isFinite(v) && v > 0) estimateKbps = v;
  } catch {
    /* storage blocked: measure fresh */
  }
}

function linkTier(): Tier {
  const c = connection();
  if (c?.saveData) return "off";
  if (c?.effectiveType === "slow-2g" || c?.effectiveType === "2g") return "off";
  readStored();
  // A real measurement beats the browser's coarse hint.
  const kbps = estimateKbps ?? (c?.downlink ? c.downlink * 1000 : null);
  if (kbps == null) return c?.effectiveType === "3g" ? "lo" : "md";
  if (kbps >= NEEDS.hi) return "hi";
  if (kbps >= NEEDS.md) return "md";
  return "lo";
}

function pixelTier(cardCssWidth: number): ClipTier {
  const dpr = typeof window === "undefined" ? 1 : Math.min(window.devicePixelRatio || 1, 2);
  const px = cardCssWidth * dpr;
  // Smallest rendition with at least ~85% of the pixels shown. Never "lo" on
  // size alone: it also drops to 24fps and a coarser CRF, a bandwidth trade.
  return px <= WIDTH.md / 0.85 ? "md" : "hi";
}

function reducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

/** The rendition a card of this width should load right now. */
export function pickTier(cardCssWidth: number): Tier {
  observeDownloads();
  if (reducedMotion()) return "off";
  return minTier(linkTier(), pixelTier(cardCssWidth || 520));
}

/**
 * Throughput from real downloads: a PerformanceObserver sees every finished
 * /previews/ response (clips and posters). Cached responses (transferSize 0)
 * and tiny files are mostly latency, so they say nothing about the link.
 */
let observing = false;
function observeDownloads() {
  if (observing || typeof PerformanceObserver === "undefined") return;
  observing = true;
  try {
    new PerformanceObserver((list) => {
      for (const e of list.getEntries() as PerformanceResourceTiming[]) {
        if (!e.name.includes("/previews/") || e.transferSize < 20_000) continue;
        const ms = e.responseEnd - e.responseStart;
        if (ms > 0) record((e.transferSize * 8) / ms); // bytes·8 / ms = kbit/s
      }
    }).observe({ type: "resource", buffered: true });
  } catch {
    /* no resource timing: the connection hint / default still applies */
  }
}

function record(kbps: number) {
  readStored();
  // EWMA: one fast/slow clip nudges the estimate rather than flipping it.
  estimateKbps = estimateKbps == null ? kbps : estimateKbps * 0.7 + kbps * 0.3;
  try {
    localStorage.setItem(STORE_KEY, String(Math.round(estimateKbps)));
  } catch {
    /* fine: in-memory estimate still applies this visit */
  }
}

/**
 * Concurrency ration: at most N clips decode/download at once. Cards past the
 * limit wait (showing their poster) and start as soon as one leaves.
 */
const MAX_ACTIVE: Record<Tier, number> = { hi: 6, md: 6, lo: 4, off: 0 };
const active = new Set<symbol>();
const waiting: { id: symbol; start: () => void }[] = [];

export function requestSlot(tier: Tier, start: () => void): () => void {
  const id = Symbol();
  const limit = MAX_ACTIVE[tier];
  if (active.size < limit) {
    active.add(id);
    start();
  } else {
    waiting.push({ id, start });
  }
  return () => {
    const i = waiting.findIndex((w) => w.id === id);
    if (i >= 0) waiting.splice(i, 1);
    if (active.delete(id)) {
      const next = waiting.shift();
      if (next) {
        active.add(next.id);
        next.start();
      }
    }
  };
}

/** URLs for a clip. Untiered clips fall back to the master files. */
export function clipUrls(name: string, v: string | undefined, tiers: boolean | undefined) {
  const q = v ? `?v=${v}` : "";
  return tiers
    ? {
        lq: `/previews/lq/${name}.webp${q}`,
        poster: `/previews/poster/${name}.webp${q}`,
        video: (t: ClipTier) => `/previews/${t}/${name}.mp4${q}`,
      }
    : {
        lq: null,
        poster: `/previews/${name}.jpg${q}`,
        video: () => `/previews/${name}.mp4${q}`,
      };
}

const warmed = new Set<string>();

/**
 * Pre-fetch the image layers (lq + poster, a few KB each) for cards that are
 * about to appear, in idle time, so they are already in cache when the user
 * scrolls there. Never pre-fetches video, and skips slow links / Save-Data.
 */
export function warmPosters(
  items: { name: string; v?: string; tiers?: boolean }[],
) {
  // On a slow link the visible cards' posters need every byte; don't warm.
  if (typeof window === "undefined" || rank(linkTier()) < rank("md")) return;
  const todo = items.filter((i) => !warmed.has(i.name));
  if (!todo.length) return;
  const idle =
    (window as Window & { requestIdleCallback?: (cb: () => void) => number })
      .requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
  idle(() => {
    for (const i of todo) {
      warmed.add(i.name);
      const u = clipUrls(i.name, i.v, i.tiers);
      for (const src of [u.lq, u.poster]) {
        if (!src) continue;
        const img = new Image();
        img.decoding = "async";
        (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = "low";
        img.src = src;
      }
    }
  });
}
