// Liquid chrome ripples under the pointer: wander over the metal.
export default async (film) => {
  await film.drift({ secs: 3.2 });
  film.mark("hero");
  await film.drift({ secs: 1.8 });
};
