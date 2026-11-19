// team-vr — scroll to the team and hover a portrait to reveal its quote panel
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.6 }, { secs: 0.6 });
  await film.scroll(240, { secs: 1.3 });
  await film.hover(film.page.getByAltText("Michael Scott").first(), { hold: 1600 });
  film.mark("hero");
  await film.hover(film.page.getByAltText("David Brent").first(), { hold: 1300 });
};
