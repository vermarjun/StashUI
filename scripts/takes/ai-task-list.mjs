// AI task list: ambient, the plan ticks itself off step by step with drawn checkmarks
export default async (film) => {
  film.hideCursor();
  await film.hold(3200);
  film.mark("hero");
  await film.hold(2400);
};
