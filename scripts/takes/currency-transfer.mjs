// currency-transfer — the steps tick to completed, then copy the reference
export default async (film) => {
  await film.hold(1800);
  film.mark("hero");
  await film.click(film.page.locator('[aria-label^="Copy reference"]'), { hold: 1500 });
};
