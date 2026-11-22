// scroll-and-swap: scroll the list steadily; each name rolls over to its twin
// as it crosses the band. Poster is taken once the scroll has settled.
export default async (film) => {
  await film.glide({ x: film.W / 2, y: film.H * 0.55 }, { secs: 0.6 });
  await film.scroll(420, { secs: 2.0 });
  await film.scroll(380, { secs: 2.0 });
  await film.hold(700);
  film.mark("hero");
};
