// icon-nav header: tooltip on Dashboard, then switch language to Fr
export default async (film) => {
  await film.hover({ role: "link", name: /dashboard/i }, { hold: 1500 });
  await film.click("[role=combobox]", { hold: 900 });
  await film.hover({ role: "option", name: /es/i }, { hold: 500 });
  await film.mark("hero");
  await film.click({ role: "option", name: /fr/i }, { hold: 1400 });
};
