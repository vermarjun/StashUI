// Hover the toolbar buttons one after another to show their shortcut tooltips.
export default async (film) => {
  await film.hover({ role: "button", name: /^bold$/i }, { hold: 1300 });
  await film.hover({ role: "button", name: /^italic$/i }, { hold: 1100 });
  await film.hover({ role: "button", name: /insert link/i }, { hold: 1600 });
  film.mark("hero");
  await film.hold(500);
};
