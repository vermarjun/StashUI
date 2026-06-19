/**
 * Capture choreography for feature-velocity (scroll:true, min-h-screen).
 *
 * Component: dark full-page section — large "HIGH VELOCITY DISTRIBUTION"
 * heading + 3 hover-gradient feature cards (Neural Link, Data Core, Fluid UI).
 * Cards animate a coloured gradient on hover (group-hover:opacity-100).
 * The section is taller than a single viewport.
 * Strategy: settle, hover each of the 3 cards in sequence so the
 * coloured gradient appears, then smooth-scroll back to top.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Start at top
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await wait(700);
  } catch (_) {}

  // Wheel down past the header to reach the card row
  try {
    await page.mouse.wheel(0, Math.round(H * 0.6));
    await wait(550);
  } catch (_) {}

  // Three cards span ~W*0.15..W*0.9, roughly equal thirds
  const cardYApprox = Math.round(H * 0.55);
  const cardXPositions = [
    Math.round(W * 0.2),   // Neural Link
    Math.round(W * 0.5),   // Data Core
    Math.round(W * 0.8),   // Fluid UI
  ];

  for (const cx of cardXPositions) {
    try {
      await page.mouse.move(cx, cardYApprox, { steps: 12 });
      await wait(600); // dwell so gradient fades in fully
    } catch (_) {}
  }

  // Dwell on last card a moment longer
  try {
    await wait(400);
  } catch (_) {}

  // Smooth-scroll back to top
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(900);
  } catch (_) {}

  try {
    await wait(300);
  } catch (_) {}
}
