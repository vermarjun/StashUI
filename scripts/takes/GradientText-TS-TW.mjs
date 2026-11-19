// animated gradient fill on both headings
export default async (film) => {
  await film.hover({ text: "Animated Gradient" }, { hold: 1800 });
  film.mark("hero");
  await film.hover({ text: "With border" }, { hold: 1600 });
};
