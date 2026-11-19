// Show the tooltip, bookmark it, then un-bookmark so the loop returns to rest.
export default async (film) => {
  const btn = { role: "button", name: /bookmark/i };
  await film.hover(btn, { hold: 1100 });
  await film.click(btn, { hold: 900 });
  await film.mark("hero");
  await film.hold(700);
  await film.hover(btn, { hold: 800 });
  await film.click(btn, { hold: 700 });
};
