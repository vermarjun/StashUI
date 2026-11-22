// flow-field — streamlines part around the cursor and scatter on click
export default async (film) => {
  await film.hold(600);
  await film.drift({ secs: 3, cx: film.W * 0.5, cy: film.H * 0.5, rx: 300, ry: 160 });
  film.mark("hero");
  await film.click({ x: film.W * 0.5, y: film.H * 0.5 }, { hold: 1400 });
};
