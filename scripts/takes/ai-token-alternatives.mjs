// ai-token-alternatives — open an unsure word's alternatives and pick one; the reply rewrites from there
export default async (film) => {
  await film.hold(1200);
  const token = film.page.locator('[aria-label$="likely. Show alternatives"]').first();
  await film.click(token, { hold: 1200 });
  film.mark("hero");
  await film.click(film.page.locator('[role="option"]').nth(1), { hold: 2000 });
};
