/**
 * Capture choreography for: background-lines
 * Behaviour: 21 SVG paths (duplicated to 42) animate via strokeDashoffset
 * with random delays (0–10 s) and repeat delays (2–12 s) over a 10 s
 * duration. Lines draw in and fade out continuously. No pointer interaction.
 * Strategy: settle ~1 s, dwell ~5 s to show multiple lines drawing through
 * their full stroke animation, then return to start.
 */
export default async function capture(page, { W, H, wait }) {
  // Park mouse top-left — lines cover entire canvas
  try {
    await page.mouse.move(W * 0.05, H * 0.05, { steps: 5 });
  } catch (_) {}

  // Settle: motion opacity fade-in (1 s) + first batch of lines starting
  try {
    await wait(1200);
  } catch (_) {}

  // Dwell phase 1: first wave of lines drawing in
  try {
    await wait(2500);
  } catch (_) {}

  // Dwell phase 2: second wave begins as first completes
  try {
    await wait(2500);
  } catch (_) {}

  // End near start
  try {
    await page.mouse.move(W * 0.05, H * 0.05, { steps: 5 });
    await wait(300);
  } catch (_) {}
}
