// team-classic — scroll to the roster and hover two members for the ring + emoji
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.6 }, { secs: 0.6 });
  await film.scroll(260, { secs: 1.4 });
  await film.hover(film.page.getByAltText("Candice Wu").first(), { hold: 1300 });
  film.mark("hero");
  await film.hover(film.page.getByAltText("Demi Wilkinson").first(), { hold: 1300 });
};
