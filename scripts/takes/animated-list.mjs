// animated-list — the notification stack cycling in on its own
export default async (film) => {
  await film.hideCursor();
  await film.hold(2600);
  film.mark("hero");
  await film.hold(2800);
};
