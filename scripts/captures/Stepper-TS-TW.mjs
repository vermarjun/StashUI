/**
 * Choreography: Stepper-TS-TW
 *
 * Stepper type: click "Continue" 2× to advance steps, then click "Back" once,
 * ending near the initial state so the loop seam is clean.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(700); } catch (_) {}

  // 2. Click "Continue" — step 1 → 2
  try {
    const nextBtn = page.locator('button:has-text("Continue"), button:has-text("Next")').first();
    const box = await nextBtn.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
      await wait(200);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      await wait(600);
    }
  } catch (_) {}

  // 3. Click "Continue" — step 2 → 3
  try {
    const nextBtn = page.locator('button:has-text("Continue"), button:has-text("Next")').first();
    const box = await nextBtn.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
      await wait(200);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      await wait(600);
    }
  } catch (_) {}

  // 4. Click "Back" — step 3 → 2
  try {
    const backBtn = page.locator('button:has-text("Back")').first();
    const box = await backBtn.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
      await wait(200);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      await wait(600);
    }
  } catch (_) {}

  // 5. Hover "Continue" without clicking — returns to near active state
  try {
    const nextBtn = page.locator('button:has-text("Continue")').first();
    const box = await nextBtn.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
      await wait(400);
    }
  } catch (_) {}
}
