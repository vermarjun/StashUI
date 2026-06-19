// ShinyButton: Framer Motion animates a mask gradient (--x) from 100% → -100%
// on loop with a 1s repeatDelay, producing a gliding shiny sweep across the
// text and border. The component also scales 0.8→1 on mount. The signature is
// the continuous sweep — dwell ~6s to show two full cycles. No hover or click
// needed; the animation is self-driven.
export default async function capture(page, { W, H, cfg, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Park the mouse away so no unintended hover shadow appears.
  try {
    await page.mouse.move(cx + 220, cy + 80, { steps: 5 });
  } catch (_) {}

  // Wait for the mount scale spring to settle (~600ms) then let two full
  // sweep cycles play out. Each cycle: sweep (~1.5s spring) + 1s delay ≈ 2.5s.
  await wait(600);

  // Dwell through two sweep cycles.
  await wait(5200);

  // Gentle hover to show the hover:shadow variant briefly.
  try {
    await page.mouse.move(cx, cy, { steps: 18 });
  } catch (_) {}

  await wait(1000);

  // Leave hover — end near resting state for clean loop.
  try {
    await page.mouse.move(cx + 220, cy + 80, { steps: 18 });
  } catch (_) {}

  await wait(400);
}
