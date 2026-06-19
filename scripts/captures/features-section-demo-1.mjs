// Choreography for features-section-demo-1
// 4-col grid of 8 feature cells (2 rows × 4 cols) with grid-pattern backgrounds.
// Hover each cell reveals a gradient highlight from bottom (row 1) or top (row 2).
// The section is taller than one viewport — scroll down then back to top.

export default async function choreograph({ page, W, H }) {
  // Wait for the grid to render
  try {
    await page.locator(".grid").first().waitFor({ state: "visible", timeout: 5000 });
  } catch (e) {
    // fallback
  }

  await page.waitForTimeout(700);

  // --- Hover a cell in row 1 (top row) ---
  // Feature cells are inside the grid; pick the first and third
  const cells = page.locator(".rounded-3xl");

  try {
    const firstCell = cells.nth(0);
    const box = await firstCell.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 20 });
      await page.waitForTimeout(600);
    }
  } catch (e) {
    // ignore
  }

  try {
    const thirdCell = cells.nth(2);
    const box = await thirdCell.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 20 });
      await page.waitForTimeout(600);
    }
  } catch (e) {
    // ignore
  }

  // Move mouse away from cells before scrolling
  await page.mouse.move(W / 2, H / 2, { steps: 10 });
  await page.waitForTimeout(400);

  // --- Slow scroll down to reveal row 2 ---
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(800);
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(700);

  // --- Hover a cell in row 2 ---
  try {
    const fifthCell = cells.nth(4);
    const box = await fifthCell.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 20 });
      await page.waitForTimeout(600);
    }
  } catch (e) {
    // ignore
  }

  try {
    const seventhCell = cells.nth(6);
    const box = await seventhCell.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 20 });
      await page.waitForTimeout(600);
    }
  } catch (e) {
    // ignore
  }

  // Move mouse away
  await page.mouse.move(W / 2, H / 2, { steps: 10 });
  await page.waitForTimeout(400);

  // --- Scroll back to top ---
  await page.mouse.wheel(0, -900);
  await page.waitForTimeout(700);

  // Ensure we're at the very top
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  } catch (e) {
    // ignore
  }

  await page.waitForTimeout(500);
}
