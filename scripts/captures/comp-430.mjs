/**
 * comp-430 — TABS (underline with hover accent, gap-2 style).
 * Hover Tab 2 first (to show hover state), click it, then click Tab 3, then Tab 1.
 */
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Hover Tab 2 to show hover accent
  try {
    const tab = page.getByRole("tab", { name: "Tab 2" }).first();
    await tab.waitFor({ state: "visible", timeout: 2000 });
    await tab.hover();
  } catch {
    try {
      await page.mouse.move(W / 2 + 30, H / 2 - 50, { steps: 8 });
    } catch { /* ignore */ }
  }
  await wait(500);

  // Click Tab 2
  try {
    const tab = page.getByRole("tab", { name: "Tab 2" }).first();
    await tab.click({ timeout: 1500 });
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
