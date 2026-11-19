// Each block blurs/slides in as it scrolls into view: scroll through the first three.
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.55 }, { secs: 0.6 });
  await film.scroll(450, { secs: 1.3, hold: 1100 });
  await film.scroll(560, { secs: 1.3, hold: 300 });
  film.mark("hero");
  await film.hold(900);
  await film.scroll(600, { secs: 1.3, hold: 1200 });
};
