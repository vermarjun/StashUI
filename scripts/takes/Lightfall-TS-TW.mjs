// Falling light streaks part around the pointer: wander across the rain.
export default async (film) => {
  await film.drift({ secs: 3.2 });
  film.mark("hero");
  await film.drift({ secs: 1.8 });
};
