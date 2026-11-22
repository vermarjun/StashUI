// Fuse Button: click to archive, the undo fuse burns down and commits
export default async (film) => {
  await film.click({ role: "button", name: /archive 12 emails/i }, { hold: 500 });
  await film.glide({ x: film.W * 0.5, y: film.H * 0.8 }, { secs: 0.7 });
  film.mark("hero");
  await film.hold(3400);
};
