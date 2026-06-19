// Inspira React FileTree: demo renders src/ with components/ and lib/ folders,
// pre-expanded on src and components. Uses div click handlers (not accordion).
// Choreography: hover items, collapse/expand folders to show open/close icons,
// end near start state.
export default async function capture(page, { W, H, wait }) {
  // Let component mount
  await wait(500);

  // Demo starts with "src" and "components" expanded.
  // "lib" is collapsed inside src.

  // --- Hover "components" folder ---
  try {
    const componentsFolder = page.getByText("components").first();
    await componentsFolder.hover({ timeout: 1500 });
  } catch {
    await page.mouse.move(W / 2, H / 2 - 50, { steps: 8 });
  }
  await wait(450);

  // --- Click "components" to collapse ---
  try {
    const componentsFolder = page.getByText("components").first();
    await componentsFolder.click({ timeout: 1500 });
  } catch {
    /* ignore */
  }
  await wait(650);

  // --- Hover "lib" folder (now visible without components content blocking) ---
  try {
    const libFolder = page.getByText("lib").first();
    await libFolder.hover({ timeout: 1500 });
  } catch {
    await page.mouse.move(W / 2, H / 2, { steps: 8 });
  }
  await wait(400);

  // --- Click "lib" to expand it ---
  try {
    const libFolder = page.getByText("lib").first();
    await libFolder.click({ timeout: 1500 });
  } catch {
    /* ignore */
  }
  await wait(650);

  // --- Hover utils.ts file ---
  try {
    const utilsFile = page.getByText("utils.ts").first();
    await utilsFile.hover({ timeout: 1500 });
  } catch {
    await page.mouse.move(W / 2, H / 2 + 40, { steps: 6 });
  }
  await wait(450);

  // --- Click "lib" to collapse ---
  try {
    const libFolder = page.getByText("lib").first();
    await libFolder.click({ timeout: 1500 });
  } catch {
    /* ignore */
  }
  await wait(500);

  // --- Re-expand "components" to return near start ---
  try {
    const componentsFolder = page.getByText("components").first();
    await componentsFolder.click({ timeout: 1500 });
  } catch {
    /* ignore */
  }
  await wait(600);

  // --- Hover "Button.tsx" file to show selected/hover state ---
  try {
    const buttonFile = page.getByText("Button.tsx").first();
    await buttonFile.hover({ timeout: 1500 });
  } catch {
    await page.mouse.move(W / 2, H / 2 - 20, { steps: 6 });
  }
  await wait(500);

  // --- Click "src" to collapse the entire tree ---
  try {
    const srcFolder = page.getByText("src").first();
    await srcFolder.click({ timeout: 1500 });
  } catch {
    /* ignore */
  }
  await wait(550);

  // --- Re-expand "src" for near-start loop seam ---
  try {
    const srcFolder = page.getByText("src").first();
    await srcFolder.click({ timeout: 1500 });
  } catch {
    /* ignore */
  }
  await wait(500);

  // Move mouse to neutral position
  try {
    await page.mouse.move(W / 2, H * 0.85, { steps: 8 });
  } catch {
    /* ignore */
  }
  await wait(300);
}
