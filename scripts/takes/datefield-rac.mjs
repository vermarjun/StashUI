// Date field: focus a segment and step it with the arrow keys, then the time.
export default async (film) => {
  const segments = film.page.getByRole("spinbutton");
  await film.click(segments.nth(0), { hold: 500 });
  await film.press("ArrowUp", { hold: 300 });
  await film.press("ArrowUp", { hold: 700 });
  film.mark("hero");
  await film.click(segments.nth(2), { hold: 500 });
  await film.press("ArrowDown", { hold: 800 });
  await film.click(segments.nth(4), { hold: 500 });
  await film.press("ArrowUp", { hold: 700 });
};
