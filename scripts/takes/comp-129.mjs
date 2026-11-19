// Show the bell with its unread badge, then click to clear it.
export default async (film) => {
  const btn = { role: "button", name: /notifications/i };
  await film.hover(btn, { hold: 1300 });
  await film.mark("hero");
  await film.click(btn, { hold: 900 });
};
