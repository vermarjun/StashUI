// interactive-grid-pattern: grid cells highlight on hover via onMouseEnter.
// Move mouse across the grid in multiple sweeps to light up many cells.
export default async function capture(page, { W, H, wait }) {
  // Settle for React mount and SVG render
  try { await wait(400); } catch (_) {}

  // Sweep 1: left-to-right across the upper third
  try {
    await page.mouse.move(Math.round(W * 0.1), Math.round(H * 0.3), { steps: 5 });
    await page.mouse.move(Math.round(W * 0.9), Math.round(H * 0.3), { steps: 40 });
  } catch (_) {}

  try { await wait(200); } catch (_) {}

  // Sweep 2: right-to-left across the middle
  try {
    await page.mouse.move(Math.round(W * 0.9), Math.round(H * 0.5), { steps: 8 });
    await page.mouse.move(Math.round(W * 0.1), Math.round(H * 0.5), { steps: 40 });
  } catch (_) {}

  try { await wait(200); } catch (_) {}

  // Sweep 3: left-to-right across the lower third
  try {
    await page.mouse.move(Math.round(W * 0.1), Math.round(H * 0.7), { steps: 8 });
    await page.mouse.move(Math.round(W * 0.9), Math.round(H * 0.7), { steps: 40 });
  } catch (_) {}

  try { await wait(300); } catch (_) {}

  // Spiral inward toward centre so cells fade (1s transition) as cursor leaves
  try {
    await page.mouse.move(Math.round(W * 0.65), Math.round(H * 0.6), { steps: 20 });
    await page.mouse.move(Math.round(W * 0.5),  Math.round(H * 0.5), { steps: 20 });
  } catch (_) {}

  // Dwell at centre while nearby cells are still lit
  try { await wait(1200); } catch (_) {}

  // Return near start for a clean loop seam
  try {
    await page.mouse.move(Math.round(W * 0.1), Math.round(H * 0.3), { steps: 18 });
  } catch (_) {}

  try { await wait(400); } catch (_) {}
}
