// raise the vertical slider, then type a precise value into the box
export default async (film) => {
  const thumb = film.page.locator("[data-rec-root] [role=slider]").first();
  const b = await thumb.boundingBox();
  const x = b.x + b.width / 2;
  const y = b.y + b.height / 2;
  await film.glide({ x, y }, { secs: 0.7 });
  await film.page.mouse.down();
  await film.hold(150);
  await film.glide({ x, y: y - 70 }, { secs: 1.1 });
  film.mark("hero");
  await film.page.mouse.up();
  await film.hold(800);
  await film.type("[data-rec-root] input", "80", { delay: 110, hold: 600 });
  await film.press("Enter", { hold: 1200 });
};
