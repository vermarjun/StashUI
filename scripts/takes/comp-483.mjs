// sort by balance, then raise rows per page so the table grows
export default async (film) => {
  await film.click({ text: "Balance" }, { hold: 1500 });
  film.mark("hero");
  await film.hold(400);
  await film.click("[data-rec-root] [role=combobox]", { hold: 1100 });
  await film.click({ role: "option", name: /^25$/ }, { hold: 1600 });
};
