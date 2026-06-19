export default async function capture(page, { W, H, cfg, wait }) {
  // StickyScroll uses an internal overflow-y-auto container, not window scroll.
  // We need to wheel inside that container.
  await wait(600);

  // Find the centre of the sticky-scroll container
  const cx = W / 2;
  const cy = H / 2;

  try {
    await page.mouse.move(cx, cy, { steps: 8 });
  } catch (_) {}
  await wait(200);

  // Scroll through all 4 content cards — background colour and right panel swap
  // with each crossing of a breakpoint (0, 0.25, 0.5, 0.75 of progress).
  const steps = 6;
  for (let i = 0; i < steps; i++) {
    try {
      await page.mouse.wheel(0, Math.round(H * 0.55));
    } catch (_) {}
    await wait(460);
  }

  // Pause on the last card (orange/yellow gradient)
  await wait(500);

  // Scroll back to top inside the container
  try {
    await page.evaluate(() => {
      const el = document.querySelector('.overflow-y-auto');
      if (el) el.scrollTo({ top: 0, behavior: 'smooth' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  } catch (_) {}
  await wait(700);
}
