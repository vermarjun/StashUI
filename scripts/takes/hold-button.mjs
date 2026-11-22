// Hold Button: press and hold until the liquid fill tops out and it confirms
export default async (film) => {
  await film.glide({ role: "button", name: /hold to delete/i }, { secs: 0.8 });
  await film.page.mouse.down();
  await film.hold(1500);
  film.mark("hero");
  await film.hold(800);
  await film.page.mouse.up();
  await film.hold(1600);
};
