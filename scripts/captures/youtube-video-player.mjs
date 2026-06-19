// youtube-video-player: YouTube facade with a thumbnail, play button, and an
// expand (maximise) button. The YouTube embed itself may not load in a headless
// capture context, so choreography focuses on the facade interactions.
// Sequence: hover the thumbnail (facade scales slightly), click the expand
// button to see the layout-animate to fullscreen, dwell, collapse, then
// hover the play button and click it to swap in the iframe.
export default async function capture(page, { W, H, wait }) {
  // Let the facade thumbnail and controls render
  await wait(900);

  // The demo renders max-w-xl centred; the card is roughly centred in the
  // viewport. Play button is near the vertical-centre of the card.
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Hover over the thumbnail area to show the expand button fade-in
  try {
    await page.mouse.move(cx, cy, { steps: 12 });
  } catch (_) {}

  await wait(600);

  // Click the expand (Maximize2) button — top-right of the card (~8px inset)
  // The card spans ~w-full max-w-xl so roughly W/2 ± 280px; top of card ≈ cy-80px
  try {
    const expandX = Math.min(W - 20, Math.round(cx + 270));
    const expandY = Math.round(cy - 72);
    await page.mouse.move(expandX, expandY, { steps: 10 });
    await wait(300);
    await page.mouse.click(expandX, expandY);
  } catch (_) {}

  // Dwell so the layout spring animation to fullscreen completes
  await wait(1400);

  // Click the Minimize2 button (same relative position but now in the
  // fullscreen overlay, approximately top-right of the expanded panel)
  try {
    const collapseX = Math.round(W * 0.95 - 20);
    const collapseY = Math.round(H * 0.05 + 20);
    await page.mouse.move(collapseX, collapseY, { steps: 10 });
    await wait(300);
    await page.mouse.click(collapseX, collapseY);
  } catch (_) {}

  // Wait for collapse animation
  await wait(900);

  // Hover the play button and click it to load the iframe
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(400);
    await page.mouse.click(cx, cy);
  } catch (_) {}

  // Dwell a moment — embed may show a loading state
  await wait(1500);

  // Return near the initial hover position for a tidy loop seam
  try {
    await page.mouse.move(cx, cy - 10, { steps: 6 });
  } catch (_) {}

  await wait(400);
}
