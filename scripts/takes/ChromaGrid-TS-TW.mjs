// chroma grid: drift across the cards so the chroma spotlight and card hover follow
export default async (film) => {
  await film.drift({ secs: 4, rx: 300, ry: 150 });
  film.mark("hero");
};
