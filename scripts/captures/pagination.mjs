/**
 * pagination — PAGINATION choreography.
 * Click page 2, then page 3, then Next, then back to page 1.
 */
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Click page 2
  try {
    const p2 = page.getByRole("link", { name: "2" }).first();
    await p2.waitFor({ state: "visible", timeout: 2000 });
    await p2.click();
  } catch {
    try {
      await page.mouse.click(W / 2 + 10, H / 2);
    } catch { /* ignore */ }
  }
  await wait(550);

  // Click page 3
  try {
    const p3 = page.getByRole("link", { name: "3" }).first();
    await p3.click({ timeout: 1500 });
  } catch {
    try {
      await page.mouse.click(W / 2 + 50, H / 2);
    } catch { /* ignore */ }
  }
  await wait(550);

  // Click Next
  try {
    const next = page.getByRole("link", { name: /next/i }).first();
    await next.click({ timeout: 1500 });
  } catch {
    try {
      await page.mouse.click(W / 2 + 120, H / 2);
    } catch { /* ignore */ }
  }
  await wait(600);

  // Click page 1 to return near start
  try {
    const p1 = page.getByRole("link", { name: "1" }).first();
    await p1.click({ timeout: 1500 });
  } catch {
    try {
      await page.mouse.click(W / 2 - 40, H / 2);
    } catch { /* ignore */ }
  }
  await wait(400);
}
