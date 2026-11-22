// Empty states: resolve the no-results search via a suggestion, then load sample data into the empty chart
export default async (film) => {
  await film.click({ role: "button", name: /^invoices$/ }, { hold: 1200 });
  await film.click("[data-variant=chart]", { hold: 800 });
  await film.click({ role: "button", name: /Load sample data/ }, { hold: 1300 });
  film.mark("hero");
};
