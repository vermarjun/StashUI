// Boxes light up in random colours under the pointer: sweep the grid, then
// leave so the last frame is back to normal for a clean loop.
export default async (film) => {
  await film.drift({ secs: 3.6, rx: film.W * 0.32, ry: film.H * 0.26 });
  film.mark("hero");
  await film.glide({ x: film.W - 40, y: 40 }, { secs: 0.8 });
  await film.hold(700);
};
