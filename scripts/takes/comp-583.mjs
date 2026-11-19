// breadcrumb header: hover the trail, then switch the project select
export default async (film) => {
  await film.hover({ role: "link", name: /projects/i }, { hold: 700 });
  await film.click("[role=combobox]", { hold: 900 });
  await film.hover({ role: "option", name: /main project/i }, { hold: 500 });
  await film.mark("hero");
  await film.click({ role: "option", name: /origin project/i }, { hold: 1400 });
};
