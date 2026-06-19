// code-tabs-mdx (ui-layouts): click between the "ui-layouts" and "shadcn" tabs;
// hover the copy button on each active tab and click it; end back on ui-layouts.
export default async function capture(page, { W, H, cfg, wait }) {
  // Let server-rendered highlighted HTML paint
  await wait(700);

  // The tabs start on "ui-layouts" — hover and dwell to show the copy button
  try {
    const copyBtn = page.locator('[class*="absolute"][class*="right"]').first();
    await copyBtn.hover({ timeout: 2000 });
    await wait(400);
    await copyBtn.click({ timeout: 2000 });
    await wait(700); // checkmark animation
  } catch (_) {
    try {
      await page.mouse.move(W * 0.88, H * 0.38, { steps: 8 });
      await wait(400);
      await page.mouse.click(W * 0.88, H * 0.38);
      await wait(600);
    } catch (_2) {}
  }

  // Click the "shadcn" tab trigger
  try {
    const shadcnTab = page.getByRole("tab", { name: /shadcn/i });
    await shadcnTab.hover({ timeout: 2000 });
    await wait(300);
    await shadcnTab.click({ timeout: 2000 });
    await wait(600); // tab content swap
  } catch (_) {
    try {
      const shadcnTab = page.locator('[role="tab"]:has-text("shadcn")');
      await shadcnTab.click({ timeout: 1500 });
      await wait(600);
    } catch (_2) {}
  }

  // Hover and click the copy button on the shadcn tab
  try {
    const copyBtn = page.locator('[class*="absolute"][class*="right"]').first();
    await copyBtn.hover({ timeout: 1500 });
    await wait(300);
    await copyBtn.click({ timeout: 1500 });
    await wait(700);
  } catch (_) {}

  // Switch back to ui-layouts tab
  try {
    const uiTab = page.getByRole("tab", { name: /ui-layouts/i });
    await uiTab.hover({ timeout: 1500 });
    await wait(200);
    await uiTab.click({ timeout: 1500 });
    await wait(400);
  } catch (_) {}

  // Return mouse to neutral
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
  } catch (_) {}
  await wait(300);
}
