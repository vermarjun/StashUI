export default async function capture(page, { W, H, cfg, wait }) {
  // The Safari mockup is largely static SVG chrome. We do a slow parallax-style
  // mouse drift diagonally across the first (image-filled) mockup card, then
  // drift back, giving the looped video a subtle sense of depth and life.

  // Start near the top-left of the first mockup card
  const startX = Math.round(W * 0.2);
  const startY = Math.round(H * 0.25);
  const endX   = Math.round(W * 0.75);
  const endY   = Math.round(H * 0.6);

  // Move mouse to starting position (no hover effect, just sets cursor context)
  try {
    await page.mouse.move(startX, startY);
  } catch (_) {}

  await wait(400);

  // Slow drift right-and-down across the mockup in small increments (~3.5s total)
  const steps = 28;
  const stepDuration = 125; // ms per step → 28 * 125 = 3500 ms
  for (let i = 1; i <= steps; i++) {
    try {
      const t = i / steps;
      // Ease in-out cubic: smoother acceleration/deceleration
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const x = Math.round(startX + (endX - startX) * ease);
      const y = Math.round(startY + (endY - startY) * ease);
      await page.mouse.move(x, y);
    } catch (_) {}
    await wait(stepDuration);
  }

  // Dwell at end position briefly
  await wait(400);

  // Drift back toward start so the loop is seamless
  const returnSteps = 20;
  const returnStepDuration = 100;
  for (let i = 1; i <= returnSteps; i++) {
    try {
      const t = i / returnSteps;
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const x = Math.round(endX + (startX - endX) * ease);
      const y = Math.round(endY + (startY - endY) * ease);
      await page.mouse.move(x, y);
    } catch (_) {}
    await wait(returnStepDuration);
  }

  // End near start position — loop is clean
  await wait(300);
}
