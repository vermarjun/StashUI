// comp-25: Search input with a ⌘K keyboard shortcut badge on the right end.
// Focus the field and type a search query; the kbd badge stays visible.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Focus the search input
  try {
    const input = page.getByPlaceholder("Search...");
    await input.waitFor({ state: "visible", timeout: 3000 });
    await input.click();
  } catch (_) {
    try {
      await page.locator("input[type='search'], input").first().click();
    } catch (_) {}
  }
  await wait(350);

  // Type a search query
  const query = "input components";
  for (const ch of query) {
    try {
      await page.keyboard.type(ch, { delay: 75 });
    } catch (_) {}
  }
  await wait(700);

  // Select all and retype to show a second query
  try {
    await page.keyboard.press("Control+a");
  } catch (_) {}
  try {
    await page.keyboard.press("Meta+a");
  } catch (_) {}
  await wait(200);
  try {
    await page.keyboard.press("Backspace");
  } catch (_) {}
  await wait(200);

  const query2 = "shadcn ui";
  for (const ch of query2) {
    try {
      await page.keyboard.type(ch, { delay: 80 });
    } catch (_) {}
  }
  await wait(800);

  // Move mouse away to resting state
  try {
    await page.mouse.move(W * 0.5, H * 0.75, { steps: 10 });
  } catch (_) {}
  await wait(400);
}
