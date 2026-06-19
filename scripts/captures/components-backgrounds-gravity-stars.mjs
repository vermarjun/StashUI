/**
 * Capture choreography for: components-backgrounds-gravity-stars
 * Behaviour: canvas star particles with gravity attraction toward the mouse
 * (default: mouseGravity='attract', mouseInfluence=100). Stars drift at
 * movementSpeed=0.3 and glow with glowIntensity=15 (ease animation). Stars
 * converge toward the cursor — sweeping the mouse creates a comet-trail effect.
 */
export default async function capture(page, { W, H, wait }) {
  // Let the canvas mount and initial star positions settle
  try {
    await page.locator('canvas').first().waitFor({ state: 'visible', timeout: 6000 });
  } catch (_) {}

  try {
    await wait(600);
  } catch (_) {}

  // Park mouse at centre — stars begin attracting from all directions
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 10 });
    await wait(800);
  } catch (_) {}

  // Slow circular sweep to pull stars in a ring pattern
  try {
    const steps = 48;
    const cx = W * 0.5;
    const cy = H * 0.5;
    const r = Math.min(W, H) * 0.25;
    for (let i = 0; i <= steps; i++) {
      try {
        const angle = (2 * Math.PI * i) / steps;
        await page.mouse.move(
          cx + r * Math.cos(angle),
          cy + r * Math.sin(angle)
        );
      } catch (_) {}
      await wait(40);
    }
  } catch (_) {}

  // Return to centre and let stars re-converge
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 12 });
    await wait(1000);
  } catch (_) {}

  // Final dwell — stars cluster around centre
  try {
    await wait(800);
  } catch (_) {}
}
