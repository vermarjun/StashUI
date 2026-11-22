// TextRollNavigation: hover the links so letters roll up from the centre out
export default async (film) => {
  const item = (n) => `[data-rec-root] li:nth-child(${n})`;
  await film.hover(item(2), { hold: 900 });
  film.mark("hero");
  await film.hover(item(3), { hold: 900 });
  await film.hover(item(5), { hold: 900 });
};
