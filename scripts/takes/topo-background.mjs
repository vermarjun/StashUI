// Topo background: the contour map rises under the cursor and ripples on click
export default async (film) => {
  await film.glide({ x: film.W * 0.3, y: film.H * 0.35 }, { secs: 0.6 });
  await film.drift({ secs: 2.6, cx: film.W * 0.45, cy: film.H * 0.45, rx: 220, ry: 120 });
  await film.click({ x: film.W * 0.68, y: film.H * 0.62 }, { hold: 400 });
  film.mark("hero");
  await film.hold(1300);
};
