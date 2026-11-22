// AI blob warp: ambient shader avatars, nothing to interact with
export default async (film) => {
  film.hideCursor();
  await film.hold(2500);
  film.mark("hero");
  await film.hold(2500);
};
