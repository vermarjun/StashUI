// Card-table swirl that bends toward the pointer: wander across it.
export default async (film) => {
  await film.drift({ secs: 3.2 });
  film.mark("hero");
  await film.drift({ secs: 1.8 });
};
