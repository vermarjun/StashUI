export default async function capture(page, { W, H, cfg, wait }) {
  // Dwell at the top so entry animations and reveals can play out
  await wait(800);

  // Hover each stat card to show the lift + shadow transition
  const cardSelectors = [
    '.rounded-3xl:nth-of-type(1)',
    '.rounded-3xl:nth-of-type(2)',
    '.rounded-3xl:nth-of-type(3)',
  ];

  for (const sel of cardSelectors) {
    try {
      const el = page.locator(sel).first();
      await el.hover({ timeout: 2000 });
      await wait(600);
    } catch (_) {
      // card not found or not visible — skip
    }
  }

  // Fallback pixel hovers spread across the stat-card row (bottom-right quadrant)
  try {
    const cardY = Math.round(H * 0.72);
    const xs = [
      Math.round(W * 0.52),
      Math.round(W * 0.69),
      Math.round(W * 0.86),
    ];
    for (const x of xs) {
      await page.mouse.move(x, cardY);
      await wait(550);
    }
  } catch (_) {}

  // Settle back to neutral so the final frame is clean
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5));
  } catch (_) {}

  await wait(700);
}
