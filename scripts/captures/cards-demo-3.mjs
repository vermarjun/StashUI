// Choreography for cards-demo-3
// "Damn good card" — AI tools skeleton card with auto-animating bouncing circles
// and a scanning cyan beam. Animation runs on its own (no hover required).
// Strategy: let the animation loop play, then gently hover the card to engage the
// group-hover shadow glow, then move away to show the default state again.

export default async function choreograph({ page, W, H }) {
  // Locate the card
  const card = page.locator(".group").first();

  try {
    await card.waitFor({ state: "visible", timeout: 5000 });
  } catch (e) {
    // fallback
  }

  // Let the initial bounce sequence play through one full cycle (~5 × 0.8s + 1s delay = ~5s)
  // We only need to show one pass for the grid video loop, so wait ~2.5s
  await page.waitForTimeout(700);

  // Hover the card to show the subtle group-hover glow effect
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

  // Let auto-animation continue while hovered — scanning beam traverses the icons
  await page.waitForTimeout(2500);

  // Move away
  try {
    await page.mouse.move(W * 0.1, H * 0.9, { steps: 20 });
  } catch (e) {
    // ignore
  }

  await page.waitForTimeout(600);
}
