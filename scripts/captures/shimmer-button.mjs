export default async function capture(page, { W, H, cfg, wait }) {
  // Locate the shimmer button
  const btn = page.getByRole("button", { name: /shimmer/i });

  // 1. Initial dwell — let the shimmer sweep play for ~2.5s so the loop
  //    viewer sees the continuous border animation at rest.
  try {
    await wait(2500);
  } catch (_) {}

  // 2. Hover in: move slowly to button centre to reveal the inner glow change.
  try {
    await btn.hover({ force: true });
    await wait(1200);
  } catch (_) {}

  // 3. Move away — return to a neutral spot so hover state resets.
  try {
    await page.mouse.move(W * 0.15, H * 0.15, { steps: 20 });
    await wait(800);
  } catch (_) {}

  // 4. Second hover pass — gives the looped video a clear before/after.
  try {
    await btn.hover({ force: true });
    await wait(1000);
  } catch (_) {}

  // 5. End near resting state so the loop is seamless.
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 15 });
    await wait(600);
  } catch (_) {}
}
