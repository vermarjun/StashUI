export default async function capture(page, { W, H, cfg, wait }) {
  // Start at top, let the header and initial animations settle
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await wait(800)
  } catch (_) {}

  // Step 1 — scroll past the large header to enter the first ExperienceItem (Vertex AI)
  // whileInView fires as element enters viewport
  try { await page.mouse.wheel(0, H * 0.7) } catch (_) {}
  await wait(500)

  // Step 2 — continue scrolling so the first item's fade-up animation completes
  try { await page.mouse.wheel(0, H * 0.7) } catch (_) {}
  await wait(500)

  // Step 3 — scroll to bring the second ExperienceItem (ClarityFlow) into view
  try { await page.mouse.wheel(0, H * 0.7) } catch (_) {}
  await wait(500)

  // Step 4 — scroll further so the second item's whileInView fully triggers
  try { await page.mouse.wheel(0, H * 0.7) } catch (_) {}
  await wait(500)

  // Step 5 — scroll to reveal the third ExperienceItem (SecureStack)
  try { await page.mouse.wheel(0, H * 0.7) } catch (_) {}
  await wait(500)

  // Step 6 — scroll to the bottom of the section
  try { await page.mouse.wheel(0, H * 0.7) } catch (_) {}
  await wait(500)

  // Pause at the bottom so the last item is fully readable
  await wait(600)

  // Smooth-scroll back to top for a clean loop
  try {
    await page.evaluate(() =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    )
  } catch (_) {}
  await wait(900)
}
