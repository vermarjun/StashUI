// pagination with results-per-page select: open it and choose 50 / page
export default async (film) => {
  await film.hover({ role: "link", name: "4" }, { hold: 700 });
  await film.click("#results-per-page", { hold: 900 });
  await film.hover({ role: "option", name: /20 \/ page/i }, { hold: 500 });
  await film.mark("hero");
  await film.click({ role: "option", name: /50 \/ page/i }, { hold: 1400 });
};
