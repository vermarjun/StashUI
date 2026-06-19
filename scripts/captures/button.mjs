// button — all six variants in a row. Hover each in sequence then click the
// primary button to show the active/pressed state. End at rest.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Hover default (primary) button
  try {
    const primary = page.getByRole("button", { name: "Button" }).first();
    await primary.hover({ timeout: 1500 });
  } catch {
    try {
      await page.mouse.move(W / 2 - 160, H / 2, { steps: 10 });
    } catch { /* ignore */ }
  }
  await wait(600);

  // Hover Secondary
  try {
    await page.getByRole("button", { name: "Secondary" }).hover({ timeout: 1500 });
  } catch {
    try {
      await page.mouse.move(W / 2 - 60, H / 2, { steps: 8 });
    } catch { /* ignore */ }
  }
  await wait(500);

  // Hover Outline
  try {
    await page.getByRole("button", { name: "Outline" }).hover({ timeout: 1500 });
  } catch {
    try {
      await page.mouse.move(W / 2 + 30, H / 2, { steps: 8 });
    } catch { /* ignore */ }
  }
  await wait(500);

  // Hover Ghost
  try {
    await page.getByRole("button", { name: "Ghost" }).hover({ timeout: 1500 });
  } catch {
    try {
      await page.mouse.move(W / 2 + 110, H / 2, { steps: 8 });
    } catch { /* ignore */ }
  }
  await wait(500);

  // Hover Destructive
  try {
    await page.getByRole("button", { name: "Destructive" }).hover({ timeout: 1500 });
  } catch {
    try {
      await page.mouse.move(W / 2 + 200, H / 2, { steps: 8 });
    } catch { /* ignore */ }
  }
  await wait(500);

  // Click primary button to show active state, then move away to rest
  try {
    const primary = page.getByRole("button", { name: "Button" }).first();
    await primary.click({ timeout: 1500 });
  } catch { /* ignore */ }
  await wait(400);

  // Return to neutral
  try {
    await page.mouse.move(W / 2, H * 0.8, { steps: 12 });
  } catch { /* ignore */ }
  await wait(350);
}
