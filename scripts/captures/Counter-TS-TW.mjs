// Counter (react-bits): digit-slot roller, animates via useSpring on mount.
// Each digit column rolls up independently with spring physics.
// No interaction needed — just dwell for the spring to settle (~2 s),
// then idle so the finished numbers are visible before the clip loops.
export default async function capture(page, { W, H, wait }) {
  // Park mouse in a corner so it doesn't sit on the digit overlay
  try {
    await page.mouse.move(W - 30, H - 30, { steps: 4 });
  } catch (_) {}

  // Spring settlement: damping=20+40*(1/2)=40, stiffness=50 → ~2 s to rest
  await wait(2500);

  // Visible settled dwell before loop
  await wait(600);
}
