// accordion image tabs: typography -> design -> motion
export default async (film) => {
  await film.click({ text: "Typography", exact: true }, { hold: 1400 });
  await film.click({ text: "Design Systems", exact: true }, { hold: 1400 });
  film.mark("hero");
  await film.click({ text: "Motion & Animation", exact: true }, { hold: 1200 });
};
