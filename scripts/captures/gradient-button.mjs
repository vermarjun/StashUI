export default async function capture(page, { W, H, cfg, wait }) {
  // Locate the gradient button (contains "Get started" text)
  const btn = page.getByRole("button", { name: /get started/i });

  // 1. Dwell at rest — the gradient border drifts automatically; let it play.
  try {
    await wait(2000);
  } catch (_) {}

  // 2. Hover — background goes to bg/80, subtly darkening the inner pill.
  try {
    await btn.hover({ force: true });
    await wait(1200);
  } catch (_) {}

  // 3. Leave — reset hover state.
  try {
    await page.mouse.move(W * 0.15, H * 0.2, { steps: 18 });
    await wait(700);
  } catch (_) {}

  // 4. Second hover to fill remaining clip time.
  try {
    await btn.hover({ force: true });
    await wait(900);
  } catch (_) {}

  // 5. Return to centre for a clean loop seam.
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 12 });
    await wait(500);
  } catch (_) {}
}
