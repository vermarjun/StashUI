// Family button: the plus morphs into an account panel with real actions, hover one, then collapse via the X
export default async (film) => {
  await film.click("[data-rec-root] svg.lucide-plus", { hold: 1500 });
  film.mark("hero");
  await film.hover({ text: "Billing" }, { hold: 900 });
  await film.click("[data-rec-root] svg.lucide-x", { hold: 1000 });
};
