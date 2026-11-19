// comp-342 — open one settings row at a time (icon + sub-header + chevron accordion).
export default async (film) => {
  await film.click({ role: "button", name: /Connected accounts/ }, { hold: 1300 });
  film.mark("hero");
  await film.click({ role: "button", name: /Notifications/ }, { hold: 1300 });
  await film.click({ role: "button", name: /2-step verification/ }, { hold: 1100 });
};
