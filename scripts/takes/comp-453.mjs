// breadcrumb with a database select: open it, pick another database
export default async (film) => {
  await film.hover({ role: "link", name: /databases/i }, { hold: 700 });
  await film.click({ role: "combobox", name: /select database/i }, { hold: 900 });
  await film.hover({ role: "option", name: /orion/i }, { hold: 600 });
  await film.mark("hero");
  await film.click({ role: "option", name: /dorado/i }, { hold: 1400 });
};
