// Choreography for cards-demo-1
// Single card: static mountain photo → GIF background on hover + dark overlay
// Strategy: move mouse onto card center to trigger the hover GIF swap, hold, then move away

export default async function choreograph({ page, W, H }) {
  // Locate the card element
  const card = page.locator(".card").first();

  // Wait for the card to be visible
  try {
    await card.waitFor({ state: "visible", timeout: 5000 });
  } catch (e) {
    // fallback: just wait for settle
  }

  // Initial settle — let the page render
  await page.waitForTimeout(700);

  // Hover over the card to trigger the GIF background swap + dark overlay
  try {
    const box = await card.boundingBox();
    if (box) {
      const cx = box.x + box.width / 2;
      const cy = box.y + box.height / 2;
      await page.mouse.move(cx, cy, { steps: 20 });
    } else {
      await page.mouse.move(W / 2, H / 2, { steps: 20 });
    }
  } catch (e) {
    await page.mouse.move(W / 2, H / 2, { steps: 20 });
  }

  // Hold on the card so the GIF plays and overlay is visible
  await page.waitForTimeout(2200);

  // Slowly glide across the card (left → right) to show the effect in motion
  try {
    const box = await card.boundingBox();
    if (box) {
      const startX = box.x + box.width * 0.25;
      const endX = box.x + box.width * 0.75;
      const cy = box.y + box.height / 2;
      await page.mouse.move(startX, cy, { steps: 15 });
      await page.waitForTimeout(400);
      await page.mouse.move(endX, cy, { steps: 30 });
    }
  } catch (e) {
    // ignore
  }

  await page.waitForTimeout(700);

  // Move mouse away to restore the static background
  try {
    await page.mouse.move(W * 0.1, H * 0.1, { steps: 20 });
  } catch (e) {
    // ignore
  }

  await page.waitForTimeout(500);
}
