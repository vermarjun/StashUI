/**
 * Capture choreography for: following-pointer
 * Behaviour: A blog-style card that hides the system cursor and renders a custom
 * pointer (arrow SVG + coloured label bubble) that lags slightly behind the real
 * mouse position. Choreography: enter card → trace slow arcs so the lag/spring
 * is clearly visible → exit → re-enter for a clean loop.
 */

export default async function capture(page, { W, H, cfg, wait }) {
  const card = page.locator('[class*="max-w-sm"]').first();

  // --- Locate the card ---
  let box = null;
  try {
    box = await card.boundingBox({ timeout: 4000 });
  } catch (err) {
    console.error('[following-pointer] card not found:', err.message);
    return;
  }

  const { x, y, width, height } = box;
  const cx = x + width / 2;
  const cy = y + height / 2;

  // --- Start outside the card ---
  try {
    await page.mouse.move(W * 0.5, y - 40, { steps: 8 });
    await wait(300);
  } catch { /* ignore */ }

  // --- Enter card — custom pointer appears ---
  try {
    await page.mouse.move(cx, cy, { steps: 20 });
    await wait(600); // pointer fade-in
  } catch { /* ignore */ }

  // --- Slow arc 1: top-left → bottom-right of card ---
  try {
    await page.mouse.move(x + width * 0.2, y + height * 0.25, { steps: 18 });
    await wait(300);
    await page.mouse.move(x + width * 0.8, y + height * 0.6, { steps: 22 });
    await wait(300);
  } catch { /* ignore */ }

  // --- Slow arc 2: bottom-left → top-right ---
  try {
    await page.mouse.move(x + width * 0.15, y + height * 0.75, { steps: 20 });
    await wait(300);
    await page.mouse.move(x + width * 0.85, y + height * 0.2, { steps: 20 });
    await wait(300);
  } catch { /* ignore */ }

  // --- Drift to centre and pause — pointer settles ---
  try {
    await page.mouse.move(cx, cy, { steps: 14 });
    await wait(700);
  } catch { /* ignore */ }

  // --- Exit card — pointer fades out ---
  try {
    await page.mouse.move(W * 0.5, y - 40, { steps: 14 });
    await wait(500); // exit animation (~300 ms scale-out)
  } catch { /* ignore */ }

  // --- Re-enter for seamless loop ---
  try {
    await page.mouse.move(cx, cy, { steps: 18 });
    await wait(600);
    await page.mouse.move(x + width * 0.3, y + height * 0.4, { steps: 14 });
    await wait(400);
    await page.mouse.move(W * 0.5, y - 40, { steps: 12 });
    await wait(400);
  } catch { /* ignore */ }
}
