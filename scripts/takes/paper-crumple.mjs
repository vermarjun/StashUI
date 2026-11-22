// Hold the photo to crumple it into a 3D sheet, drag it around, release so it flattens back.
export default async (film) => {
  const cx = film.W * 0.5;
  const cy = film.H * 0.5;
  await film.glide({ x: cx, y: cy });
  await film.page.mouse.down();
  await film.hold(1200);
  await film.glide({ x: cx + 120, y: cy - 40 }, { secs: 0.9 });
  film.mark("hero");
  await film.glide({ x: cx - 60, y: cy + 30 }, { secs: 0.9 });
  await film.page.mouse.up();
  await film.hold(1500);
};
