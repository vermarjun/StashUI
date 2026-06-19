// tailed-cursor: 50 connected spring points form a colourful comet tail
// (orange/green/yellow/cyan) that stretches and whips as the cursor moves.
// Move slowly in broad arcs so the elastic tail extension and colour gradient
// are clearly visible on the black background.
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);

  // Enter from top-left corner — tail spawns at initial position.
  try {
    await page.mouse.move(Math.round(W * 0.15), Math.round(H * 0.2), { steps: 6 });
    await wait(350);
  } catch (_) {}

  // Arc 1: top-left → top-right (slow sweep to stretch tail horizontally).
  try {
    await page.mouse.move(Math.round(W * 0.85), Math.round(H * 0.22), { steps: 38 });
    await wait(160);
  } catch (_) {}

  // Arc 2: top-right → bottom-centre (diagonal — tail whips around the curve).
  try {
    await page.mouse.move(Math.round(W * 0.55), Math.round(H * 0.78), { steps: 32 });
    await wait(160);
  } catch (_) {}

  // Arc 3: bottom-centre → bottom-left.
  try {
    await page.mouse.move(Math.round(W * 0.15), Math.round(H * 0.75), { steps: 28 });
    await wait(160);
  } catch (_) {}

  // Arc 4: bottom-left → centre (crossing point, second comet pass).
  try {
    await page.mouse.move(cx, cy, { steps: 28 });
    await wait(200);
  } catch (_) {}

  // Arc 5: centre → top-right (second lobe).
  try {
    await page.mouse.move(Math.round(W * 0.82), Math.round(H * 0.28), { steps: 28 });
    await wait(160);
  } catch (_) {}

  // Return toward start — tail trails back.
  try {
    await page.mouse.move(Math.round(W * 0.15), Math.round(H * 0.2), { steps: 32 });
    await wait(500);
  } catch (_) {}

  // Settle pause.
  try { await wait(400); } catch (_) {}
}
