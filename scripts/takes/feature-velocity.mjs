// feature velocity: hovers the cards so their colour gradient sweeps in
export default async (film) => {
  await film.hover({ text: "Neural Link" }, { hold: 1300 });
  film.mark("hero");
  await film.hover({ text: "Data Core" }, { hold: 1300 });
};
