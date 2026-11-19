// Hover the round add button, then press it.
export default async (film) => {
  const btn = { role: "button", name: /add new item/i };
  await film.hover(btn, { hold: 1200 });
  await film.mark("hero");
  await film.click(btn, { hold: 800 });
};
