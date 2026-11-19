// liquid-glass — drag the frosted card and let the spring pull it back
export default async (film) => {
  const card = film.page.locator("[data-rec-root] [class*='cursor-grab']").first();
  const b = await card.boundingBox();
  const x = b.x + b.width / 2, y = b.y + b.height * 0.55;
  await film.glide({ x, y }, { secs: 0.7 });
  await film.hold(250);
  await film.page.mouse.down();
  await film.glide({ x: x + 90, y: y - 40 }, { secs: 0.9 });
  await film.hold(300);
  film.mark("hero");
  await film.page.mouse.up();
  await film.hold(1400);
};
