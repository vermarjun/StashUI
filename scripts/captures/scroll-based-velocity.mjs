// scroll-based-velocity: marquee rows whose speed spikes with scroll velocity.
// Strategy: ensure page focus → dwell (idle speed) → fast wheel down (speed
// spike visible) → dwell → fast wheel back up (reverse spike) → settle at top.
export default async function capture(page, { W, H, wait }) {
  // Click to ensure the page has focus so wheel events are captured.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 5 });
    await page.mouse.click(Math.round(W * 0.5), Math.round(H * 0.5));
  } catch (_) {}

  // Idle dwell — show the base marquee speed before interaction.
  try {
    await wait(1200);
  } catch (_) {}

  // Fast wheel downward — 8 rapid ticks to build velocity.
  try {
    for (let i = 0; i < 8; i++) {
      await page.mouse.wheel(0, 300);
      await wait(60);
    }
  } catch (_) {}

  // Brief dwell at speed peak.
  try {
    await wait(600);
  } catch (_) {}

  // Fast wheel back up — reverses velocity and marquee direction/speed.
  try {
    for (let i = 0; i < 8; i++) {
      await page.mouse.wheel(0, -300);
      await wait(60);
    }
  } catch (_) {}

  // Settle: spring damping brings velocity back to zero over ~0.5 s.
  try {
    await wait(800);
  } catch (_) {}

  // Return to page top to close the loop.
  try {
    await page.evaluate(() => window.scrollTo({ top: 0 }));
    await wait(400);
  } catch (_) {}
}
