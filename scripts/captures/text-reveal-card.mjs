/**
 * Capture choreography for text-reveal-card.
 *
 * Effect: horizontal mouse sweep across the card reveals the hidden text
 * behind a sliding clip-path. The separator bar rotates slightly as it moves.
 * Strategy: enter left edge → sweep slowly right → dwell at centre → continue
 * to right edge → pause → sweep back halfway → leave card so it resets.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Locate the card element — it is the only element with the star-field bg
  const card = page.locator(".bg-\\[\\#1d1c20\\]").first();

  let box;
  try {
    await card.waitFor({ state: "visible", timeout: 8000 });
    box = await card.boundingBox();
  } catch {
    // Fall back to viewport centre estimate
    box = { x: W * 0.1, y: H * 0.2, width: W * 0.8, height: H * 0.6 };
  }

  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  const left = box.x + 4;
  const right = box.x + box.width - 4;

  // Allow the card to fully mount and stars to initialise
  await wait(600);

  // --- Pass 1: full left-to-right sweep ---
  try {
    await page.mouse.move(left, cy);
    await wait(120);
    // Sweep across in small steps (~40 steps over ~900 ms)
    const steps = 40;
    for (let i = 1; i <= steps; i++) {
      const x = left + ((right - left) * i) / steps;
      await page.mouse.move(x, cy);
      await wait(22);
    }
    // Dwell at right edge
    await wait(400);
  } catch {
    // continue
  }

  // --- Move to centre and dwell so the reveal is 50 % ---
  try {
    await page.mouse.move(cx, cy);
    await wait(500);
  } catch {
    // continue
  }

  // --- Pass 2: sweep back to left (reset territory) ---
  try {
    const steps2 = 30;
    for (let i = 1; i <= steps2; i++) {
      const x = cx - ((cx - left) * i) / steps2;
      await page.mouse.move(x, cy);
      await wait(20);
    }
    await wait(300);
  } catch {
    // continue
  }

  // --- Leave the card — component resets clip-path to 0 % (resting state) ---
  try {
    await page.mouse.move(left - 80, cy);
    await wait(500);
  } catch {
    // continue
  }
}
