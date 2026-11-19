// hover-decrypt on line 1, then click-toggle the click instance (its text is
// scrambled, so target the only cursor-pointer line by class)
export default async (film) => {
  const clickLine = film.page.locator("[data-rec-root] .cursor-pointer").first();
  await film.hover({ text: "Hover over me to decrypt!" }, { hold: 1700 });
  await film.click(clickLine, { hold: 1600 });
  film.mark("hero");
  await film.click(clickLine, { hold: 900 });
};
