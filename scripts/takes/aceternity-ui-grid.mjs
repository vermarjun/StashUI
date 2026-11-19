// A static grid backdrop: nudge the page so the grid shifts in frame.
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.5 });
  await film.scroll(70, { secs: 1.2, hold: 400 });
  film.mark("hero");
  await film.scroll(-70, { secs: 1.4, hold: 700 });
};
