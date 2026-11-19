// page header: hover the history/comment/add-user actions, then the avatar stack
export default async (film) => {
  await film.hover({ role: "button", name: /history/i }, { hold: 900 });
  await film.hover({ role: "button", name: /add user/i }, { hold: 900 });
  await film.mark("hero");
  await film.click({ role: "button", name: /\+3/i }, { hold: 1400 });
};
