// Origin UI Label: the demo renders a real label + username field. Hover the
// label, focus the input to reveal the focus ring, type, then blur for a clean
// resting loop seam.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  try {
    const label = page.locator("label").first();
    await label.hover({ timeout: 1500 });
  } catch {
    try {
      await page.mouse.move(W / 2, H / 2, { steps: 10 });
    } catch {
      /* ignore */
    }
  }
  await wait(600);

  try {
    const input = page.locator("input, textarea").first();
    await input.click({ timeout: 1500 });
    await wait(450);
    await input.type("my_handle", { delay: 85 });
    await wait(600);
    await input.blur();
  } catch {
    await wait(1200);
  }

  await wait(400);
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
  } catch {
    /* ignore */
  }
  await wait(300);
}
