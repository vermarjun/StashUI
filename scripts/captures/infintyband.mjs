// infintyband: two rows of social-logo icon buttons that scroll left
// continuously via animate-infinite-scroll CSS animation. Self-animating,
// no user interaction needed — dwell ~3 s to show the loop clearly.
export default async function capture(page, { W, H, cfg, wait }) {
  // Park mouse away from the band so no link :hover states fire.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.9), { steps: 5 });
  } catch (_) {}

  // Settle: CSS animation init.
  try { await wait(400); } catch (_) {}

  // Dwell ~3 s — the infinite-scroll loop is short enough that 3 s shows
  // at least one full pass of the icon set.
  try { await wait(3000); } catch (_) {}

  // No further interaction.
  try { await wait(200); } catch (_) {}
}
