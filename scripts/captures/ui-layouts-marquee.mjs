// ui-layouts-marquee: CSS-animated horizontal marquee (repeat=4 rows by default).
// The demo renders <Marquee /> with no explicit children — the component itself
// contains the repeating content. Keep mouse away from the strip to avoid
// pauseOnHover. Dwell ~3 s so several items cycle through.
export default async function capture(page, { W, H, cfg, wait }) {
  // Park mouse well above/below the marquee strip.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.1), { steps: 5 });
  } catch (_) {}

  // Settle: let CSS animation start.
  try { await wait(400); } catch (_) {}

  // Dwell ~3 s — marquee default duration is 40 s, so 3 s scrolls ~7.5 %
  // of the strip — enough to see clear motion.
  try { await wait(3000); } catch (_) {}

  // Keep parked — no further interaction.
  try { await wait(200); } catch (_) {}
}
