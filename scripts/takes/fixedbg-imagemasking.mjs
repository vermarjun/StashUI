// fixedbg-imagemasking — scroll the page: the splash mask travels while the photo behind it stays pinned.
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.5 }, { secs: 0.5 });
  await film.scroll(420, { secs: 2.2 });
  film.mark("hero");
  await film.hold(600);
  await film.scroll(-260, { secs: 1.8 });
  await film.hold(500);
};
