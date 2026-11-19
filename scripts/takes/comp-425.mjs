// Hover the remove control on the tag, then click it to clear the tag.
export default async (film) => {
  const del = { role: "button", name: /delete/i };
  await film.hover(del, { hold: 1400 });
  await film.mark("hero");
  await film.click(del, { hold: 900 });
};
