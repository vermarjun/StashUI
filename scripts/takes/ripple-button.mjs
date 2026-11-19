// click the button a few times in different spots so the ripples are clear
export default async (film) => {
  const btn = film.page.locator("[data-rec-root] button").first();
  const b = await btn.boundingBox();
  const at = (fx, fy) => ({ x: b.x + b.width * fx, y: b.y + b.height * fy });
  await film.glide(at(0.3, 0.5), { secs: 0.8 });
  await film.page.mouse.down(); await film.page.mouse.up();
  await film.hold(700);
  film.mark("hero");
  await film.glide(at(0.75, 0.4), { secs: 0.5 });
  await film.page.mouse.down(); await film.page.mouse.up();
  await film.hold(700);
  await film.glide(at(0.5, 0.6), { secs: 0.5 });
  await film.page.mouse.down(); await film.page.mouse.up();
  await film.hold(900);
};
