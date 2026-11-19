// comp-433 — tabs with icons and badges: switch to Projects, then Packages
export default async (film) => {
  await film.click({ role: "tab", name: /projects/i }, { hold: 1300 });
  film.mark("hero");
  await film.click({ role: "tab", name: /packages/i }, { hold: 1300 });
  await film.click({ role: "tab", name: /overview/i }, { hold: 800 });
};
