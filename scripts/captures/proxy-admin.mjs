/**
 * Choreography: proxy-admin
 *
 * An LLM-gateway control dashboard. The demo wires it to a mock backend, so it
 * populates with two connected providers. Showcase the payoff interaction:
 * open the "Quick test" tab, run a model test, dwell on the green OK result,
 * then return to the providers grid for a clean loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount + mock status round-trip (skeleton ~450ms → populated grid).
  try { await wait(1400); } catch (_) {}
  // Dwell on the providers overview.
  try { await wait(700); } catch (_) {}

  // 2. Switch to the "Quick test" tab.
  try {
    const tab = page.getByRole("tab", { name: /quick test/i }).first();
    await tab.click({ timeout: 4000 });
    await wait(800);
  } catch (_) {}

  // 3. Run a model test — mock replies "API OK" after ~600ms.
  try {
    const run = page.getByRole("button", { name: /run test/i }).first();
    await run.scrollIntoViewIfNeeded({ timeout: 3000 }).catch(() => {});
    await run.click({ timeout: 4000 });
    await wait(1300); // wait out the mock latency + result render
  } catch (_) {}

  // 4. Scroll the green OK result box into view and dwell on it.
  try {
    await page.evaluate(() =>
      window.scrollBy({ top: 260, behavior: "smooth" })
    );
    await wait(1300);
  } catch (_) {}

  // 5. Back to the providers grid + ease to top so the loop seam is clean.
  try {
    const tab = page.getByRole("tab", { name: /providers/i }).first();
    await tab.click({ timeout: 4000 });
    await wait(500);
  } catch (_) {}
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    await wait(600);
  } catch (_) {}
  try { await page.mouse.move(W / 2, H * 0.1, { steps: 8 }); } catch (_) {}
  try { await wait(300); } catch (_) {}
}
