// Choreography for features-section-demo-2
// 4-col feature grid (2 rows × 4 cols) with tabler icons.
// Hover effect: gradient highlight + left border accent grows and turns blue.
// Single-ish page height (py-10) — likely fits within 1–1.5 viewports.
// Hover two cells per row, then scroll if needed and return to top.

export default async function choreograph({ page, W, H }) {
  // Wait for the feature grid to render
  try {
    await page.locator(".grid").first().waitFor({ state: "visible", timeout: 5000 });
  } catch (e) {
    // fallback
  }

  await page.waitForTimeout(700);

  // Feature items use group/feature — target by the relative div wrapping each feature
  const features = page.locator(".group\\/feature");

  // --- Hover row 1: cell 0 and cell 2 ---
  try {
    const box0 = await features.nth(0).boundingBox();
    if (box0) {
      await page.mouse.move(box0.x + box0.width / 2, box0.y + box0.height / 2, { steps: 20 });
      await page.waitForTimeout(700);
    }
  } catch (e) {
    // ignore
  }

  try {
    const box2 = await features.nth(2).boundingBox();
    if (box2) {
      await page.mouse.move(box2.x + box2.width / 2, box2.y + box2.height / 2, { steps: 20 });
      await page.waitForTimeout(700);
    }
  } catch (e) {
    // ignore
  }

  // Move to neutral area
  await page.mouse.move(W / 2, H * 0.1, { steps: 10 });
  await page.waitForTimeout(400);

  // --- Scroll down to reveal row 2 (if needed) ---
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(700);

  // --- Hover row 2: cell 4 and cell 6 ---
  try {
    const box4 = await features.nth(4).boundingBox();
    if (box4) {
      await page.mouse.move(box4.x + box4.width / 2, box4.y + box4.height / 2, { steps: 20 });
      await page.waitForTimeout(700);
    }
  } catch (e) {
    // ignore
  }

  try {
    const box6 = await features.nth(6).boundingBox();
    if (box6) {
      await page.mouse.move(box6.x + box6.width / 2, box6.y + box6.height / 2, { steps: 20 });
      await page.waitForTimeout(700);
    }
  } catch (e) {
    // ignore
  }

  // Move away from cells
  await page.mouse.move(W / 2, H / 2, { steps: 10 });
  await page.waitForTimeout(400);

  // --- Scroll back to top ---
  await page.mouse.wheel(0, -800);
  await page.waitForTimeout(600);

  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  } catch (e) {
    // ignore
  }

  await page.waitForTimeout(500);
}
