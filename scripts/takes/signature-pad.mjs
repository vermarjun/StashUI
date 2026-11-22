// Signature pad: signs a looping cursive name so the sprung, speed-weighted ink shows
export default async (film) => {
  const page = film.page;
  const box = await page.locator("[data-rec-root] canvas[role=img]").boundingBox();
  const ox = box.x + box.width * 0.14;
  const oy = box.y + box.height * 0.55;
  const sx = box.width * 0.72;
  const sy = box.height * 0.22;
  await film.glide({ x: ox, y: oy }, { secs: 0.6 });
  await page.mouse.down();
  const N = 90;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    // a slanted run of loops drifting right, like a quick signature
    const x = ox + sx * t + Math.sin(t * Math.PI * 10) * 14;
    const y = oy - Math.abs(Math.sin(t * Math.PI * 5)) * sy + Math.cos(t * Math.PI * 10) * 6;
    await page.mouse.move(x, y);
    await page.waitForTimeout(14);
  }
  await page.mouse.up();
  // the underline flourish
  await page.mouse.move(ox + sx * 0.1, oy + 14);
  await page.mouse.down();
  for (let i = 0; i <= 24; i++) {
    await page.mouse.move(ox + sx * (0.1 + 0.85 * (i / 24)), oy + 14 - i * 0.6);
    await page.waitForTimeout(10);
  }
  await page.mouse.up();
  film.mark("hero");
  await film.hold(1200);
};
