/**
 * Capture choreography for ReflectiveCard-TS-TW
 *
 * ReflectiveCard uses a webcam video stream as its backdrop, blurred and
 * filtered through SVG feSpecularLighting + feDisplacementMap to create a
 * metallic reflection effect. The sheen gradient is purely CSS and does NOT
 * track the mouse (the fePointLight is fixed at x=0,y=0,z=300 — no pointer
 * binding). Moving the mouse is still worth doing to demonstrate the card
 * stays composed under cursor presence.
 *
 * Note: headless Chrome will deny getUserMedia; the video element stays blank
 * → webcam-dependent sheen is invisible. The orchestrator falls back to a live
 * preview for this component.
 *
 * Strategy:
 *   1. Settle 1.5 s — card mounts; browser webcam prompt is handled (or denied
 *      silently in headless).
 *   2. Move mouse from left edge to right edge across card mid-height — the
 *      diagonal CSS gradient overlay creates a subtle shimmer across the sweep.
 *   3. Pause to show the card at rest.
 *   4. Sweep right→left slowly to show the reverse shimmer direction.
 *   5. Return to centre.
 */
export default async function capture(page, { W, H, wait }) {
  // Card mount + webcam getUserMedia attempt
  try {
    await wait(1500);
  } catch (_) {}

  const cy = Math.round(H / 2);
  const cx = Math.round(W / 2);

  // Sweep left → right across card
  try {
    await page.mouse.move(Math.round(W * 0.1), cy, { steps: 4 });
    await page.mouse.move(Math.round(W * 0.9), cy, { steps: 22 });
  } catch (_) {}

  try {
    await wait(800);
  } catch (_) {}

  // Sweep right → left — slower for reverse shimmer
  try {
    await page.mouse.move(Math.round(W * 0.9), Math.round(H * 0.4), { steps: 4 });
    await page.mouse.move(Math.round(W * 0.1), Math.round(H * 0.6), { steps: 28 });
  } catch (_) {}

  try {
    await wait(700);
  } catch (_) {}

  // Drift up across top half of card
  try {
    await page.mouse.move(Math.round(W * 0.3), Math.round(H * 0.25), { steps: 14 });
    await wait(400);
    await page.mouse.move(Math.round(W * 0.7), Math.round(H * 0.25), { steps: 14 });
    await wait(400);
  } catch (_) {}

  // Return to centre
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(500);
  } catch (_) {}
}
