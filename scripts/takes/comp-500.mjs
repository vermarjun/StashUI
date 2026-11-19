// month + Current month button: navigates away, then jumps back
export default async (film) => {
  const next = film.page.locator("[data-rec-root] .rdp-button_next");
  await film.click(next, { hold: 900 });
  await film.click(next, { hold: 900 });
  await film.click({ role: "button", name: /current month/i }, { hold: 1500 });
  film.mark("hero");
};
