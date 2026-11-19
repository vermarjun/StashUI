// icon-menu header: open the info menu, close it, then open notifications
export default async (film) => {
  await film.click({ role: "button", name: /open edit menu/i }, { hold: 1400 });
  await film.mark("hero");
  await film.press("Escape", { hold: 600 });
  await film.click({ role: "button", name: /open notifications/i }, { hold: 1700 });
};
