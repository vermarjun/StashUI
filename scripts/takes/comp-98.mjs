// Enlarged icon toggle: click to morph open, pause on the hero state, click to morph back
export default async (film) => {
  const btn = { role: "button", name: /open menu|close menu/i };
  await film.hover(btn, { hold: 600 });
  await film.click(btn, { hold: 1300 });
  film.mark("hero");
  await film.click(btn, { hold: 1300 });
};
