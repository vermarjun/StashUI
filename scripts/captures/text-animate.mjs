// text-animate: words/characters animate in with blurInUp / fadeIn on mount.
// Dwell to let both TextAnimate instances finish, then nudge scroll by ~1 px
// to force AnimatePresence to re-trigger (acts as a retrigger for the loop).
export default async function capture(page, { W, H, wait }) {
  // Click into the iframe/page so scroll events register.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 5 });
    await page.mouse.click(Math.round(W * 0.5), Math.round(H * 0.5));
  } catch (_) {}

  // Let both animation sequences play out fully (~1.5 s for word + char stagger).
  try {
    await wait(2200);
  } catch (_) {}

  // Tiny scroll down then immediately back up — forces component out of view
  // and back, retriggering the entrance animations for a clean loop.
  try {
    await page.mouse.wheel(0, 80);
    await wait(300);
  } catch (_) {}

  try {
    await page.mouse.wheel(0, -80);
    await wait(500);
  } catch (_) {}

  // Final dwell at the top so the recording ends on the initial entrance state.
  try {
    await wait(800);
  } catch (_) {}
}
