// comp-415 — a static badge; slow camera push-in keeps the card alive.
export default async (film) => {
  film.mark("kenburns");
  await film.hover(film.root(), { hold: 1600 });
};
