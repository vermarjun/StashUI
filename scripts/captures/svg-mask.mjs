// svg-mask: an SVG spotlight mask reveals white-on-dark text under the cursor.
// At rest the mask is 10 px (nearly invisible). Moving the mouse expands the
// spotlight; hovering the inner text div triggers revealSize=500 px.
// Choreography: enter → slow diagonal sweep → hover centre text → retreat.
export default async function capture(page, { W, H, wait }) {
  // The SVGMask container fills the preview viewport.
  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);

  // Start off in the corner — mask starts tiny.
  try {
    await page.mouse.move(Math.round(W * 0.1), Math.round(H * 0.12), { steps: 6 });
    await wait(400);
  } catch (_) {}

  // Slow sweep left→right across mid-height to show spotlight following.
  try {
    await page.mouse.move(Math.round(W * 0.12), Math.round(H * 0.5), { steps: 8 });
    await wait(150);
    await page.mouse.move(Math.round(W * 0.88), Math.round(H * 0.5), { steps: 45 });
    await wait(300);
  } catch (_) {}

  // Diagonal: top-right → bottom-left.
  try {
    await page.mouse.move(Math.round(W * 0.8), Math.round(H * 0.2), { steps: 20 });
    await wait(200);
    await page.mouse.move(Math.round(W * 0.2), Math.round(H * 0.8), { steps: 32 });
    await wait(200);
  } catch (_) {}

  // Glide to centre and hover the inner text div — triggers full 500 px reveal.
  try {
    await page.mouse.move(cx, cy, { steps: 18 });
    await wait(150);
  } catch (_) {}
  try {
    // The inner hover zone is centred on the mask layer.
    const inner = page.locator('[class*="relative z-20"]').first();
    await inner.hover({ force: true, timeout: 3000 });
    await wait(900); // transition (200 ms) + dwell with full reveal visible
  } catch (_) {}

  // Move away — mask collapses back to 10 px.
  try {
    await page.mouse.move(Math.round(W * 0.08), Math.round(H * 0.08), { steps: 20 });
    await wait(600);
  } catch (_) {}

  // Short second pass across centre for loop interest, then return.
  try {
    await page.mouse.move(cx, Math.round(H * 0.4), { steps: 18 });
    await wait(250);
    await page.mouse.move(Math.round(W * 0.1), Math.round(H * 0.12), { steps: 14 });
    await wait(400);
  } catch (_) {}
}
