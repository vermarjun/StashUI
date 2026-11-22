// Mini calendar: pick a day, pick another, page forward a week
export default async (film) => {
  const days = film.page.locator("[data-rec-root] [data-day]");
  await film.click(days.nth(4), { hold: 1100 });
  film.mark("hero");
  await film.click(days.nth(6), { hold: 1100 });
  await film.click("[data-rec-root] button:has(svg.lucide-chevron-right)", { hold: 1200 });
};
