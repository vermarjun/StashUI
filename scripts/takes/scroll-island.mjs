// scroll-island — scroll the article so the island's ring and % climb, then click it open to show the sections
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.6 }, { secs: 0.6 });
  await film.scroll(500, { secs: 1.6, hold: 300 });
  await film.scroll(500, { secs: 1.6, hold: 300 });
  await film.click({ text: "Rewriting sync" }, { hold: 1500 });
  film.mark("hero");
  await film.click(null, { hold: 900 });
};
