// let the sale countdown tick, then press buy now
export default async (film) => {
  await film.hover({ role: "button", name: /Buy now/ }, { hold: 1600 });
  film.mark("hero");
  await film.click({ role: "button", name: /Buy now/ }, { hold: 1600 });
};
