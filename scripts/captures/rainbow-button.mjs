// RainbowButton: animate-rainbow continuously cycles a conic/linear gradient
// border + a blurred glow beneath the button through hues (red→yellow→green→
// cyan→blue→purple and back). Fully self-animating — no interaction required.
// Dwell ~5s to show the gradient cycling through a full revolution and back.
export default async function capture(page, { W, H, cfg, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Park mouse off the button; no hover side-effect needed to show the rainbow.
  try {
    await page.mouse.move(cx + 220, cy + 100, { steps: 5 });
  } catch (_) {}

  // Settle: wait one short tick for layout.
  await wait(300);

  // Dwell: let the rainbow cycle animate for ~5s (before:animate-rainbow +
  // border animate-rainbow are synced, period ≈ 3s by default CSS var).
  await wait(5000);

  // Quick hover so viewers see the dark bg radial highlight (dark mode).
  try {
    await page.mouse.move(cx, cy, { steps: 16 });
  } catch (_) {}

  await wait(800);

  // Return to neutral — end near resting state with rainbow still cycling.
  try {
    await page.mouse.move(cx + 220, cy + 100, { steps: 16 });
  } catch (_) {}

  await wait(500);
}
