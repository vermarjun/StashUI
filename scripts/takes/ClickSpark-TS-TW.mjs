// ClickSpark: a run of clicks across the area, each followed by a short beat so every spark burst is on screen
export default async (film) => {
  const pts = [
    [0.36, 0.40], [0.52, 0.30], [0.66, 0.46], [0.45, 0.62], [0.6, 0.66],
  ];
  for (let i = 0; i < pts.length; i++) {
    const [fx, fy] = pts[i];
    await film.glide({ x: film.W * fx, y: film.H * fy }, { secs: 0.45 });
    await film.click(null, { hold: 120 });
    if (i === 2) film.mark("hero");
    await film.hold(380);
  }
};
