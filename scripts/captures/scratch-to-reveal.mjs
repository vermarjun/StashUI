// scratch-to-reveal: a canvas covers a reward card with a purple-pink-peach
// gradient. Drag the mouse across it to erase the cover and reveal
// "You win! 🎉" beneath. Choreography: position over canvas → mouse-down →
// sweep back-and-forth in many small steps → mouse-up → dwell on reveal.
export default async function capture(page, { W, H, wait }) {
  // The ScratchToReveal card is 300×200 px, centred in the preview.
  // Compute approximate bounding box centre from viewport dimensions.
  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);

  // Half-dimensions of the scratch canvas (matches width=300,height=200 in demo).
  const hw = 140; // slightly less than 150 to stay on canvas
  const hh = 88;  // slightly less than 100

  // Move to the left edge of the card before pressing.
  try {
    await page.mouse.move(cx - hw, cy - hh, { steps: 10 });
    await wait(300);
  } catch (_) {}

  // Press and hold — begin scratch.
  try { await page.mouse.down(); } catch (_) {}
  try { await wait(80); } catch (_) {}

  // Sweep horizontally left→right across the top third.
  try {
    await page.mouse.move(cx + hw, cy - hh, { steps: 40 });
    await wait(60);
  } catch (_) {}

  // Drop down and sweep right→left across the middle.
  try {
    await page.mouse.move(cx - hw, cy, { steps: 40 });
    await wait(60);
  } catch (_) {}

  // Sweep left→right across the lower third.
  try {
    await page.mouse.move(cx + hw, cy + hh, { steps: 40 });
    await wait(60);
  } catch (_) {}

  // Additional diagonal sweep for thorough coverage.
  try {
    await page.mouse.move(cx - hw, cy + hh, { steps: 30 });
    await wait(60);
  } catch (_) {}
  try {
    await page.mouse.move(cx + hw, cy - hh, { steps: 30 });
    await wait(60);
  } catch (_) {}

  // Release.
  try { await page.mouse.up(); } catch (_) {}

  // Dwell so the revealed content and completion animation are visible.
  try { await wait(1200); } catch (_) {}

  // Return mouse near start (does not affect reveal state).
  try {
    await page.mouse.move(cx - hw, cy - hh, { steps: 12 });
  } catch (_) {}
}
