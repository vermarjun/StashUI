// progressive-blur — scroll a photo grid so images melt into the blurred bottom edge
export default async (film) => {
  await film.glide("[data-scroll]", { secs: 0.7 });
  await film.scroll(420, { secs: 1.8 });
  film.mark("hero");
  await film.hold(700);
  await film.scroll(380, { secs: 1.6 });
  await film.hold(500);
  await film.scroll(-800, { secs: 1.6 });
};
