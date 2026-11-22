// circling-elements — let the ring orbit, then hover a photo to pause it and pop it forward
export default async (film) => {
  await film.hold(1800);
  film.mark("hero");
  await film.hover("[data-rec-root] img >> nth=0", { hold: 1600 });
  await film.glide({ x: film.W * 0.9, y: film.H * 0.85 }, { secs: 0.7 });
  await film.hold(1000);
};
