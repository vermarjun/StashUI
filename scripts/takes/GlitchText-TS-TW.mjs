// continuous glitch on the first, hover-activated glitch on the second
export default async (film) => {
  await film.hover({ text: "HOVER ME" }, { hold: 1700 });
  film.mark("hero");
  await film.hover({ text: "GLITCH" }, { hold: 1400 });
};
