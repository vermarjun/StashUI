// magic-ui-meteors: 20 meteors fall diagonally (angle 215°) with randomised
// delay (0.2–1.2 s) and duration (2–10 s). Purely CSS-animated after mount.
// Dwell ~3 s to capture multiple meteors mid-flight. Canvas may not render
// headless — orchestrator will fall back if blank.
export default async function capture(page, { W, H, wait }) {
  // Park mouse at centre so it doesn't occlude any meteor trails.
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 5 });
  } catch (_) {}

  // Settle: meteors are positioned in a useEffect — wait for styles to apply.
  try {
    await wait(600);
  } catch (_) {}

  // Dwell: capture multiple meteors entering and crossing the viewport.
  try {
    await wait(3000);
  } catch (_) {}

  // No further interaction needed — animation is fully self-driven.
}
