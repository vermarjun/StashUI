// Figma cursors: ambient multiplayer cursors wander on their own
export default async (film) => {
  film.hideCursor();
  await film.hold(1500);
  film.mark("hero");
  await film.hold(3500);
};
