// Scroll-driven: the paragraph is pinned while words light up one by one.
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.55 }, { secs: 0.6 });
  await film.scroll(220, { secs: 1.6 });
  await film.hold(300);
  await film.scroll(220, { secs: 1.6 });
  film.mark("hero");
  await film.hold(300);
  await film.scroll(200, { secs: 1.5 });
  await film.hold(600);
};
