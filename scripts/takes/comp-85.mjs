// Hover the ghost button so its arrow slides left, then let it settle back.
export default async (film) => {
  const b = { role: "button", name: /button/i };
  await film.glide({ x: film.W * 0.56, y: film.H * 0.5 }, { secs: 0.6 });
  await film.hover(b, { hold: 1300 });
  await film.mark("hero");
  await film.glide({ x: film.W * 0.56, y: film.H * 0.68 }, { secs: 0.7 });
};
