// Continuous pagination: the glossy active tile springs between pages
export default async (film) => {
  await film.click({ role: "button", name: "4" }, { hold: 900 });
  film.mark("hero");
  await film.click({ role: "button", name: "5" }, { hold: 800 });
  await film.click({ role: "button", name: "2" }, { hold: 900 });
};
