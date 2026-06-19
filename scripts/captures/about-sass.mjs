export default async function capture(page, { W, H, cfg, wait }) {
  // Step 1: ensure we're at the top and let initial animations settle
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await wait(600)
  } catch (_) {}

  // Step 2: scroll down slowly through the brand story section
  try {
    await page.mouse.wheel(0, H * 0.7)
    await wait(450)
  } catch (_) {}

  // Step 3: continue scrolling to reveal the stats / bar chart section
  try {
    await page.mouse.wheel(0, H * 0.7)
    await wait(450)
  } catch (_) {}

  // Step 4: scroll further so the bar chart whileInView animation fires
  try {
    await page.mouse.wheel(0, H * 0.7)
    await wait(500)
  } catch (_) {}

  // Step 5: continue into the feature grid section
  try {
    await page.mouse.wheel(0, H * 0.7)
    await wait(450)
  } catch (_) {}

  // Step 6: scroll to bottom to show the last feature cards
  try {
    await page.mouse.wheel(0, H * 0.7)
    await wait(450)
  } catch (_) {}

  // Step 7: one final nudge to ensure the page bottom is reached
  try {
    await page.mouse.wheel(0, H * 0.5)
    await wait(500)
  } catch (_) {}

  // Pause at bottom so the last reveal animations complete
  try {
    await wait(700)
  } catch (_) {}

  // Smooth-scroll back to top
  try {
    await page.evaluate(() =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    )
    await wait(900)
  } catch (_) {}

  // Small final wait at top before capture ends
  try {
    await wait(300)
  } catch (_) {}
}
