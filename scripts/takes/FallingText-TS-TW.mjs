// Read the sentence, click to drop the words under gravity, then grab one and toss it.
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.45 }, { secs: 0.7 });
  await film.hold(500);
  await film.click(null, { hold: 1400 });
  film.mark("hero");
  await film.glide({ x: film.W * 0.45, y: film.H * 0.8 }, { secs: 0.6 });
  await film.page.mouse.down();
  await film.glide({ x: film.W * 0.62, y: film.H * 0.35 }, { secs: 0.6 });
  await film.page.mouse.up();
  await film.hold(1200);
};
