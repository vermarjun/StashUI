// CountUp: triggers on useInView (once:true). All three counters start on load.
// Longest animation is 3 s (revenue counter). Dwell past that, then settle.
export default async function capture(page, { W, H, wait }) {
  // Move mouse away so it doesn't overlap any counter label
  try {
    await page.mouse.move(W - 40, 20, { steps: 5 });
  } catch (_) {}

  // Let the slowest counter (5,000,000 at duration=3s) finish and spring settle
  await wait(3500);

  // Idle dwell so the settled numbers are visible before the clip loops
  await wait(500);
}
