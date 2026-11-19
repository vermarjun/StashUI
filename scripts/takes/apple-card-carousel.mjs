// apple-card-carousel — open a card into its expanded detail, then close it
export default async (film) => {
  await film.click(film.page.getByText("Mountain Peaks", { exact: true }).first(), { hold: 1600 });
  film.mark("hero");
  await film.press("Escape", { hold: 1100 });
};
