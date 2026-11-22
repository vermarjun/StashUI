// box-carousel — advance twice so the 3D box rolls to the next faces
export default async (film) => {
  await film.click({ role: "button", name: "Next" }, { hold: 1400 });
  film.mark("hero");
  await film.click({ role: "button", name: "Next" }, { hold: 1400 });
  await film.click({ role: "button", name: "Prev" }, { hold: 1200 });
};
