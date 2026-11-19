// open the drawer, then the nested drawer stacks on top while the first one scales back; close both
export default async (film) => {
  await film.click({ role: "button", name: /open drawer/i }, { hold: 1200 });
  await film.click({ role: "button", name: /open second drawer/i }, { hold: 1400 });
  film.mark("hero");
  await film.press("Escape", { hold: 900 });
  await film.press("Escape", { hold: 800 });
};
