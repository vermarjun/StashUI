// stats-minimal choreography
// White-bg section: a single horizontal row of 4 stat cards, each with a
// left-border accent and a `hover:bg-zinc-200` highlight. No scroll needed.
// Choreography: dwell → sequentially hover each card left-to-right → dwell.

export default async function capture(page, { W, H, cfg, wait }) {
  // Settle
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await wait(400)
  } catch (_) {}

  // Initial dwell so the static layout is visible
  try {
    await wait(2200)
  } catch (_) {}

  // Cards are spread across ~80% of the width; estimate card centers
  // 4 cards → offsets at 20%, 38%, 58%, 78% of W (generous padding on each side)
  const cardXs = [0.20, 0.38, 0.58, 0.78]
  const cardY = Math.round(H * 0.5)

  for (const xFrac of cardXs) {
    try {
      await page.mouse.move(Math.round(W * xFrac), cardY, { steps: 18 })
      await wait(550)
    } catch (_) {}
  }

  // Linger on the last card
  try {
    await wait(500)
  } catch (_) {}

  // Move mouse to neutral center before loop restarts
  try {
    await page.mouse.move(Math.round(W / 2), Math.round(H / 2), { steps: 12 })
    await wait(300)
  } catch (_) {}
}
