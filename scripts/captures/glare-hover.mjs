// glare-hover: a diagonal glare highlight sweeps across the component on hover
// via a CSS background-position transition (default 650 ms). Show: idle →
// hover enter → glare sweeps → dwell → exit → brief idle → second pass.
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);

  // Start with cursor away so we see the idle (pre-glare) state first.
  try {
    await page.mouse.move(cx + 280, cy + 140, { steps: 5 });
  } catch (_) {}

  // Idle dwell.
  try {
    await wait(600);
  } catch (_) {}

  // --- First hover pass ---
  // Move onto the component — CSS :hover fires and transition begins.
  try {
    await page.mouse.move(cx - 80, cy - 40, { steps: 22 });
    await wait(200);
  } catch (_) {}

  // Sweep slowly across while hovered — the glare follows background-position.
  try {
    await page.mouse.move(cx + 80, cy + 40, { steps: 35 });
    await wait(800); // let transition fully complete to 100% 100%
  } catch (_) {}

  // Exit — transition reverses back to -100% -100%.
  try {
    await page.mouse.move(cx + 280, cy + 140, { steps: 22 });
    await wait(800); // full reverse duration
  } catch (_) {}

  // Brief idle before second pass.
  try {
    await wait(300);
  } catch (_) {}

  // --- Second hover pass (confirms repeatability) ---
  try {
    await page.mouse.move(cx, cy, { steps: 20 });
    await wait(900);
  } catch (_) {}

  // Final exit — end in idle state for clean loop seam.
  try {
    await page.mouse.move(cx - 280, cy - 140, { steps: 20 });
    await wait(500);
  } catch (_) {}
}
