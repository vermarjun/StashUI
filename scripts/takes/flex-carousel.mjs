// Flex Carousel: drag the row so images bend through the liquid-glass edges
export default async (film) => {
  const y = film.H * 0.45;
  await film.glide({ x: film.W * 0.68, y }, { secs: 0.7 });
  await film.page.mouse.down();
  await film.glide({ x: film.W * 0.3, y }, { secs: 1.1 });
  film.mark("hero");
  await film.page.mouse.up();
  await film.hold(1600);
};
