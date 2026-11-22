// Cubes grid: wander the cursor across the field so ripples spread through the cubes
export default async (film) => {
  await film.glide({ x: film.W * 0.45, y: film.H * 0.7 }, { secs: 0.7 });
  await film.drift({ secs: 2.2, cx: film.W * 0.5, cy: film.H * 0.68, rx: 260, ry: 90 });
  film.mark("hero");
  await film.drift({ secs: 2.2, cx: film.W * 0.5, cy: film.H * 0.68, rx: 260, ry: 90 });
};
