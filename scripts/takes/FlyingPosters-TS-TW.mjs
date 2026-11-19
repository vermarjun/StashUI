// Wheel over the canvas: poster planes bend and fly past one after another.
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.5 }, { secs: 0.5 });
  await film.scroll(360, { secs: 1.2, hold: 300 });
  await film.scroll(360, { secs: 1.2, hold: 200 });
  film.mark("hero");
  await film.scroll(360, { secs: 1.2, hold: 900 });
  await film.scroll(-200, { secs: 0.8, hold: 600 });
};
