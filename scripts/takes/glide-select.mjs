// GlideSelect: open the menu, let the highlight glide across options, pick one
export default async (film) => {
  await film.click("[data-rec-root] [role=combobox]", { hold: 700 });
  await film.hover({ text: "Newest first" }, { hold: 400 });
  await film.hover({ text: "Most discussed" }, { hold: 500 });
  film.mark("hero");
  await film.click({ text: "Priority" }, { hold: 1200 });
};
