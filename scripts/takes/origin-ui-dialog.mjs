// open the dialog, confirm the action
export default async (film) => {
  await film.hover({ role: "button", name: /Open Dialog/ }, { hold: 1500 });
  await film.click({ role: "button", name: /Open Dialog/ }, { hold: 1300 });
  await film.mark("hero");
  await film.click({ role: "button", name: /^Confirm$/ }, { hold: 900 });
};
