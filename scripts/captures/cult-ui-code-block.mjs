// cult-ui-code-block: hover the single-code block to reveal copy button and click it;
// then switch to the tabbed block's second tab (hook.ts) via the animated tab indicator,
// hover the copy button there, click it, then switch back to usage.tsx.
export default async function capture(page, { W, H, cfg, wait }) {
  // Let framer-motion animations settle
  await wait(500);

  // --- First block (bash, single): hover to reveal Copy button ---
  try {
    const firstBlock = page.locator(".group").first();
    await firstBlock.hover({ timeout: 2000 });
    await wait(400);

    // Click the copy button (aria-label="Copy code")
    const copyBtn = page.getByRole("button", { name: "Copy code" }).first();
    await copyBtn.hover({ timeout: 1500 });
    await wait(300);
    await copyBtn.click({ timeout: 1500 });
    await wait(800); // watch Copied state transition (framer scale+rotate)
  } catch (_) {
    try {
      await page.mouse.move(W * 0.82, H * 0.13, { steps: 8 });
      await wait(400);
      await page.mouse.click(W * 0.82, H * 0.13);
      await wait(700);
    } catch (_2) {}
  }

  // --- Tabbed block: click "hook.ts" tab ---
  try {
    const hookTab = page.getByRole("tab", { name: "hook.ts" });
    await hookTab.hover({ timeout: 2000 });
    await wait(300);
    await hookTab.click({ timeout: 2000 });
    await wait(600); // animated slide + blur-in of new code content
  } catch (_) {
    try {
      const hookTab = page.locator("button:has-text('hook.ts')");
      await hookTab.click({ timeout: 1500 });
      await wait(600);
    } catch (_2) {}
  }

  // Hover the copy button on the tabbed block
  try {
    const copyBtns = page.getByRole("button", { name: "Copy code" });
    const secondCopy = copyBtns.nth(1);
    await secondCopy.hover({ timeout: 1500 });
    await wait(300);
    await secondCopy.click({ timeout: 1500 });
    await wait(700);
  } catch (_) {}

  // Switch back to usage.tsx
  try {
    const usageTab = page.getByRole("tab", { name: "usage.tsx" });
    await usageTab.hover({ timeout: 1500 });
    await wait(200);
    await usageTab.click({ timeout: 1500 });
    await wait(400);
  } catch (_) {}

  // Return mouse to center for clean loop seam
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
  } catch (_) {}
  await wait(300);
}
