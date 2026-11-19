// appointment picker: picks a day then a time slot
export default async (film) => {
  await film.click(film.page.locator("[data-rec-root] td[data-day]:not([data-disabled]) button").nth(12), { hold: 1100 });
  await film.click({ role: "button", name: /^10:30$/ }, { hold: 1500 });
  film.mark("hero");
};
