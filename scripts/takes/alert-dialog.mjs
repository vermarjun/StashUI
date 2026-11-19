// open the delete-account alert and cancel it
export default async (film) => {
  await film.hover({ role: "button", name: /Delete account/ }, { hold: 1500 });
  await film.click({ role: "button", name: /Delete account/ }, { hold: 1300 });
  await film.hover({ text: "Cancel" }, { hold: 700 });
  await film.mark("hero");
  await film.click({ role: "button", name: /^Cancel$/ }, { hold: 900 });
};
