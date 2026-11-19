// the visitors counter rolls on its own; step the small counter up through a carry (9 -> 10) and back
export default async (film) => {
  const plus = { role: "button", name: "Increase" };
  await film.click(plus, { hold: 500 });
  await film.click(null, { hold: 500 });
  film.mark("hero");
  await film.click(null, { hold: 900 });
  await film.click({ role: "button", name: "Decrease" }, { hold: 1200 });
};
