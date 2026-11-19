// scroll the SaaS about section: headline, integrations, stats
export default async (film) => {
  await film.glide({ x: film.W * 0.55, y: film.H * 0.55 }, { secs: 0.6 });
  await film.scroll(260, { secs: 1.5, hold: 400 });
  await film.scroll(240, { secs: 1.3, hold: 400 });
  film.mark("hero");
  await film.scroll(-130, { secs: 1.0, hold: 500 });
};
