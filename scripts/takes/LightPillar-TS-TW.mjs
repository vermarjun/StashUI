// Light pillar rotates toward the pointer: drift around to swing it.
export default async (film) => {
  await film.drift({ secs: 3.2 });
  film.mark("hero");
  await film.drift({ secs: 1.8 });
};
