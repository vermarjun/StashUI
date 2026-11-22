// shared-tooltip — one tooltip glides from button to button across the toolbar
export default async (film) => {
  await film.hover({ role: "button", name: "Bold" }, { hold: 700 });
  await film.hover({ role: "button", name: "Underline" }, { hold: 600 });
  film.mark("hero");
  await film.hover({ role: "button", name: "Insert link" }, { hold: 800 });
  await film.hover({ role: "button", name: "Italic" }, { hold: 700 });
};
