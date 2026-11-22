// Fluted glass: move across the photo so the flutes slide and bend
export default async (film) => {
  await film.drift({ secs: 4.5 });
  film.mark("hero");
  await film.glide({ x: film.W * 0.8, y: film.H * 0.3 }, { secs: 1 });
};
