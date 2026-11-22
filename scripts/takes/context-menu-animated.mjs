// context-menu-animated — right-click opens the menu with a stagger, the highlight glides, a submenu hands off
export default async (film) => {
  const zone = film.page.locator("[data-rec-root] [data-slot=context-menu-trigger]").first();
  const b = await zone.boundingBox();
  const x = b.x + b.width * 0.42, y = b.y + b.height * 0.35;
  await film.glide({ x, y }, { secs: 0.7 });
  await film.page.mouse.click(x, y, { button: "right" });
  await film.hold(700);
  await film.hover({ text: "Reload" }, { hold: 500 });
  await film.hover({ text: "More Tools" }, { hold: 900 });
  film.mark("hero");
  await film.hover({ text: "Create Shortcut..." }, { hold: 700 });
  await film.press("Escape");
  await film.hold(500);
};
