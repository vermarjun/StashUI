// Contextual AI bar: tap the sparkle so the tools morph into a prompt, type, then morph back
export default async (film) => {
  const buttons = film.page.locator("[data-rec-root] button");
  await film.click(buttons.nth(1), { hold: 700 });
  await film.type(null, "Make the chorus punchier");
  film.mark("hero");
  await film.hold(700);
  await film.click(buttons.nth(0), { hold: 1000 });
};
