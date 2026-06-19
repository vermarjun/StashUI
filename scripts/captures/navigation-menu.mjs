/**
 * navigation-menu — NAVIGATION-MENU choreography.
 * Click "Products" trigger so its dropdown opens, dwell, then click "Docs"
 * to switch panels, dwell, then move away to close.
 */
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Click "Products" trigger to open dropdown
  try {
    const products = page.getByRole("button", { name: /products/i });
    await products.waitFor({ state: "visible", timeout: 2000 });
    await products.click();
  } catch {
    try {
      await page.mouse.click(W / 2 - 80, H / 4);
    } catch { /* ignore */ }
  }
  await wait(800);

  // Hover one of the dropdown links
  try {
    const link = page.getByRole("link", { name: /analytics/i }).first();
    await link.hover({ timeout: 1500 });
  } catch {
    try {
      await page.mouse.move(W / 2 - 80, H / 4 + 60, { steps: 8 });
    } catch { /* ignore */ }
  }
  await wait(600);

  // Click "Docs" trigger to switch panel
  try {
    const docs = page.getByRole("button", { name: /docs/i });
    await docs.click({ timeout: 1500 });
  } catch {
    try {
      await page.mouse.click(W / 2, H / 4);
    } catch { /* ignore */ }
  }
  await wait(800);

  // Move away to close the menu
  try {
    await page.mouse.move(W / 2, H * 0.85, { steps: 12 });
  } catch { /* ignore */ }
  await wait(400);
}
