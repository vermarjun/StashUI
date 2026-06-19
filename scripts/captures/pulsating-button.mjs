// PulsatingButton: a pseudo-element behind the button animates with
// animate-pulse (Tailwind's built-in opacity 1→0 loop, ~2s) giving a
// breathing/halo effect in the button's own bg color. Self-animating — no
// interaction needed. Show ~4s so three full pulse cycles are visible.
export default async function capture(page, { W, H, cfg, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Park mouse away — the effect is purely CSS-driven and hover-independent.
  try {
    await page.mouse.move(cx + 200, cy + 100, { steps: 5 });
  } catch (_) {}

  // Initial settle (layout + useLayoutEffect bg sync).
  await wait(300);

  // Dwell: 3 full pulse cycles at ~2s each = 6s.
  await wait(6000);

  // Brief hover to show the z-10 label is still crisp during the pulse.
  try {
    await page.mouse.move(cx, cy, { steps: 16 });
  } catch (_) {}

  await wait(800);

  // Return to neutral for loop seam.
  try {
    await page.mouse.move(cx + 200, cy + 100, { steps: 16 });
  } catch (_) {}

  await wait(400);
}
