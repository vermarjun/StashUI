// A line field pushed by the pointer: drift slowly through the waves.
export default async (film) => {
  await film.drift({ secs: 3.2 });
  film.mark("hero");
  await film.drift({ secs: 1.8 });
};
