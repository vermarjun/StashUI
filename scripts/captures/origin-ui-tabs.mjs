/**
 * origin-ui-tabs (tabs.tsx) — TABS choreography.
 * Click "Analytics" tab, then "Settings" tab, then back to "Overview".
 */
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Click "Analytics" tab
  try {
    const tab = page.getByRole("tab", { name: /analytics/i }).first();
    await tab.waitFor({ state: "visible", timeout: 2000 });
    await tab.click();
  } catch {
    try {
      await page.mouse.click(W / 2 + 40, H / 2 - 60);
    } catch { /* ignore */ }
  }
  await wait(600);

  // Click "Settings" tab
  try {
    const tab = page.getByRole("tab", { name: /settings/i }).first();
    await tab.click({ timeout: 1500 });
  } catch {
    try {
      await page.mouse.click(W / 2 + 100, H / 2 - 60);
    } catch { /* ignore */ }
  }
  await wait(600);

  // Return to "Overview" tab
  try {
    const tab = page.getByRole("tab", { name: /overview/i }).first();
    await tab.click({ timeout: 1500 });
  } catch {
    try {
      await page.mouse.click(W / 2 - 70, H / 2 - 60);
    } catch { /* ignore */ }
  }
  await wait(400);
}
