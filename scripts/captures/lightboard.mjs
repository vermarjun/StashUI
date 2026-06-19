// lightboard: canvas-based LED ticker that scrolls text. Animation pauses
// when the mouse hovers over the canvas. Dwell with the cursor parked on the
// board to freeze the scroll, then exit so it resumes — shows both states.
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);

  // Let the canvas mount and the RAF loop begin.
  try {
    await wait(600);
  } catch (_) {}

  // Move to the canvas center to pause the scrolling ticker.
  try {
    await page.mouse.move(cx, cy, { steps: 12 });
    await wait(400);
  } catch (_) {}

  // Dwell — ticker is frozen; viewer sees the LED text clearly.
  try {
    await wait(2800);
  } catch (_) {}

  // Drift slowly left across the canvas (still hovering).
  try {
    await page.mouse.move(Math.round(W * 0.25), cy, { steps: 40 });
    await wait(500);
  } catch (_) {}

  // Drift right across the canvas.
  try {
    await page.mouse.move(Math.round(W * 0.75), cy, { steps: 50 });
    await wait(500);
  } catch (_) {}

  // Return near center before loop seam.
  try {
    await page.mouse.move(cx, cy, { steps: 20 });
    await wait(400);
  } catch (_) {}

  // Exit the canvas area so the ticker resumes for 1 second.
  try {
    await page.mouse.move(cx, Math.round(H * 0.05), { steps: 15 });
    await wait(900);
  } catch (_) {}
}
