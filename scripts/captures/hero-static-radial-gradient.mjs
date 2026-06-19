// hero-static-radial-gradient: SINGLE-SCREEN hero with a static radial
// gradient shader (no animation, immediate render). Strategy: short settle,
// gentle mouse drift across the content + CTA hover.

export default async function capture(page, { W, H, cfg, wait }) {
  // Short settle — StaticRadialGradient has no speed param so it's instant
  await wait(800);

  const cx = W / 2;
  const cy = H / 2;

  // Move to heading region
  try {
    await page.mouse.move(cx * 0.25, cy * 0.7, { steps: 15 });
  } catch (_) {}
  await wait(300);

  // Drift across the headline text
  try {
    await page.mouse.move(cx * 0.8, cy * 0.85, { steps: 40 });
  } catch (_) {}
  await wait(350);

  // Hover over the CTA button
  try {
    await page.mouse.move(cx * 0.28, cy * 1.1, { steps: 20 });
  } catch (_) {}
  await wait(600);

  // Move off CTA so hover state releases, drift toward the gradient panel
  try {
    await page.mouse.move(cx * 1.45, cy * 0.85, { steps: 45 });
  } catch (_) {}
  await wait(500);

  // Settle back to content area
  try {
    await page.mouse.move(cx * 0.5, cy * 0.95, { steps: 30 });
  } catch (_) {}
  await wait(400);
}
