// framer-draggable-carousel — drag the photo track left twice, then back once
export default async (film) => {
  const y = film.H * 0.4;
  const drag = async (fromX, toX) => {
    await film.glide({ x: fromX, y }, { secs: 0.6 });
    await film.page.mouse.down();
    await film.glide({ x: toX, y }, { secs: 1.1 });
    await film.hold(250);
    await film.page.mouse.up();
    await film.hold(900);
  };
  await drag(film.W * 0.62, film.W * 0.2);
  film.mark("hero");
  await drag(film.W * 0.62, film.W * 0.2);
  await drag(film.W * 0.3, film.W * 0.62);
};
