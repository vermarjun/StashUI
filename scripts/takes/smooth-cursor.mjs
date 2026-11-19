// Smooth cursor: trace quick arcs so the springy custom arrow tilts and lags.
export default async (film) => {
  film.mark("kenburns");
  const pts = [
    [0.22, 0.3],
    [0.75, 0.28],
    [0.78, 0.62],
    [0.3, 0.68],
    [0.5, 0.45],
    [0.72, 0.34],
    [0.28, 0.4],
    [0.5, 0.55],
    [0.7, 0.5],
    [0.32, 0.5],
  ];
  film.mark("hero");
  for (const [px, py] of pts) {
    await film.glide({ x: film.W * px, y: film.H * py }, { secs: 0.22 });
    await film.hold(180);
  }
};
