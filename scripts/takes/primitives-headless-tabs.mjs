// Toggle the switch rows so the thumb stretch and slide are visible.
export default async (film) => {
  const switches = film.page.locator("[data-rec-root] [role=switch]");
  await film.click(switches.nth(0), { hold: 900 });
  await film.click(switches.nth(1), { hold: 900 });
  film.mark("hero");
  await film.click(switches.nth(3), { hold: 1000 });
};
