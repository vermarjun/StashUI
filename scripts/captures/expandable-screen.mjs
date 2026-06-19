/**
 * Choreography: expandable-screen
 * A card morphs into a full-screen overlay when clicked.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Hover the expandable card trigger
  try {
    const card = page.locator(".cursor-pointer").first()
    const box = await card.boundingBox()
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 10 })
      await wait(400)
    } else {
      await page.mouse.move(W / 2, H / 2, { steps: 10 })
      await wait(400)
    }
  } catch (_) {}

  // 3. Click to expand to full screen
  try {
    const card = page.locator(".cursor-pointer").first()
    const box = await card.boundingBox()
    if (box) {
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
    } else {
      await page.mouse.click(W / 2, H / 2)
    }
    await wait(700)
  } catch (_) {}

  // 4. Dwell on the expanded full-screen view
  try { await wait(1500); } catch (_) {}

  // 5. Click the close button (X)
  try {
    const closeBtn = page.getByRole("button", { name: /close/i }).first()
    const box = await closeBtn.boundingBox()
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 })
      await wait(200)
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
    } else {
      // Fallback: press Escape
      await page.keyboard.press("Escape")
    }
    await wait(500)
  } catch (_) {}
}
