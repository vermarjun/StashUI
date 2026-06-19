export default async function capture(page, { W, H, cfg, wait }) {
  // Stateful button: idle → (click) → spinner → (1.5 s) → check icon → idle.
  // Choreography: hover to show ring, click to trigger loading, wait for
  // success flash, then let it return to idle — all shown once per loop beat.

  const btn = page.getByRole("button", { name: /submit/i });

  // 1. Brief dwell so the idle green button is visible.
  try {
    await wait(800);
  } catch (_) {}

  // 2. Hover — green ring appears around the button.
  try {
    await btn.hover({ force: true });
    await wait(700);
  } catch (_) {}

  // 3. Click — triggers animateLoading (spinner appears) then the async delay.
  try {
    await btn.click({ force: true });
  } catch (_) {}

  // 4. Wait for spinner phase (loader animation is ~200 ms entry + 1500 ms delay).
  try {
    await wait(600);
  } catch (_) {}

  // 5. Wait for the async mock (1500 ms) + success animation (~200 ms entry).
  try {
    await wait(1400);
  } catch (_) {}

  // 6. Dwell on check-icon phase (~2 s on screen per animateSuccess).
  try {
    await wait(1200);
  } catch (_) {}

  // 7. Wait for check to fade out and button to return to idle.
  try {
    await wait(1200);
  } catch (_) {}

  // 8. Move mouse away — clean resting state for loop seam.
  try {
    await page.mouse.move(W * 0.15, H * 0.15, { steps: 15 });
    await wait(500);
  } catch (_) {}
}
