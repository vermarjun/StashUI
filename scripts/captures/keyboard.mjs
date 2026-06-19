export default async function capture(page, { W, H, cfg, wait }) {
  // Helper: dispatch mousedown then mouseup on an element found by selector
  async function pressKey(selector) {
    try {
      const el = page.locator(selector).first();
      await el.dispatchEvent("mousedown");
      await wait(90);
      await el.dispatchEvent("mouseup");
      await wait(80);
    } catch (_) {}
  }

  // Helper: hover over an element briefly
  async function hoverKey(selector) {
    try {
      const el = page.locator(selector).first();
      await el.hover({ timeout: 1500 });
      await wait(120);
    } catch (_) {}
  }

  // Give the keyboard a moment to mount and zoom settle
  await wait(400);

  // Type "H-E-L-L-O" on the home/QWERTY rows via physical keyboard
  const helloKeys = ["KeyH", "KeyE", "KeyL", "KeyL", "KeyO"];
  for (const code of helloKeys) {
    try {
      await page.keyboard.down(code.replace("Key", ""));
      await wait(100);
      await page.keyboard.up(code.replace("Key", ""));
      await wait(150);
    } catch (_) {}
  }

  await wait(200);

  // Hover over a few function-row keys to show them light up
  const fKeys = ["button:has-text('F1')", "button:has-text('F5')", "button:has-text('F9')"];
  for (const sel of fKeys) {
    await hoverKey(sel);
  }

  await wait(150);

  // Press Enter and Backspace via mouse to show modifier-style keys depress
  await pressKey("button:has-text('return')");
  await wait(120);
  await pressKey("button:has-text('delete')");
  await wait(120);

  // Sweep across home-row letters A–L with rapid mouseovers
  const homeRow = ["KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL"];
  for (const code of homeRow) {
    try {
      await page.keyboard.down(code.replace("Key", ""));
      await wait(60);
      await page.keyboard.up(code.replace("Key", ""));
      await wait(60);
    } catch (_) {}
  }

  await wait(200);

  // End with Space bar press — the wide key makes a satisfying visual finale
  try {
    await page.keyboard.press(" ");
    await wait(200);
  } catch (_) {}

  // Return to neutral — ensure no keys remain held
  try {
    await page.keyboard.up("a");
  } catch (_) {}

  await wait(300);
}
