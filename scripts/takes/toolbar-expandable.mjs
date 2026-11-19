// expand the toolbar on different steps so the panels slide open
export default async (film) => {
  await film.hover({ role: "button", name: /Profile/ }, { hold: 1600 });
  await film.click({ role: "button", name: /Profile/ }, { hold: 1500 });
  await film.mark("hero");
  await film.click({ role: "button", name: /Dashboard/ }, { hold: 1500 });
  await film.click({ role: "button", name: /Dashboard/ }, { hold: 900 });
};
