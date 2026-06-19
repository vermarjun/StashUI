/**
 * Choreography: VariableProximity-TS-TW
 * Behavior: each character's font-variation-settings interpolates between thin
 * (wght 100, wdth 75) and heavy (wght 900, wdth 125) based on cursor distance
 * within radius 120px. Moving the cursor slowly across both lines activates
 * the proximity effect on every character.
 */
export default async function capture(page, { W, H, wait }) {
  // The demo has two text lines stacked; first line ~40% height, second ~60%
  const line1Y = Math.round(H * 0.38);
  const line2Y = Math.round(H * 0.60);
  const startX = Math.round(W * 0.07);
  const endX = Math.round(W * 0.93);

  // Allow Roboto Flex to load + component to mount
  try {
    await wait(600);
  } catch (_) {}

  // Enter from far left at line 1
  try {
    await page.mouse.move(startX, line1Y);
    await wait(200);
  } catch (_) {}

  // Sweep right across line 1 — 55 steps × 38ms ≈ 2.1 s
  try {
    const steps = 55;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = Math.round(startX + (endX - startX) * t);
      await page.mouse.move(x, line1Y);
      await wait(38);
    }
  } catch (_) {}

  // Transition down to line 2
  try {
    await page.mouse.move(endX, line2Y, { steps: 10 });
    await wait(200);
  } catch (_) {}

  // Sweep back left across line 2 — 45 steps × 38ms ≈ 1.7 s
  try {
    const steps = 45;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = Math.round(endX - (endX - startX) * t);
      await page.mouse.move(x, line2Y);
      await wait(38);
    }
  } catch (_) {}

  // Dwell so the last chars finish settling
  try {
    await wait(500);
  } catch (_) {}

  // Return near start position (top-left of container)
  try {
    await page.mouse.move(startX, line1Y, { steps: 14 });
    await wait(300);
  } catch (_) {}
}
