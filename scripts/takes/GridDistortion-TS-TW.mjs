// Grid distortion: sweep the cursor across the photo so the grid cells smear, then let it relax back
export default async (film) => {
  await film.glide({ x: film.W * 0.25, y: film.H * 0.4 }, { secs: 0.7 });
  await film.glide({ x: film.W * 0.75, y: film.H * 0.6 }, { secs: 1.1 });
  film.mark("hero");
  await film.drift({ secs: 2.6, rx: film.W * 0.28, ry: film.H * 0.2 });
  film.hideCursor();
  await film.hold(1600);
};
