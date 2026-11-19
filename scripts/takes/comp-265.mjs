// narrow the price range so the histogram selection and item count change
export default async (film) => {
  const thumbs = film.page.locator("[data-rec-root] [role=slider]");
  const track = await film.page.locator("[data-rec-root] [data-slot=slider]").first().boundingBox();
  const maxThumb = thumbs.nth(1);
  const b = await maxThumb.boundingBox();
  const y = b.y + b.height / 2;
  await film.glide({ x: b.x + b.width / 2, y }, { secs: 0.7 });
  await film.page.mouse.down();
  await film.hold(150);
  await film.glide({ x: track.x + track.width * 0.52, y }, { secs: 1.2 });
  film.mark("hero");
  await film.hold(400);
  await film.page.mouse.up();
  await film.hold(1100);
  await film.hover({ role: "button", name: /items/i }, { hold: 1200 });
};
