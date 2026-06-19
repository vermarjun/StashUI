/**
 * breadcrumb — BREADCRUMB choreography.
 * Short dwell, then hover the ellipsis (overflow indicator), then hover a crumb link.
 */
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Hover the ellipsis/overflow indicator
  try {
    const ellipsis = page.locator('[data-slot="breadcrumb-ellipsis"]').first();
    await ellipsis.waitFor({ state: "visible", timeout: 2000 });
    await ellipsis.hover();
  } catch {
    try {
      await page.mouse.move(W / 2 - 60, H / 2, { steps: 8 });
    } catch { /* ignore */ }
  }
  await wait(700);

  // Hover the "Components" crumb link
  try {
    const crumb = page.getByRole("link", { name: "Components" });
    await crumb.hover({ timeout: 1500 });
  } catch {
    try {
      await page.mouse.move(W / 2 + 20, H / 2, { steps: 8 });
    } catch { /* ignore */ }
  }
  await wait(700);

  // Return near start
  try {
    await page.mouse.move(W / 2 - 120, H / 2, { steps: 8 });
  } catch { /* ignore */ }
  await wait(300);
}
