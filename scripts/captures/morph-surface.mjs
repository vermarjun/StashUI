/**
 * Choreography: morph-surface
 * A pill-shaped trigger morphs open into a feedback textarea form.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Hover the trigger pill
  try {
    const trigger = page.locator("button").filter({ hasText: /send feedback/i }).first()
    const box = await trigger.boundingBox()
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 })
      await wait(300)
    } else {
      await page.mouse.move(W / 2, H / 2, { steps: 8 })
      await wait(300)
    }
  } catch (_) {}

  // 3. Click the trigger to open/morph
  try {
    const trigger = page.locator("button").filter({ hasText: /send feedback/i }).first()
    const box = await trigger.boundingBox()
    if (box) {
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
    } else {
      // Fallback: click the containing morph div
      await page.mouse.click(W / 2, H / 2)
    }
    await wait(800)
  } catch (_) {}

  // 4. Type feedback text in the textarea
  try {
    const textarea = page.locator("textarea").first()
    const box = await textarea.boundingBox()
    if (box) {
      await page.mouse.click(box.x + 10, box.y + 10)
      await wait(300)
      await page.keyboard.type("This is really polished!", { delay: 55 })
      await wait(800)
    }
  } catch (_) {}

  // 5. Dwell on expanded + typed state
  try { await wait(1000); } catch (_) {}

  // 6. Close via Escape
  try {
    await page.keyboard.press("Escape")
    await wait(600)
  } catch (_) {}
}
