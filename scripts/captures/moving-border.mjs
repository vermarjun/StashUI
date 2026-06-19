export default async function capture(page, { W, H, cfg, wait }) {
  // The moving-border button has a glowing dot that orbits the border
  // continuously — this is an auto-animation. The best capture is a long dwell
  // so the viewer sees at least one full orbit, then a hover pass.

  // 1. Let the orbiting border dot complete ~1.5 circuits (duration=3000ms).
  try {
    await wait(4500);
  } catch (_) {}

  // 2. Hover over the button — the border-slot doesn't change on hover but the
  //    cursor presence makes the card feel interactive.
  try {
    const btn = page.locator("button").first();
    await btn.hover({ force: true });
    await wait(1500);
  } catch (_) {}

  // 3. Move away and let another half-orbit play before the loop seam.
  try {
    await page.mouse.move(W * 0.15, H * 0.2, { steps: 20 });
    await wait(1000);
  } catch (_) {}
}
