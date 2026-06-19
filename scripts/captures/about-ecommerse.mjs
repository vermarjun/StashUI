export default async function capture(page, { W, H, cfg, wait }) {
  // Step 1: ensure we start at the very top
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await wait(300)
  } catch (_) {}

  // Step 2: slow wheel-scroll down through the section in 6 increments.
  // Each wheel moves ~70 % of the viewport so reveal animations have time to
  // fire between steps. The staggered image columns (pt-0 / pt-12 / pt-24)
  // become visible at slightly different scroll depths, making each step look
  // purposeful.
  const steps = 6
  const delta = Math.round(H * 0.7)

  for (let i = 0; i < steps; i++) {
    try {
      await page.mouse.wheel(0, delta)
    } catch (_) {}
    await wait(450)
  }

  // Step 3: brief pause at the bottom so the fully-revealed grid reads clearly
  try {
    await wait(700)
  } catch (_) {}

  // Step 4: smooth-scroll back to the top for a clean loop
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
    await wait(900)
  } catch (_) {}
}
