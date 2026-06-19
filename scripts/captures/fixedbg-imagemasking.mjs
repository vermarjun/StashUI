/**
 * Capture choreography for fixedbg-imagemasking.
 *
 * The component renders a fixed-background parallax image masked by an SVG
 * shape. The reveal effect is visible as the user scrolls — the masked image
 * stays fixed while the surrounding content scrolls past it.
 * Strategy: click to focus, wheel slowly down to reveal the full parallax
 * effect, dwell, then smooth-scroll back to top for a clean loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Focus the page so wheel events register.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 5 });
    await page.mouse.click(Math.round(W * 0.5), Math.round(H * 0.5));
  } catch (_) {}

  // Settle — let fixed-bg attachment and mask render.
  try {
    await wait(600);
  } catch (_) {}

  // Wheel slowly down so the parallax/mask reveal is clearly visible.
  try {
    for (let i = 0; i < 8; i++) {
      await page.mouse.wheel(0, 280);
      await wait(200);
    }
  } catch (_) {}

  // Dwell at bottom so the fully-revealed mask is on screen.
  try {
    await wait(800);
  } catch (_) {}

  // Smooth-scroll back to top.
  try {
    await page.evaluate(() =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
    await wait(900);
  } catch (_) {}
}
