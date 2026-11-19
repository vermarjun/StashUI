// team-clippath — hover each portrait: one expands wide, the others blur out
export default async (film) => {
  await film.hover(film.page.getByAltText("Adrian Paul").first(), { hold: 1100 });
  film.mark("hero");
  await film.hover(film.page.getByAltText("Flualy Cual").first(), { hold: 1200 });
  await film.hover(film.page.getByAltText("John Doe").first(), { hold: 1100 });
};
