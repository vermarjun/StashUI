// Cover: hover the wrapped words so the beams speed up and the warp-speed shake plays
export default async (film) => {
  await film.hover({ text: "warp speed" }, { hold: 1000 });
  film.mark("hero");
  await film.hold(1600);
};
