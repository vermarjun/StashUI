// Magic UI FileTree: demo renders a file tree with src/ pre-expanded.
// Choreography: expand/collapse folder rows so the accordion motion is
// clearly visible; hover items; end near start state for a clean loop.
export default async function capture(page, { W, H, wait }) {
  // Let the component mount and accordion settle
  await wait(500);

  // The demo starts with "src" and "components" expanded.
  // Locate folder trigger buttons (AccordionPrimitive.Trigger) via text.

  // --- Hover over "components" folder row to show hover state ---
  try {
    const componentsFolder = page.getByText("components").first();
    await componentsFolder.hover({ timeout: 1500 });
  } catch {
    await page.mouse.move(W / 2, H / 2 - 40, { steps: 8 });
  }
  await wait(500);

  // --- Click "components" to collapse it ---
  try {
    const componentsFolder = page.getByText("components").first();
    await componentsFolder.click({ timeout: 1500 });
  } catch {
    /* ignore */
  }
  await wait(600);

  // --- Hover over "pages" folder (currently collapsed inside src) ---
  try {
    const pagesFolder = page.getByText("pages").first();
    await pagesFolder.hover({ timeout: 1500 });
  } catch {
    await page.mouse.move(W / 2, H / 2 + 20, { steps: 8 });
  }
  await wait(400);

  // --- Click "pages" to expand it ---
  try {
    const pagesFolder = page.getByText("pages").first();
    await pagesFolder.click({ timeout: 1500 });
  } catch {
    /* ignore */
  }
  await wait(700);

  // --- Hover over a file inside pages ---
  try {
    const indexFile = page.getByText("index.tsx").first();
    await indexFile.hover({ timeout: 1500 });
  } catch {
    await page.mouse.move(W / 2, H / 2 + 60, { steps: 6 });
  }
  await wait(500);

  // --- Click "pages" to collapse it ---
  try {
    const pagesFolder = page.getByText("pages").first();
    await pagesFolder.click({ timeout: 1500 });
  } catch {
    /* ignore */
  }
  await wait(500);

  // --- Re-expand "components" to return near start state ---
  try {
    const componentsFolder = page.getByText("components").first();
    await componentsFolder.click({ timeout: 1500 });
  } catch {
    /* ignore */
  }
  await wait(600);

  // --- Hover "public" folder to show hover state ---
  try {
    const publicFolder = page.getByText("public").first();
    await publicFolder.hover({ timeout: 1500 });
  } catch {
    await page.mouse.move(W / 2, H * 0.7, { steps: 8 });
  }
  await wait(400);

  // --- Expand "public" ---
  try {
    const publicFolder = page.getByText("public").first();
    await publicFolder.click({ timeout: 1500 });
  } catch {
    /* ignore */
  }
  await wait(600);

  // --- Collapse "public" to near-start state ---
  try {
    const publicFolder = page.getByText("public").first();
    await publicFolder.click({ timeout: 1500 });
  } catch {
    /* ignore */
  }
  await wait(400);

  // Move mouse away from tree to a neutral position
  try {
    await page.mouse.move(W / 2, H * 0.85, { steps: 8 });
  } catch {
    /* ignore */
  }
  await wait(300);
}
