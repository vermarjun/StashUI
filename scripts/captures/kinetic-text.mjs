// kinetic-text: pure CSS hover — each letter independently bolds/expands when
// hovered, with neighbours transitioning at half weight (CSS has-selector
// adjacency). Move the mouse slowly across each text row so the weight wave
// ripples visibly through the letters.
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W * 0.5);

  // Start with mouse off to the left so the initial pass is visible.
  try {
    await page.mouse.move(Math.round(W * 0.1), Math.round(H * 0.32), { steps: 5 });
    await wait(300);
  } catch (_) {}

  // Sweep slowly across row 1 ("Hover over me!" — ~28% of H in demo layout).
  try {
    await page.mouse.move(Math.round(W * 0.9), Math.round(H * 0.32), { steps: 60 });
    await wait(200);
  } catch (_) {}

  // Arc down to row 2 ("Kinetic Typography" — ~50% of H).
  try {
    await page.mouse.move(Math.round(W * 0.85), Math.round(H * 0.50), { steps: 20 });
    await wait(100);
  } catch (_) {}

  // Sweep back left across row 2.
  try {
    await page.mouse.move(Math.round(W * 0.15), Math.round(H * 0.50), { steps: 55 });
    await wait(200);
  } catch (_) {}

  // Arc down to row 3 ("Each letter reacts independently" — ~68% of H).
  try {
    await page.mouse.move(Math.round(W * 0.1), Math.round(H * 0.68), { steps: 20 });
    await wait(100);
  } catch (_) {}

  // Sweep right across row 3.
  try {
    await page.mouse.move(Math.round(W * 0.9), Math.round(H * 0.68), { steps: 65 });
    await wait(200);
  } catch (_) {}

  // Return to start position — clean loop seam with no letters highlighted.
  try {
    await page.mouse.move(Math.round(W * 0.1), Math.round(H * 0.32), { steps: 30 });
    await wait(400);
  } catch (_) {}
}
