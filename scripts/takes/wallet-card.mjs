// Wallet card: pick the back card so it lifts to the front (sheen follows the pointer), then hide the balance
export default async (film) => {
  const cards = film.page.locator('[data-rec-root] [role="option"]');
  await film.click(cards.nth(2), { hold: 1000 });
  film.mark("hero");
  await film.hover(cards.nth(2), { hold: 600 });
  await film.click({ role: "button", name: /hide balance/i }, { hold: 1100 });
  await film.click({ role: "button", name: /show balance/i }, { hold: 700 });
};
