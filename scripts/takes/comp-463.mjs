// pagination with rows-per-page select: open it and choose 50
export default async (film) => {
  await film.hover({ role: "link", name: /go to next page/i }, { hold: 600 });
  await film.click("[role=combobox]", { hold: 900 });
  await film.hover({ role: "option", name: "10" }, { hold: 500 });
  await film.mark("hero");
  await film.click({ role: "option", name: "50" }, { hold: 1400 });
};
