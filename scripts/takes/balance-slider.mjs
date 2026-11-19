// balance-slider — drag the balance from left-heavy to right-heavy
export default async (film) => {
  const input = film.page.locator("[data-rec-root] input[type=range]").first();
  const b = await input.boundingBox();
  const y = b.y + b.height / 2;
  const cx = b.x + b.width / 2;
  await film.glide({ x: cx, y });
  await film.page.mouse.down();
  await film.glide({ x: cx - 110, y }, { secs: 1 });
  await film.hold(600);
  await film.glide({ x: cx + 130, y }, { secs: 1.2 });
  film.mark("hero");
  await film.hold(700);
  await film.page.mouse.up();
  await film.hold(900);
};
