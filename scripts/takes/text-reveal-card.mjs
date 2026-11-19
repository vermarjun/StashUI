// text-reveal-card — wipe the cursor across the card to expose the hidden line
export default async (film) => {
  const card = film.page.locator("[data-rec-root] [class*='w-[40rem]']").first();
  const b = await card.boundingBox();
  const y = b.y + b.height * 0.62;
  const l = b.x + 8, r = b.x + b.width - 8;
  await film.glide({ x: l, y }, { secs: 0.7 });
  await film.hold(250);
  await film.glide({ x: r, y }, { secs: 1.5 });
  await film.hold(400);
  film.mark("hero");
  await film.glide({ x: b.x + b.width * 0.4, y }, { secs: 0.9 });
  await film.hold(900);
};
