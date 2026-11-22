// Background lights: ambient conic glow fades in behind the hero
export default async (film) => {
  film.hideCursor();
  await film.hold(2200);
  film.mark("hero");
  await film.hold(2400);
};
