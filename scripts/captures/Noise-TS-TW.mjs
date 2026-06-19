/**
 * Capture script: Noise-TS-TW
 * Choreography: Noise is a fullscreen canvas animation — no cursor interaction.
 * Simply dwell ~3s so the animated grain is clearly visible in the GIF frames.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for canvas to mount and start animating
  await page.waitForTimeout(800);

  try {
    const canvas = page.locator('canvas').first();
    await canvas.waitFor({ state: 'visible', timeout: 5000 });
  } catch (e) {
    console.warn('Noise: canvas not found', e.message);
  }

  // Dwell so animated noise grain fills several GIF frames
  await page.waitForTimeout(3000);

  // No meaningful cursor interaction for a static overlay component;
  // park cursor off-center so it does not obscure the noise pattern
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 1 });
  } catch (e) {
    console.warn('Noise: cursor park error', e.message);
  }
}
