// 3d-globe — drag the earth around so the avatar pins on other continents swing into view
export default async (film) => {
  const page = film.page;
  await film.hold(1000); // textures stream in
  const cx = film.W * 0.5, cy = film.H * 0.5;
  await film.glide({ x: cx + 120, y: cy }, { secs: 0.7 });
  await page.mouse.down();
  for (let i = 1; i <= 45; i++) { await page.mouse.move(cx + 120 - i * 6, cy + Math.sin(i / 9) * 12); await film.hold(18); }
  await page.mouse.up();
  film.mark("hero");
  await film.hold(1200);
  await film.glide({ x: cx + 260, y: cy - 160 }, { secs: 0.8 });
  await film.hold(1200);
};
