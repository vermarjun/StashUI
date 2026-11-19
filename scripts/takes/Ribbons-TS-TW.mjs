// Ribbons: hide the rig cursor and sweep big continuous loops across the whole frame so the four ribbons trail and twist
export default async (film) => {
  film.hideCursor();
  const pts = [
    [0.18, 0.3], [0.8, 0.25], [0.85, 0.72], [0.2, 0.75], [0.5, 0.35], [0.75, 0.6],
  ];
  for (let i = 0; i < pts.length; i++) {
    const [x, y] = pts[i];
    await film.glide({ x: film.W * x, y: film.H * y }, { secs: 0.85 });
    if (i === 3) film.mark("hero");
  }
  await film.drift({ secs: 1.6, rx: 260, ry: 160 });
};
