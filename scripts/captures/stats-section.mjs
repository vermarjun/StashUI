// stats-section choreography
// Dark-theme hero: left column has motion whileInView stat cards; right column
// is a prose block with a hover glow effect. The section is min-h-screen so
// we scroll slowly to let the whileInView animations fire, then return to top.

export default async function capture(page, { W, H, cfg, wait }) {
  // Settle at top — let initial paint complete
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await wait(400)
  } catch (_) {}

  // Dwell at top: allow count-up / fade-in animations on the visible stat cards
  try {
    await wait(2800)
  } catch (_) {}

  // Scroll down step 1 — reveal any below-fold content
  try {
    await page.mouse.wheel(0, Math.round(H * 0.55))
    await wait(500)
  } catch (_) {}

  // Scroll down step 2
  try {
    await page.mouse.wheel(0, Math.round(H * 0.55))
    await wait(500)
  } catch (_) {}

  // Scroll down step 3 — reach the bottom of the min-h-screen section
  try {
    await page.mouse.wheel(0, Math.round(H * 0.55))
    await wait(600)
  } catch (_) {}

  // Hover over the right-column prose block to trigger the glow effect
  try {
    await page.mouse.move(Math.round(W * 0.72), Math.round(H * 0.5), { steps: 18 })
    await wait(900)
  } catch (_) {}

  // Dwell at bottom
  try {
    await wait(400)
  } catch (_) {}

  // Return to top smoothly so the loop seam is clean
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
    await wait(900)
  } catch (_) {}
}
