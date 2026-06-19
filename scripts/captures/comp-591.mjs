/**
 * Capture choreography for comp-591
 * Header with an AI model Select trigger on the left (shows current model name
 * "Orion-Alpha 4.5") and icon buttons + UserMenu on the right.
 * The main interactive widget is the model Select dropdown.
 * Type: NAVIGATION-MENU (model selector as primary nav widget).
 * Sequence: click model Select → dwell (dropdown open with model list) →
 *           hover second option → hover third option → press Escape → rest.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(400);

  try {
    // Click the AI model select trigger
    const modelSelect = page.getByRole("combobox", { name: /select ai model/i });
    await modelSelect.waitFor({ state: "visible", timeout: 4000 });
    await modelSelect.click();
    await wait(1000);

    // Hover second option "Orion-Code 4"
    try {
      const option2 = page.getByRole("option", { name: /orion-code/i });
      await option2.hover();
      await wait(700);
    } catch (_) {}

    // Hover third option "Nova-Chat 4"
    try {
      const option3 = page.getByRole("option", { name: /nova-chat/i });
      await option3.hover();
      await wait(700);
    } catch (_) {}

    // Hover fourth option "Galaxy-Max 4"
    try {
      const option4 = page.getByRole("option", { name: /galaxy-max/i });
      await option4.hover();
      await wait(700);
    } catch (_) {}

    // Dismiss dropdown
    await page.keyboard.press("Escape");
    await wait(500);

    // Move mouse to neutral area
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
