// Push through the pleated curtain left to right and let it sway back.
export default async (film) => {
  const y = film.H * 0.5;
  await film.glide({ x: film.W * 0.18, y }, { secs: 0.6 });
  await film.page.mouse.down();
  await film.glide({ x: film.W * 0.55, y: y + 40 }, { secs: 0.9 });
  film.mark("hero");
  await film.glide({ x: film.W * 0.82, y: y - 30 }, { secs: 0.7 });
  await film.page.mouse.up();
  await film.drift({ secs: 2, cx: film.W * 0.5, cy: y, rx: 220, ry: 60 });
};
