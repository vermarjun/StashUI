// Vanishing input: ask a real question, Enter dissolves the text into drifting pixels. Twice.
export default async (film) => {
  await film.type("input", "How do I install StashUI in a Vite app?", { delay: 40, hold: 350 });
  await film.press("Enter", { hold: 150 });
  film.mark("hero");
  await film.hold(1400);
  await film.type(null, "Show me animated pricing tables", { delay: 40, hold: 300 });
  await film.press("Enter", { hold: 1500 });
};
