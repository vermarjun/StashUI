/**
 * Capture choreography: inspira-marquee (inspira-react)
 * Source file: registry/inspira-react/marquee.tsx
 *
 * Two rows of review cards scroll horizontally via CSS `animate-marquee`
 * (default --duration: 40 s, linear, infinite).  The first row scrolls
 * left-to-right (reverse=false, but the CSS base animation-direction is already
 * "reverse", making it right-to-left in practice), the second row uses
 * `reverse=true` (so its direction is "normal", meaning left-to-right).
 * Both rows have `pauseOnHover=true` — hovering pauses the animation.
 *
 * Strategy:
 *   1. Wait for review cards to render.
 *   2. Park the mouse well above both rows so pauseOnHover does NOT fire.
 *   3. Dwell ~5 s to let both rows scroll and show different cards entering.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for at least one review card to be visible
  try {
    await page.locator("figure").first().waitFor({ state: "visible", timeout: 8000 });
  } catch {
    await wait(1500);
  }

  // Park mouse above the marquee rows (rows occupy roughly centre of viewport)
  try {
    await page.mouse.move(W * 0.5, H * 0.08);
  } catch (_) {}

  // Let animation start and layout settle
  await wait(400);

  // Dwell: at 40 s duration, 5 s ≈ 12.5 % of the loop — enough to see 1–2 new
  // cards slide into view on each row.
  await wait(5000);

  // Keep parked — no further interaction needed.
  try {
    await wait(200);
  } catch (_) {}
}
