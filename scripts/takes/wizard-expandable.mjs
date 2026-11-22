// Expandable wizard: open the Account step, then step forward with Next
export default async (film) => {
  await film.click({ role: "tab", name: /account/i }, { hold: 1300 });
  film.mark("hero");
  await film.click({ role: "button", name: /^next$/i }, { hold: 1300 });
  await film.click({ role: "button", name: /^next$/i }, { hold: 1200 });
};
