// flip card: hovers each card so it turns over to its back
export default async (film) => {
  await film.hover({ text: "Front Side" }, { hold: 1500 });
  film.mark("hero");
  await film.hover({ text: "X Flip" }, { hold: 1400 });
};
