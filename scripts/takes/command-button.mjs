// Command button: presses the real shortcut so the keycaps sink and the button fires
export default async (film) => {
  const kb = film.page.keyboard;
  await film.hover({ role: "button", name: /search docs/i }, { hold: 700 });
  await kb.down("ControlOrMeta");
  await film.hold(250);
  await kb.down("k");
  film.mark("hero");
  await film.hold(450);
  await kb.up("k");
  await kb.up("ControlOrMeta");
  await film.hold(900);
  await film.click({ role: "button", name: /new issue/i }, { hold: 1000 });
};
