/**
 * comp-432 — TABS (browser/card tabs — rounded-b-none border style).
 * Click "Tab 2", then "Tab 3", then back to "Tab 1".
 */
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Click Tab 2
  try {
    const tab = page.getByRole("tab", { name: "Tab 2" }).first();
    await tab.waitFor({ state: "visible", timeout: 2000 });
    await tab.click();
  } catch {
    try {
      await page.mouse.click(W / 2 + 30, H / 2 - 50);
    } catch { /* ignore */ }
  }
  await wait(600);

  // Click Tab 3
  try {
    const tab = page.getByRole("tab", { name: "Tab 3" }).first();
    await tab.click({ timeout: 1500 });
  } catch {
    try {
      await page.mouse.click(W / 2 + 80, H / 2 - 50);
    } catch { /* ignore */ }
  }
  await wait(600);

  // Return to Tab 1
  try {
    const tab = page.getByRole("tab", { name: "Tab 1" }).first();
    await tab.click({ timeout: 1500 });
  } catch {
    try {
      await page.mouse.click(W / 2 - 50, H / 2 - 50);
    } catch { /* ignore */ }
  }
  await wait(400);
}
