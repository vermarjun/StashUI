export default async function capture(page, { W, H, cfg, wait }) {
  // cult-ui TerminalAnimationRoot auto-starts tab 0 ("new") on mount.
  // The command "vite new my-app" (16 chars × ~42ms avg = ~672ms typing)
  // then 17 output lines with delays totalling ≈ 2800ms.
  // After watching tab 0 complete, click through a couple more tabs.

  // Settle and let tab 0 start animating
  await wait(400);

  // Wait for tab 0 to fully complete (typing + all lines)
  // ~700ms typing + 250ms pause + 17 lines × avg 140ms ≈ 3.3s
  try {
    await wait(3500);
  } catch (_) {}

  // Brief dwell on completed tab 0
  await wait(600);

  // Click tab "dev" (index 1)
  try {
    const tabs = await page.$$('[data-slot="terminal-animation-tab-trigger"]');
    if (tabs[1]) await tabs[1].click();
  } catch (_) {}

  // Wait for dev tab to type + show output (~700ms + 9 lines × avg 250ms ≈ 3s)
  try {
    await wait(3200);
  } catch (_) {}

  // Brief dwell
  await wait(500);

  // Click back to tab 0 to reset for loop
  try {
    const tabs = await page.$$('[data-slot="terminal-animation-tab-trigger"]');
    if (tabs[0]) await tabs[0].click();
  } catch (_) {}

  await wait(400);
}
