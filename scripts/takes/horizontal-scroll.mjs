// scroll past the intro into the pinned gallery so the colour panels slide
// sideways across the frame (stays inside the pinned stretch the whole time)
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.55 });
  await film.hold(400);
  await film.scroll(620, { secs: 1.4 });
  await film.hold(300);
  await film.scroll(900, { secs: 2.2 });
  film.mark("hero");
  await film.scroll(900, { secs: 2.2 });
  await film.hold(500);
};
