// open the alert dialog, acknowledge it
export default async (film) => {
  await film.hover({ role: "button", name: /Alert dialog/ }, { hold: 1500 });
  await film.click({ role: "button", name: /Alert dialog/ }, { hold: 1300 });
  await film.mark("hero");
  await film.click({ role: "button", name: /Okay/ }, { hold: 900 });
};
