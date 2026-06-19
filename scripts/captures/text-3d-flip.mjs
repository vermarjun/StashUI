// text-3d-flip: on mouseenter the component animates each character rotating
// 90° on the Y axis (rotateDirection="right") with a stagger, then snaps back.
// Move the mouse onto the first heading to trigger the flip, dwell, then hover
// the second heading, then return to start for a clean loop.
export default async function capture(page, { W, H, wait }) {
  // Start off the text so no flip triggers prematurely.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.08), { steps: 5 });
    await wait(400);
  } catch (_) {}

  // Move onto the first heading ("Hover to Flip" ~35% down in the demo).
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.35), { steps: 20 });
    await wait(100);
  } catch (_) {}

  // Dwell to let the full stagger-flip animation complete and snap back (~1.2 s
  // for ~12 chars at 0.05 s stagger + spring settle).
  try {
    await wait(1800);
  } catch (_) {}

  // Move off text briefly so the second hover is a fresh enter.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 10 });
    await wait(300);
  } catch (_) {}

  // Move onto the second heading ("3D Typography" ~62% down).
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.62), { steps: 15 });
    await wait(100);
  } catch (_) {}

  // Dwell for the second flip sequence (~13 chars, center stagger).
  try {
    await wait(1800);
  } catch (_) {}

  // Return mouse to top — clean loop seam with both headings at rest.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.08), { steps: 20 });
    await wait(400);
  } catch (_) {}
}
