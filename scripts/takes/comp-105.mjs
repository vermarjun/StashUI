// Hover for the tooltip, click to copy and hold on the green check.
export default async (film) => {
  const btn = { role: "button", name: /copy/i };
  await film.hover(btn, { hold: 900 });
  await film.click(btn, { hold: 700 });
  await film.mark("hero");
  await film.hold(1500);
};
