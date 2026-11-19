// breadcrumb header with two selects: switch account type, then project
export default async (film) => {
  await film.click({ role: "combobox", name: /select account type/i }, { hold: 900 });
  await film.hover({ role: "option", name: /team/i }, { hold: 500 });
  await film.click({ role: "option", name: /team/i }, { hold: 900 });
  await film.click({ role: "combobox", name: /select project/i }, { hold: 900 });
  await film.mark("hero");
  await film.click({ role: "option", name: /origin project/i }, { hold: 1400 });
};
