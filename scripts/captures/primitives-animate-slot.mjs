// primitives-animate-slot: motion.create wrapper that plays initial→animate
// on mount (opacity/y fade-in and scale-up). Animations trigger automatically.
// Dwell after mount, hover the button to show interactivity.
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);

  // Let React mount and motion/react initial→animate transitions play.
  try {
    await wait(300);
  } catch (_) {}

  // Park cursor away from elements.
  try {
    await page.mouse.move(cx, Math.round(H * 0.2), { steps: 6 });
  } catch (_) {}

  // Dwell while both Slot animations complete (longest: 0.5s + 0.2s delay = 0.7s).
  try {
    await wait(1200);
  } catch (_) {}

  // Hover over the "Animated with Slot" box (left side).
  try {
    await page.mouse.move(Math.round(W * 0.37), cy, { steps: 20 });
    await wait(700);
  } catch (_) {}

  // Move to the "Click me" button (right side).
  try {
    await page.mouse.move(Math.round(W * 0.63), cy, { steps: 25 });
    await wait(600);
  } catch (_) {}

  // Click the button to show pointer feedback.
  try {
    await page.mouse.click(Math.round(W * 0.63), cy);
    await wait(500);
  } catch (_) {}

  // Return near center — loop seam.
  try {
    await page.mouse.move(cx, cy, { steps: 20 });
    await wait(400);
  } catch (_) {}
}
