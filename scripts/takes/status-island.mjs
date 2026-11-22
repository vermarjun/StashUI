// status-island — start two background tasks, then hover the island to open the in-flight list
export default async (film) => {
  await film.click({ role: "button", name: "Upload photos" }, { hold: 500 });
  await film.click({ role: "button", name: "Export report" }, { hold: 900 });
  await film.hover(film.page.getByRole("button", { name: /tasks?, show all$/ }), { hold: 1600 });
  film.mark("hero");
};
