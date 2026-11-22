// shadcn pie charts: hover the donut for its tooltip, then pick a month in the interactive pie so the active sector pops out
export default async (film) => {
  const charts = film.page.locator("[data-rec-root] [data-slot=chart]");
  await film.hover(charts.nth(0), { hold: 1000 });
  await film.click({ role: "combobox" }, { hold: 700 });
  await film.click({ role: "option", name: /april/i }, { hold: 400 });
  film.mark("hero");
  await film.hold(1200);
};
