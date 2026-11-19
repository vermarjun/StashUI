// productcard5 — pick a shoe size, heart it, hover Add to cart
export default async (film) => {
  await film.click(film.page.getByText("8", { exact: true }).first(), { hold: 700 });
  film.mark("hero");
  await film.click(film.page.locator("[data-rec-root] button").first(), { hold: 900 });
  await film.hover(film.page.getByText("Add to cart", { exact: true }).first(), { hold: 1100 });
};
