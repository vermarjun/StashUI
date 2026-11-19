// comp-436 — folder-style tabs: switch to Projects, then Packages, then back
export default async (film) => {
  await film.click({ role: "tab", name: /projects/i }, { hold: 1100 });
  film.mark("hero");
  await film.click({ role: "tab", name: /packages/i }, { hold: 1100 });
  await film.click({ role: "tab", name: /overview/i }, { hold: 800 });
};
