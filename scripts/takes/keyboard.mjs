// keyboard — cursor sweeps the keys while a word is typed, caps press in
export default async (film) => {
  await film.glide({ x: film.W * 0.32, y: film.H * 0.62 });
  await film.hold(300);
  await film.glide({ x: film.W * 0.66, y: film.H * 0.62 }, { secs: 1.0 });
  await film.page.keyboard.type("design", { delay: 160 });
  await film.mark("hero");
  await film.hold(400);
  await film.page.keyboard.type("ship", { delay: 180 });
  await film.hold(700);
};
