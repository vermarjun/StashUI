// vote-tally — upvotes two requests (counts climb), then takes one back
export default async (film) => {
  const buttons = film.page.getByRole("button").filter({ hasText: "▲" });
  await film.click(buttons.nth(2), { hold: 1100 });
  await film.click(buttons.nth(0), { hold: 1200 });
  await film.mark("hero");
  await film.click(buttons.nth(0), { hold: 1100 });
};
