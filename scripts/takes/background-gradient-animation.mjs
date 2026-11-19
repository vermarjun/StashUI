// Colour blobs orbit, and a pointer blob drags through them: slow drift.
export default async (film) => {
  await film.drift({ secs: 3.4 });
  film.mark("hero");
  await film.drift({ secs: 1.8 });
};
