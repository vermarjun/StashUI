// feature-carousel — click the card face through its 4 feature steps
export default async (film) => {
  const card = film.page.locator("[data-rec-root] [class*='from-neutral-900']").first();
  const b = await card.boundingBox();
  const x = b.x + b.width / 2, y = b.y + b.height * 0.55;
  await film.click({ x, y }, { hold: 1300 });
  film.mark("hero");
  await film.click({ x, y }, { hold: 1300 });
  await film.click({ x, y }, { hold: 1300 });
};
