// marking-menu — press and hold to open the radial menu, drag toward an item, release to pick it
export default async (film) => {
  const page = film.page;
  const b = await page.locator("[data-rec-root] .cursor-crosshair").first().boundingBox();
  const cx = b.x + b.width / 2, cy = b.y + b.height * 0.55;
  await film.glide({ x: cx, y: cy }, { secs: 0.7 });
  await page.mouse.down();
  await film.hold(700);
  for (let i = 1; i <= 14; i++) {
    await page.mouse.move(cx + i * 6, cy - i * 4);
    await film.hold(30);
  }
  film.mark("hero");
  await film.hold(700);
  await page.mouse.up();
  await film.hold(1300);
};
