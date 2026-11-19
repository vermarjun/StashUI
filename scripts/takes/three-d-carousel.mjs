// drag the photo cylinder left and right so it spins through its faces
export default async (film) => {
  await film.glide({ x: film.W * 0.52, y: film.H * 0.5 }, { secs: 0.6 });
  await film.page.mouse.down();
  await film.glide({ x: film.W * 0.52 + 190, y: film.H * 0.5 }, { secs: 0.9 });
  await film.page.mouse.up();
  await film.hold(900);
  film.mark("hero");
  await film.glide({ x: film.W * 0.52 + 190, y: film.H * 0.5 });
  await film.page.mouse.down();
  await film.glide({ x: film.W * 0.52 - 120, y: film.H * 0.5 }, { secs: 1.1 });
  await film.page.mouse.up();
  await film.hold(1200);
};
