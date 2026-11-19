// buyme-acoffee — the card's artwork shrinks away on hover; no click (it links out).
export default async (film) => {
  film.mark("kenburns");
  await film.hover(film.root(), { hold: 900 });
  await film.glide({ x: film.W * 0.2, y: film.H * 0.2 }, { secs: 0.7 });
  film.mark("hero");
  await film.hover(film.root(), { hold: 1000 });
};
