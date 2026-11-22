// pagination-animated — the active outline slides from page to page
export default async (film) => {
  await film.click({ role: "link", name: "4" }, { hold: 800 });
  film.mark("hero");
  await film.click({ role: "link", name: "1" }, { hold: 800 });
  await film.click({ role: "link", name: /next page/i }, { hold: 900 });
};
