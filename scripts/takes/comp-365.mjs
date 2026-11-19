// comp-365 — hover the article thumbnail so the hover card with the article preview opens
export default async (film) => {
  await film.hover("[data-rec-root] img[alt=Content]", { hold: 1800 });
  film.mark("hero");
  await film.hold(700);
  await film.glide({ x: film.W * 0.5, y: film.H * 0.15 }, { secs: 0.7 });
  await film.hold(500);
};
