// textarea — plain textarea. Focus the field and type a realistic multi-word
// message to show the focus ring and filled content.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Focus the textarea
  try {
    await page.locator("textarea").first().click({ timeout: 2000 });
  } catch {
    try {
      await page.mouse.click(W / 2, H / 2);
    } catch { /* ignore */ }
  }
  await wait(300);

  // Type a realistic message
  try {
    await page.keyboard.type("Hello, I'd love to learn more about your product.", { delay: 55 });
  } catch { /* ignore */ }
  await wait(700);

  // Move away, keep focus visible
  try {
    await page.mouse.move(W / 2, H * 0.8, { steps: 8 });
  } catch { /* ignore */ }
  await wait(400);
}
