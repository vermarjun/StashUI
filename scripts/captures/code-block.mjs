// code-block (aceternity-ui): hover to reveal the copy button and click it;
// then switch to the CSS tab, dwell, and switch back. End at start position.
export default async function capture(page, { W, H, cfg, wait }) {
  // Let the syntax highlighter render
  await wait(600);

  // --- First code block: hover to reveal copy button, then click it ---
  try {
    // Move into the first code block area
    await page.mouse.move(W / 2, H * 0.22, { steps: 12 });
    await wait(500);

    // The copy button is a button with the copy icon inside the first block
    const copyBtn = page.locator("button").filter({ hasText: "" }).first();
    await copyBtn.hover({ timeout: 2000 });
    await wait(400);
    await copyBtn.click({ timeout: 2000 });
    await wait(700); // show "copied" / check state
  } catch (_) {
    // Fallback: click at the top-right of the first block
    try {
      await page.mouse.move(W * 0.88, H * 0.13, { steps: 8 });
      await wait(400);
      await page.mouse.click(W * 0.88, H * 0.13);
      await wait(600);
    } catch (_2) {}
  }

  // --- Second code block (tabs): click the "styles.css" tab ---
  try {
    const cssTab = page.getByRole("button", { name: "styles.css" });
    await cssTab.hover({ timeout: 2000 });
    await wait(300);
    await cssTab.click({ timeout: 2000 });
    await wait(700); // animated slide-in of new code
  } catch (_) {
    try {
      // Try clicking by text content
      const tab = page.locator("button:has-text('styles.css')");
      await tab.click({ timeout: 1500 });
      await wait(700);
    } catch (_2) {}
  }

  // --- Switch back to the first tab (counter.tsx) ---
  try {
    const firstTab = page.getByRole("button", { name: "counter.tsx" });
    await firstTab.hover({ timeout: 1500 });
    await wait(300);
    await firstTab.click({ timeout: 1500 });
    await wait(500);
  } catch (_) {}

  // Return mouse to center to clean up loop seam
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
  } catch (_) {}
  await wait(300);
}
