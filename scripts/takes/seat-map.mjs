// seat-map — paint four seats by dragging along a row; the total updates as you go
export default async (film) => {
  const page = film.page;
  const at = async (id) => {
    const b = await page.locator(`[data-seat="${id}"]`).boundingBox();
    return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
  };
  const a = await at("E4");
  const z = await at("E8");
  await film.glide(a, { secs: 0.7 });
  await page.mouse.down();
  for (let i = 1; i <= 24; i++) {
    await page.mouse.move(a.x + ((z.x - a.x) * i) / 24, a.y);
    await film.hold(30);
  }
  await page.mouse.up();
  film.mark("hero");
  await film.hold(1400);
  await film.click(await at("C5"), { hold: 1200 });
};
