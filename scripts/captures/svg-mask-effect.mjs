/**
 * Capture choreography for: svg-mask-effect
 * Behaviour: A spotlight SVG mask reveals dark inverted text underneath the
 * cursor. At rest the mask is tiny (10 px). Moving across expands the
 * reveal; hovering the inner div triggers revealSize (600 px) — the full
 * white-on-black text floods in. Choreography: rest → slow sweep to let
 * spotlight trail → hover centre (full reveal) → move away → rest.
 */

export default async function capture(page, { W, H, cfg, wait }) {
  // The MaskContainer is full-viewport height inside a fixed-height preview.
  // Coordinates relative to the viewport (W × H).
  const container = page.locator('[class*="relative h-screen"]').first();

  let box = null;
  try {
    box = await container.boundingBox({ timeout: 4000 });
  } catch {
    // Fallback: use viewport bounds
    box = { x: 0, y: 0, width: W, height: H };
  }

  const { x, y, width, height } = box;
  const cx = x + width / 2;
  const cy = y + height / 2;

  // --- Initial rest — mask is tiny, light bg ---
  try {
    await page.mouse.move(W * 0.1, y + height * 0.1, { steps: 6 });
    await wait(500);
  } catch { /* ignore */ }

  // --- Slow sweep across the container — spotlight follows ---
  try {
    // Left edge → right edge, mid-height
    await page.mouse.move(x + width * 0.1, cy, { steps: 6 });
    await wait(200);
    await page.mouse.move(x + width * 0.9, cy, { steps: 40 }); // slow, 40 steps
    await wait(400);
  } catch { /* ignore */ }

  // --- Sweep diagonally top-right → bottom-left ---
  try {
    await page.mouse.move(x + width * 0.8, y + height * 0.2, { steps: 20 });
    await wait(300);
    await page.mouse.move(x + width * 0.2, y + height * 0.8, { steps: 30 });
    await wait(300);
  } catch { /* ignore */ }

  // --- Hover the centre inner div — full reveal (600 px mask) ---
  try {
    // The inner hover div is at the centre of the mask layer
    await page.mouse.move(cx, cy, { steps: 16 });
    await wait(200);
    // Trigger mouseenter on the reveal text container
    const inner = page.locator('[class*="relative z-20"]').first();
    await inner.hover({ force: true, timeout: 2000 });
    await wait(900); // full reveal transition (300 ms) + dwell
  } catch { /* ignore */ }

  // --- Move away — mask collapses back ---
  try {
    await page.mouse.move(x + width * 0.05, y + height * 0.05, { steps: 18 });
    await wait(700); // transition back (300 ms) + settle
  } catch { /* ignore */ }

  // --- Short second sweep for loop interest ---
  try {
    await page.mouse.move(cx, y + height * 0.4, { steps: 20 });
    await wait(300);
    await page.mouse.move(cx, cy, { steps: 14 });
    await wait(400);
    await page.mouse.move(x + width * 0.05, y + height * 0.05, { steps: 12 });
    await wait(400);
  } catch { /* ignore */ }
}
