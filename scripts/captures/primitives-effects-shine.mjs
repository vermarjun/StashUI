// primitives-effects-shine: <Shine /> renders a translucent gradient overlay
// that sweeps from left to right (enable=true, always-on by default). The
// animation plays on mount and does NOT loop by default (loop:false). Dwell
// to capture the initial sweep, then hover over the element to re-trigger if
// enableOnHover is used in any variant.
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);

  // Let the component mount and the initial shine sweep begin immediately.
  try {
    await wait(200);
  } catch (_) {}

  // Park cursor at center — the Shine div is self-contained.
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
  } catch (_) {}

  // Dwell while the shine sweeps left→right (duration 1200ms default).
  try {
    await wait(1800);
  } catch (_) {}

  // Move to the element to trigger hover (in case enableOnHover is active).
  try {
    await page.mouse.move(Math.round(W * 0.4), cy, { steps: 12 });
    await wait(200);
  } catch (_) {}

  try {
    await page.mouse.move(Math.round(W * 0.6), cy, { steps: 15 });
    await wait(1500);
  } catch (_) {}

  // Return to center — loop seam.
  try {
    await page.mouse.move(cx, cy, { steps: 15 });
    await wait(500);
  } catch (_) {}
}
