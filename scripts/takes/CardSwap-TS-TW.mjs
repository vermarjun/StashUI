// CardSwap: rest the cursor on the copy (off the stack, so hover-pause never triggers) and let the timer swap two cards.
export default async (film) => {
  await film.glide({ x: film.W * 0.22, y: film.H * 0.5 }, { secs: 0.8 });
  await film.hold(2800);
  film.mark("hero");
  await film.hold(2700);
};
