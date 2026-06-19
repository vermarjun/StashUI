/**
 * stepper — STEPPER choreography.
 * Click Next 3× to advance through all steps, then walk back one step.
 */
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Advance: Step 1 → 2
  try {
    const next = page.getByRole("button", { name: /next/i }).first();
    await next.waitFor({ state: "visible", timeout: 2000 });
    await next.click();
  } catch {
    try {
      await page.mouse.click(W / 2 + 40, H * 0.7);
    } catch { /* ignore */ }
  }
  await wait(600);

  // Advance: Step 2 → 3
  try {
    const next = page.getByRole("button", { name: /next/i }).first();
    await next.click({ timeout: 1500 });
  } catch {
    try {
      await page.mouse.click(W / 2 + 40, H * 0.7);
    } catch { /* ignore */ }
  }
  await wait(600);

  // Advance: Step 3 → 4
  try {
    const next = page.getByRole("button", { name: /next/i }).first();
    await next.click({ timeout: 1500 });
  } catch {
    try {
      await page.mouse.click(W / 2 + 40, H * 0.7);
    } catch { /* ignore */ }
  }
  await wait(700);

  // Walk back one step (Back button)
  try {
    const back = page.getByRole("button", { name: /back/i }).first();
    await back.click({ timeout: 1500 });
  } catch {
    try {
      await page.mouse.click(W / 2 - 40, H * 0.7);
    } catch { /* ignore */ }
  }
  await wait(400);
}
