// Choreography for corporate-clippath (clip-path-corporate)
// A 3-column grid of portrait photos each clipped by a corporate geometric shape:
// tab-notch top-left, folded-corner top-left, dog-ear top-right.
// Hover triggers scale-105. Strategy: settle, hover each figure in sequence,
// dwell ~0.6s each, gentle return to center.

export default async function capture(page, { W, H, cfg, wait }) {
  try {
    await page.locator('figure').first().waitFor({ state: 'visible', timeout: 6000 });
  } catch (_) {}

  await wait(600);

  const cols = [0.18, 0.50, 0.82];
  const row = 0.50;

  // Hover left figure
  try {
    await page.mouse.move(W * cols[0], H * row, { steps: 12 });
  } catch (_) {}
  await wait(700);

  // Drift to center figure
  try {
    await page.mouse.move(W * cols[1], H * row, { steps: 16 });
  } catch (_) {}
  await wait(700);

  // Drift to right figure
  try {
    await page.mouse.move(W * cols[2], H * row, { steps: 16 });
  } catch (_) {}
  await wait(700);

  // Slow drift upward on the right figure to show the dog-ear corner
  try {
    const steps = 20;
    for (let i = 0; i <= steps; i++) {
      try {
        const t = i / steps;
        await page.mouse.move(W * cols[2], H * (row - 0.30 * t));
      } catch (_) {}
      await wait(40);
    }
  } catch (_) {}

  await wait(500);

  // Return to center
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 16 });
  } catch (_) {}
  await wait(600);
}
