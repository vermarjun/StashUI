// Origin UI Tree (headless-tree): demo shows a file tree with src/ and
// components/ pre-expanded. TreeItem buttons carry data-folder / aria-expanded.
// Choreography: click folder items to expand/collapse; hover files;
// end near start state for a clean loop seam.
export default async function capture(page, { W, H, wait }) {
  // Let headless-tree mount and populate
  await wait(600);

  // Folder buttons have data-folder="true". Target by visible text.

  // --- Hover "components" folder label ---
  try {
    const comp = page.getByText("components").first();
    await comp.hover({ timeout: 1500 });
  } catch {
    await page.mouse.move(W / 2, H / 2 - 40, { steps: 8 });
  }
  await wait(450);

  // --- Click "components" to collapse it ---
  try {
    const comp = page.getByText("components").first();
    await comp.click({ timeout: 1500 });
  } catch {
    /* ignore */
  }
  await wait(650);

  // --- Hover "lib" folder (now in view) ---
  try {
    const lib = page.getByText("lib").first();
    await lib.hover({ timeout: 1500 });
  } catch {
    await page.mouse.move(W / 2, H / 2, { steps: 8 });
  }
  await wait(400);

  // --- Click "lib" to expand ---
  try {
    const lib = page.getByText("lib").first();
    await lib.click({ timeout: 1500 });
  } catch {
    /* ignore */
  }
  await wait(650);

  // --- Hover "utils.ts" file ---
  try {
    const utils = page.getByText("utils.ts").first();
    await utils.hover({ timeout: 1500 });
  } catch {
    await page.mouse.move(W / 2, H / 2 + 50, { steps: 6 });
  }
  await wait(450);

  // --- Click "lib" to collapse ---
  try {
    const lib = page.getByText("lib").first();
    await lib.click({ timeout: 1500 });
  } catch {
    /* ignore */
  }
  await wait(500);

  // --- Re-expand "components" to return near start state ---
  try {
    const comp = page.getByText("components").first();
    await comp.click({ timeout: 1500 });
  } catch {
    /* ignore */
  }
  await wait(600);

  // --- Hover "public" folder ---
  try {
    const pub = page.getByText("public").first();
    await pub.hover({ timeout: 1500 });
  } catch {
    await page.mouse.move(W / 2, H * 0.65, { steps: 8 });
  }
  await wait(400);

  // --- Expand "public" ---
  try {
    const pub = page.getByText("public").first();
    await pub.click({ timeout: 1500 });
  } catch {
    /* ignore */
  }
  await wait(600);

  // --- Hover "logo.svg" file ---
  try {
    const logo = page.getByText("logo.svg").first();
    await logo.hover({ timeout: 1500 });
  } catch {
    await page.mouse.move(W / 2, H * 0.75, { steps: 6 });
  }
  await wait(400);

  // --- Collapse "public" for loop seam ---
  try {
    const pub = page.getByText("public").first();
    await pub.click({ timeout: 1500 });
  } catch {
    /* ignore */
  }
  await wait(450);

  // Move mouse to neutral position
  try {
    await page.mouse.move(W / 2, H * 0.85, { steps: 8 });
  } catch {
    /* ignore */
  }
  await wait(300);
}
