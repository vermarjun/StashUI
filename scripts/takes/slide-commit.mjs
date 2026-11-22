// Slide-to-pay: drag the handle across, it spins while pending, then unfurls into a done pill.
export default async (film) => {
  const track = film.page.locator("[data-rec-root] [role=slider]").first();
  const b = await track.boundingBox();
  const y = b.y + b.height / 2;
  await film.glide({ x: b.x + 26, y });
  await film.page.mouse.down();
  await film.glide({ x: b.x + b.width - 20, y }, { secs: 0.9 });
  await film.page.mouse.up();
  await film.hold(900);
  film.mark("hero");
  await film.hold(1600);
};
