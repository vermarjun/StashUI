/**
 * Capture choreography for inspira-text-reveal-card.
 *
 * The TextRevealCard uses a clip-path driven by mouse X position to reveal
 * hidden text from left to right. A divider bar rotates slightly as it moves.
 * Demo renders one card on a dark (#0d0d0d) background.
 * Strategy: enter left edge → sweep slowly right to fully reveal text → dwell
 * at full reveal → sweep back partway → leave card so clip-path resets to 0.
 * This reuses the same choreography as the earlier text-reveal-card script but
 * targets the inspira component name variant.
 */
export default async function capture(page, { W, H, wait }) {
  // Locate the card by its distinctive background colour class
  let box;
  try {
    const card = page.locator(".bg-\\[\\#1d1c20\\]").first();
    await card.waitFor({ state: "visible", timeout: 8000 });
    box = await card.boundingBox();
  } catch {
    box = null;
  }

  if (!box) {
    // Fallback: estimate the card occupies the middle 80% of the viewport
    box = { x: W * 0.1, y: H * 0.18, width: W * 0.8, height: H * 0.55 };
  }

  const cx = box.x + box.width / 2;
  const cy = box.y + box.height * 0.65; // target the reveal area (lower half)
  const left = box.x + 4;
  const right = box.x + box.width - 4;

  // Allow stars and card to fully mount
  await wait(650);

  // --- Enter at left edge to trigger mouseEnter ---
  try {
    await page.mouse.move(left, cy, { steps: 10 });
    await wait(150);
  } catch {
    // continue
  }

  // --- Sweep left → right (full reveal pass, ~40 steps ≈ 880 ms) ---
  try {
    const steps = 40;
    for (let i = 1; i <= steps; i++) {
      const x = left + ((right - left) * i) / steps;
      await page.mouse.move(x, cy);
      await wait(22);
    }
    // Dwell at full reveal
    await wait(450);
  } catch {
    // continue
  }

  // --- Dwell at centre (50 % reveal) ---
  try {
    await page.mouse.move(cx, cy, { steps: 16 });
    await wait(500);
  } catch {
    // continue
  }

  // --- Sweep back from centre to left ---
  try {
    const steps2 = 28;
    for (let i = 1; i <= steps2; i++) {
      const x = cx - ((cx - left) * i) / steps2;
      await page.mouse.move(x, cy);
      await wait(20);
    }
    await wait(300);
  } catch {
    // continue
  }

  // --- Leave card — clip-path resets to 0 (resting state) ---
  try {
    await page.mouse.move(left - 100, cy, { steps: 12 });
    await wait(500);
  } catch {
    // continue
  }
}
