// Spline robot follows the pointer: wait for the scene, then move across it so it turns its head.
export default async (film) => {
  await film.page.waitForTimeout(1500);
  await film.glide({ x: film.W * 0.3, y: film.H * 0.35 }, { secs: 0.8 });
  await film.glide({ x: film.W * 0.85, y: film.H * 0.3 }, { secs: 1.4 });
  film.mark("hero");
  await film.glide({ x: film.W * 0.6, y: film.H * 0.8 }, { secs: 1.2 });
  await film.glide({ x: film.W * 0.2, y: film.H * 0.6 }, { secs: 1.3 });
  await film.hold(400);
};
