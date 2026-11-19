// Hover the button so the underline draws in, then let it retract.
export default async (film) => {
  const b = { role: "button", name: /contact me/i };
  await film.glide({ x: film.W * 0.3, y: film.H * 0.5 }, { secs: 0.6 });
  await film.hover(b, { hold: 1600 });
  await film.mark("hero");
  await film.hold(500);
  await film.glide({ x: film.W * 0.64, y: film.H * 0.62 }, { secs: 0.8 });
};
