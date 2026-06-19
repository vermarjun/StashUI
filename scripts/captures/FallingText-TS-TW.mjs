/**
 * Capture choreography for FallingText-TS-TW
 *
 * FallingText uses matter-js physics. The demo uses trigger="hover" so the
 * effect starts when the mouse enters the container. Once triggered the word
 * bodies fall under gravity and bounce off the floor/walls. The user can also
 * drag bodies with the mouse constraint.
 *
 * Strategy:
 *   1. Settle mount — text is rendered in the DOM statically first.
 *   2. Hover into the container to trigger the physics effect.
 *   3. Wait for all bodies to settle (~2 s under default gravity=1).
 *   4. Drag a body slightly to show interactivity.
 *   5. Dwell ~2 s to capture settled state.
 *   6. End mouse near top-centre for loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Mount settle — text renders statically before hover trigger
  try {
    await wait(600);
  } catch (_) {}

  // Hover into the container (centre of the viewport) to trigger falling
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 16 });
    await wait(300);
  } catch (_) {}

  // Wait for physics to initialise and bodies to fall
  try {
    await wait(2000);
  } catch (_) {}

  // Nudge a body near the bottom-centre to show mouse constraint
  try {
    await page.mouse.move(W * 0.5, H * 0.8, { steps: 12 });
    await page.mouse.down();
    await wait(100);
    await page.mouse.move(W * 0.55, H * 0.75, { steps: 10 });
    await wait(200);
    await page.mouse.up();
  } catch (_) {}

  // Dwell to show settled pile of words
  try {
    await wait(2000);
  } catch (_) {}

  // Return mouse to top for loop seam
  try {
    await page.mouse.move(W / 2, H * 0.1, { steps: 18 });
    await wait(300);
  } catch (_) {}
}
