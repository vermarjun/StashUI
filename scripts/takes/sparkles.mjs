// sparkles — drift through the field (hover links nearby particles), then click to burst more in
export default async (film) => {
  await film.hold(1000);
  await film.drift({ secs: 3, cx: film.W * 0.5, cy: film.H * 0.5, rx: 300, ry: 160 });
  await film.click({ x: film.W * 0.3, y: film.H * 0.3 }, { hold: 700 });
  film.mark("hero");
  await film.click({ x: film.W * 0.72, y: film.H * 0.7 }, { hold: 900 });
};
