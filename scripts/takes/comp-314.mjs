// open the alert dialog with icon, acknowledge it
export default async (film) => {
  await film.hover({ role: "button", name: /Alert dialog with icon/ }, { hold: 1500 });
  await film.click({ role: "button", name: /Alert dialog with icon/ }, { hold: 1300 });
  await film.mark("hero");
  await film.click({ role: "button", name: /Confirm/ }, { hold: 900 });
};
