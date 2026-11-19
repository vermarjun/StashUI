// Today button: navigates to the previous month then jumps back to today
export default async (film) => {
  await film.click(film.page.locator("[data-rec-root] .rdp-button_previous"), { hold: 900 });
  await film.click(film.page.locator("[data-rec-root] .rdp-button_previous"), { hold: 900 });
  await film.click({ role: "button", name: /^Today$/ }, { hold: 1500 });
  film.mark("hero");
};
