/**
 * Capture choreography for comp-595
 * Header with a back chevron button + "Basic UI" title (left), and history /
 * comments / add-user icon buttons + three online-user avatars + "+3" overflow
 * button (right).
 * Type: NAVIGATION-MENU — hover the icon buttons and avatar cluster.
 * Sequence: hover "Go back" button → hover "History" → hover "Comments"
 *           → hover "Add user" → hover "+3" overflow button → rest.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(400);

  try {
    // Hover "Go back" chevron button
    const backBtn = page.getByRole("link", { name: /go back/i }).first();
    await backBtn.waitFor({ state: "visible", timeout: 4000 });
    await backBtn.hover();
    await wait(700);

    // Hover "History" icon button
    try {
      const historyBtn = page.getByRole("button", { name: /history/i });
      await historyBtn.hover();
      await wait(700);
    } catch (_) {}

    // Hover "Save" / comments button
    try {
      const commentsBtn = page.getByRole("button", { name: /save/i });
      await commentsBtn.hover();
      await wait(700);
    } catch (_) {}

    // Hover "Add user" button
    try {
      const addUserBtn = page.getByRole("button", { name: /add user/i });
      await addUserBtn.hover();
      await wait(700);
    } catch (_) {}

    // Hover "+3" overflow button
    try {
      const overflowBtn = page.getByRole("button", { name: /\+3/ });
      await overflowBtn.hover();
      await wait(600);
    } catch (_) {
      try {
        const overflowBtn = page.locator("button").filter({ hasText: "+3" });
        await overflowBtn.hover();
        await wait(600);
      } catch (_) {}
    }

    // Move mouse away
    await page.mouse.move(cx, cy + 200, { steps: 12 });
    await wait(400);
  } catch (err) {
    try {
      await page.mouse.move(cx, cy, { steps: 8 });
      await wait(800);
      await page.mouse.move(cx, cy + 200, { steps: 10 });
      await wait(400);
    } catch (_) {}
  }

  // End near start
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(300);
  } catch (_) {}
}
