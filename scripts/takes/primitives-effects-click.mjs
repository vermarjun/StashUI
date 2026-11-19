// Click effects: press ring, ripple, crosshair and burst in turn so each effect plays at the cursor
export default async (film) => {
  await film.click({ role: "button", name: /^ring$/i }, { hold: 850 });
  await film.click({ role: "button", name: /^ripple$/i }, { hold: 850 });
  await film.glide({ role: "button", name: /^crosshair$/i }, { secs: 0.6 });
  await film.page.mouse.down();
  await film.hold(120);
  await film.page.mouse.up();
  await film.hold(220);
  film.mark("hero");
  await film.hold(600);
  await film.click({ role: "button", name: /^burst$/i }, { hold: 1000 });
};
