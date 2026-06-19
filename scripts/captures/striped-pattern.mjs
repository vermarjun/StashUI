// striped-pattern: static SVG diagonal stripe pattern (no animation).
// Short settle then dwell to show the full stripe field.
export default async function capture(page, { W, H, wait }) {
  // Settle for SVG paint
  try { await wait(400); } catch (_) {}

  // Park mouse at centre
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 6 });
  } catch (_) {}

  // Dwell to appreciate the stripe pattern
  try { await wait(3600); } catch (_) {}

  // Slight drift and return
  try {
    await page.mouse.move(Math.round(W * 0.52), Math.round(H * 0.48), { steps: 10 });
  } catch (_) {}

  try { await wait(600); } catch (_) {}

  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 8 });
  } catch (_) {}

  try { await wait(400); } catch (_) {}
}
