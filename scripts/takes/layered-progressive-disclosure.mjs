// Layered disclosure: reveal the transition layer, the asymmetric tabs, then switch tab
export default async (film) => {
  await film.click({ text: "Visual Change" }, { hold: 900 });
  await film.click("[data-rec-root] button.h-7.w-12", { hold: 1100 });
  await film.click({ role: "button", name: "Removal" }, { hold: 1000 });
  film.mark("hero");
};
