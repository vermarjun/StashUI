// Hover the back link to show its hover state, then press it.
export default async (film) => {
  const back = { role: "button", name: /go back/i };
  await film.hover(back, { hold: 1500 });
  await film.mark("hero");
  await film.hold(500);
  await film.click(back, { hold: 700 });
};
