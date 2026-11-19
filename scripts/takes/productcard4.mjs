// productcard4 — heart the product, then hover Add to cart
export default async (film) => {
  const heart = film.page.locator("[data-rec-root] button").first();
  await film.click(heart, { hold: 900 });
  film.mark("hero");
  await film.hover(film.page.getByText("Add to cart", { exact: true }).first(), { hold: 1300 });
};
