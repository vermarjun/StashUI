// Elastic Mesh: grab the inflated word and stretch it like jelly
export default async (film) => {
  const cx = film.W * 0.5, cy = film.H * 0.48;
  await film.glide({ x: cx - 60, y: cy }, { secs: 0.8 });
  await film.page.mouse.down();
  await film.glide({ x: cx - 260, y: cy - 90 }, { secs: 0.9 });
  film.mark("hero");
  await film.page.mouse.up();
  await film.hold(900);
  await film.click({ x: cx + 120, y: cy }, { hold: 900 });
};
