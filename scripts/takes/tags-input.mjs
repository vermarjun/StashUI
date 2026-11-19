// Editable tags: add two skills with Enter, then remove one with its ×
export default async (film) => {
  await film.type('input[placeholder="Add a tag..."]', "Motion", { hold: 300 });
  await film.press("Enter", { hold: 800 });
  await film.type('input[placeholder="Add a tag..."]', "Accessibility", { hold: 300 });
  await film.press("Enter", { hold: 900 });
  film.mark("hero");
  await film.click(
    film.page.locator("[data-rec-root] button").filter({ hasText: "×" }).last(),
    { hold: 1000 },
  );
};
