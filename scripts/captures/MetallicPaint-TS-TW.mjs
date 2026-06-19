/**
 * Capture script: MetallicPaint-TS-TW
 * Choreography: WebGL liquid-metal shader over a logo image.
 * Wait ~2.5s for shader + image load, then dwell so the auto-animation flows.
 * May render blank in headless — orchestrator falls back to static screenshot.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Allow WebGL context + image processing to complete
  await page.waitForTimeout(2500);

  try {
    const canvas = page.locator('canvas').first();
    await canvas.waitFor({ state: 'visible', timeout: 8000 });
  } catch (e) {
    console.warn('MetallicPaint: canvas not found', e.message);
  }

  // Dwell so the animated metallic flow cycles through several frames
  await page.waitForTimeout(2000);

  try {
    // Drift the mouse slowly over the canvas to influence the angle/distortion
    const cx = W * 0.5;
    const cy = H * 0.5;
    await page.mouse.move(cx - 60, cy - 40, { steps: 1 });
    await page.waitForTimeout(300);
    await page.mouse.move(cx + 60, cy + 40, { steps: 40 });
    await page.waitForTimeout(500);
    await page.mouse.move(cx, cy, { steps: 20 });
    await page.waitForTimeout(700);
  } catch (e) {
    console.warn('MetallicPaint: drift error', e.message);
  }
}
