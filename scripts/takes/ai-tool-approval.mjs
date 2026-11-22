// AI tool approval: allow two calls (output streams in), then press and hold the destructive one
export default async (film) => {
  await film.click({ role: "button", name: /^allow$/i }, { hold: 2200 });
  await film.click({ role: "button", name: /^allow$/i }, { hold: 1000 });
  await film.glide({ role: "button", name: /hold to confirm/i }, { secs: 0.6 });
  await film.page.mouse.down();
  await film.hold(600);
  film.mark("hero");
  await film.hold(500);
  await film.page.mouse.up();
  await film.hold(1600);
};
