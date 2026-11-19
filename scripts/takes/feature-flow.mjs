// feature-flow — press Next twice to slide the feature cards along
export default async (film) => {
  await film.click({ role: "button", name: "Next" }, { hold: 1300 });
  film.mark("hero");
  await film.click({ role: "button", name: "Next" }, { hold: 1400 });
};
