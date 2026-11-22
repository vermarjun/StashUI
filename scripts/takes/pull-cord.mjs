// Pull cord: tugs the cord down to switch the lamp off, then again to switch it on
export default async (film) => {
  const page = film.page;
  const box = await page.locator("[data-rec-root] svg[viewBox='0 0 288 360']").boundingBox();
  // bead sits at (180, 218 + ~10) in the 288x360 viewBox
  const x = box.x + (box.width * 180) / 288;
  const y = box.y + (box.height * 228) / 360;
  const tug = async () => {
    await film.glide({ x, y }, { secs: 0.6 });
    await page.mouse.down();
    const pull = (box.height * 80) / 360; // ~80 viewBox units, well past the click point
    for (let i = 1; i <= 14; i++) {
      await page.mouse.move(x + i * 0.4, y + (pull * i) / 14);
      await page.waitForTimeout(16);
    }
    await page.waitForTimeout(120);
    await page.mouse.up();
  };
  await tug();
  film.mark("hero");
  await film.hold(1300);
  await tug();
  await film.hold(1200);
};
