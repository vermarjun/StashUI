// stats-bold choreography
// White-bg layout: giant "10B+" hero stat with an image on top, then three
// smaller metric blocks below. No animations — we dwell long enough to read
// all stats and do a gentle pan of the hero row by moving the mouse across it.

export default async function capture(page, { W, H, cfg, wait }) {
  // Settle at top
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await wait(400)
  } catch (_) {}

  // Dwell so viewers can read the hero stat + image
  try {
    await wait(2500)
  } catch (_) {}

  // Slowly move the mouse across the hero stat row (left → right)
  try {
    await page.mouse.move(Math.round(W * 0.15), Math.round(H * 0.35), { steps: 1 })
    await page.mouse.move(Math.round(W * 0.85), Math.round(H * 0.35), { steps: 30 })
    await wait(700)
  } catch (_) {}

  // Hover over the bottom-row stats area to give visual focus
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.72), { steps: 20 })
    await wait(1000)
  } catch (_) {}

  // Brief final dwell before loop
  try {
    await wait(400)
  } catch (_) {}
}
