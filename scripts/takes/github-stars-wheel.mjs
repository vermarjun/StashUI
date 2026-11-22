// GitHub stars wheel: ambient, the wheels spin up to their star counts on mount
export default async (film) => {
  film.hideCursor();
  await film.hold(3200);
  film.mark("hero");
  await film.hold(1200);
};
