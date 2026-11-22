// ai-context-meter — open the context ring's breakdown, then compact the conversation
export default async (film) => {
  await film.click({ role: "button", name: /^Context .* full/ }, { hold: 1500 });
  film.mark("hero");
  const compact = film.page.getByRole("button", { name: "Compact now" });
  if (await compact.count()) {
    await film.click(compact, { hold: 1600 });
  } else {
    await film.hold(1600);
  }
};
