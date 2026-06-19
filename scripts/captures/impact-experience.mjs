export default async function capture(page, { W, H, cfg, wait }) {
  // Ensure we start at top and let the section render
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await wait(700)
  } catch (_) {}

  // Step 1 — scroll into the first ExperienceItem (Northline)
  try { await page.mouse.wheel(0, H * 0.7) } catch (_) {}
  await wait(450)

  // Step 2 — hover the first card to trigger the background image reveal
  try {
    await page.mouse.move(W * 0.5, H * 0.45)
  } catch (_) {}
  await wait(600)

  // Step 3 — scroll down to reveal the second ExperienceItem (Habitatly)
  try { await page.mouse.wheel(0, H * 0.7) } catch (_) {}
  await wait(450)

  // Step 4 — hover over the second card to show its background image
  try {
    await page.mouse.move(W * 0.5, H * 0.5)
  } catch (_) {}
  await wait(550)

  // Step 5 — scroll further to bring the third ExperienceItem (Brightstack) into view
  try { await page.mouse.wheel(0, H * 0.7) } catch (_) {}
  await wait(450)

  // Step 6 — scroll to the absolute bottom
  try { await page.mouse.wheel(0, H * 0.7) } catch (_) {}
  await wait(500)

  // Pause at bottom so the last entry is fully visible
  await wait(500)

  // Smooth-scroll back to top for a clean loop
  try {
    await page.evaluate(() =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    )
  } catch (_) {}
  await wait(800)
}
