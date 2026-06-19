export default async function capture(page, { W, H, cfg, wait }) {
  // Let the hero section fully render: motion entry animations + image loads
  await wait(900)

  // Step 1 — scroll down into the two-column image grid (reveal left image)
  try { await page.mouse.wheel(0, H * 0.7) } catch (_) {}
  await wait(500)

  // Step 2 — continue scrolling to bring the "Material First" copy into view
  try { await page.mouse.wheel(0, H * 0.7) } catch (_) {}
  await wait(500)

  // Step 3 — scroll further to reveal the right column (offset by pt-24)
  try { await page.mouse.wheel(0, H * 0.7) } catch (_) {}
  await wait(550)

  // Step 4 — scroll to the second image (Natural Lighting) and hover briefly
  try { await page.mouse.wheel(0, H * 0.7) } catch (_) {}
  await wait(500)

  // Step 5 — hover the second image so its grayscale-to-color transition fires
  try {
    await page.mouse.move(W * 0.75, H * 0.55)
  } catch (_) {}
  await wait(600)

  // Step 6 — scroll to the absolute bottom of the page
  try { await page.mouse.wheel(0, H * 0.7) } catch (_) {}
  await wait(600)

  // Pause at the bottom so the video frame captures the full footer area
  await wait(400)

  // Smooth-scroll back to top
  try {
    await page.evaluate(() =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    )
  } catch (_) {}
  await wait(700)
}
