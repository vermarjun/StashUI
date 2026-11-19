// Cult dock: sweep along the dock so the cards swell toward the cursor, then click one so it bounces
export default async (film) => {
  const cards = film.page.locator("[data-rec-root] button");
  const first = await cards.first().boundingBox();
  const last = await cards.last().boundingBox();
  const y = first.y + first.height * 0.5;
  await film.glide({ x: first.x + 10, y }, { secs: 0.8 });
  await film.glide({ x: last.x + last.width - 10, y }, { secs: 2.2 });
  film.mark("hero");
  await film.click(cards.nth(1), { hold: 1400 });
};
