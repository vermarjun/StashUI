// menubar-animated — open File, then glide across the bar so menus hand off with a moving highlight
export default async (film) => {
  await film.click({ role: "menuitem", name: "File" }, { hold: 800 });
  await film.hover({ text: "New Window" }, { hold: 500 });
  await film.hover({ role: "menuitem", name: "Edit" }, { hold: 800 });
  film.mark("hero");
  await film.hover({ role: "menuitem", name: "View" }, { hold: 900 });
  await film.press("Escape");
  await film.hold(400);
};
