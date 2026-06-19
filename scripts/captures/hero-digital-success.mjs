// hero-digital-success — SINGLE-SCREEN with WebGL ShaderGradient background
// TimelineAnimation entries stagger in on mount (animationNum 1-12).
// Strategy: wait for the WebGL sphere to settle, let all stagger-in animations
// finish, then drift the cursor toward the CTA button and dwell.

export default async function capture(page, { W, H, cfg, wait }) {
  // Give the ShaderGradientCanvas time to initialise and the stagger
  // animations (~12 items, each ~80ms apart) to complete
  await wait(2000);

  // Gentle drift from centre toward the "Book a Consultation" CTA button
  // (located in the lower-left quadrant at roughly 30% x, 70% y)
  const cx = W / 2;
  const cy = H / 2;

  try {
    await page.mouse.move(cx, cy, { steps: 1 });
  } catch (_) {}
  await wait(300);

  try {
    // Drift toward the primary CTA
    await page.mouse.move(Math.round(W * 0.28), Math.round(H * 0.68), { steps: 40 });
  } catch (_) {}
  await wait(800);

  // Hover the "Book a Consultation" button (shadow glow on hover)
  try {
    await page.mouse.move(Math.round(W * 0.25), Math.round(H * 0.72), { steps: 20 });
  } catch (_) {}
  await wait(700);

  // Drift to the secondary "More about us" button
  try {
    await page.mouse.move(Math.round(W * 0.38), Math.round(H * 0.72), { steps: 25 });
  } catch (_) {}
  await wait(600);

  // Return near centre so the gradient sphere is visible for the loop
  try {
    await page.mouse.move(cx, Math.round(H * 0.45), { steps: 30 });
  } catch (_) {}
  await wait(400);
}
