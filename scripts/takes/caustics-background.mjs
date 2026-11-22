// caustics-background — light ripples over the pool floor; the cursor stirs it and clicks drop rings
export default async (film) => {
  await film.hold(600);
  await film.drift({ secs: 2.4, cx: film.W * 0.5, cy: film.H * 0.55, rx: 260, ry: 120 });
  await film.click({ x: film.W * 0.32, y: film.H * 0.7 }, { hold: 700 });
  film.mark("hero");
  await film.click({ x: film.W * 0.68, y: film.H * 0.35 }, { hold: 1200 });
};
