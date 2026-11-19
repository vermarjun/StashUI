// bending-gallery — drag the curved photo strip; cards bend along the arc and snap
export default async (film) => {
  const page = film.page;
  await film.hold(1200); // let the photos stream in
  const y = film.H * 0.5;
  const drag = async (x0, x1, steps) => {
    await film.glide({ x: x0, y }, { secs: 0.6 });
    await page.mouse.down();
    for (let i = 1; i <= steps; i++) { await page.mouse.move(x0 + ((x1 - x0) * i) / steps, y); await film.hold(16); }
    await page.mouse.up();
  };
  await drag(film.W * 0.72, film.W * 0.3, 40);
  await film.hold(900);
  film.mark("hero");
  await drag(film.W * 0.35, film.W * 0.62, 30);
  await film.hold(1000);
};
