// Motion number input: use the steppers so the digits roll up and down.
export default async (film) => {
  const buttons = film.page.locator("button");
  await film.click(buttons.nth(1), { hold: 500 });
  await film.click(buttons.nth(1), { hold: 500 });
  film.mark("hero");
  await film.click(buttons.nth(1), { hold: 700 });
  await film.click(buttons.nth(3), { hold: 500 });
  await film.click(buttons.nth(3), { hold: 800 });
  await film.click(buttons.nth(0), { hold: 700 });
};
