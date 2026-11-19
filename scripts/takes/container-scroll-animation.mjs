// container-scroll-animation — scroll so the tilted tablet rotates flat and the dashboard inside comes into full view
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.6 }, { secs: 0.6 });
  await film.scroll(260, { secs: 1.6, hold: 400 });
  await film.scroll(260, { secs: 1.6, hold: 300 });
  film.mark("hero");
  await film.hold(900);
  await film.scroll(-300, { secs: 1.4, hold: 400 });
};
