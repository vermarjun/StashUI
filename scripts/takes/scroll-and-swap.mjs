// scroll-and-swap — scroll the list slowly; each name rolls over to its twin as it crosses the band
export default async (film) => {
  await film.glide({ x: film.W / 2, y: film.H * 0.55 }, { secs: 0.6 });
  await film.scroll(500, { secs: 2.2 });
  film.mark("hero");
  await film.scroll(350, { secs: 1.8 });
  await film.hold(900);
};
