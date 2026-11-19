// start the tour and advance through two steps
export default async (film) => {
  await film.click({ role: "button", name: "Start tour" }, { hold: 1500 });
  film.mark("hero");
  await film.click({ role: "button", name: "Next" }, { hold: 1300 });
  await film.click({ role: "button", name: "Next" }, { hold: 1300 });
};
