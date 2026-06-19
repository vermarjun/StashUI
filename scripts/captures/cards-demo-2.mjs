// Choreography for cards-demo-2
// Single author card: background photo with hover darkening overlay (group-hover/card:bg-black opacity-60)
// Strategy: hover onto card to trigger the dark overlay, linger, then move away

export default async function choreograph({ page, W, H }) {
  // Locate the card container (group/card wrapper)
  const cardWrapper = page.locator(".group\\/card").first();

  // Wait for the card to be visible
  try {
    await cardWrapper.waitFor({ state: "visible", timeout: 5000 });
  } catch (e) {
    // fallback
  }

  // Initial settle
  await page.waitForTimeout(700);

  // Move mouse to the card to trigger the dark overlay
  try {
    const box = await cardWrapper.boundingBox();
    if (box) {
      const cx = box.x + box.width / 2;
      const cy = box.y + box.height / 2;
      await page.mouse.move(cx, cy, { steps: 25 });
    } else {
      await page.mouse.move(W / 2, H / 2, { steps: 25 });
    }
  } catch (e) {
    await page.mouse.move(W / 2, H / 2, { steps: 25 });
  }

  // Hold — let the overlay transition complete (300ms) and linger
  await page.waitForTimeout(1800);

  // Glide slowly downward within the card to show text content through the overlay
  try {
    const box = await cardWrapper.boundingBox();
    if (box) {
      const cx = box.x + box.width / 2;
      const topY = box.y + box.height * 0.3;
      const botY = box.y + box.height * 0.7;
      await page.mouse.move(cx, topY, { steps: 10 });
      await page.waitForTimeout(300);
      await page.mouse.move(cx, botY, { steps: 20 });
    }
  } catch (e) {
    // ignore
  }

  await page.waitForTimeout(800);

  // Move away to restore original state
  try {
    await page.mouse.move(W * 0.1, H * 0.1, { steps: 20 });
  } catch (e) {
    // ignore
  }

  await page.waitForTimeout(500);
}
