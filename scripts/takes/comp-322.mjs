// open the feedback dialog, write a note, send it
export default async (film) => {
  await film.hover({ role: "button", name: /Feedback/ }, { hold: 1500 });
  await film.click({ role: "button", name: /Feedback/ }, { hold: 1200 });
  await film.type("textarea[placeholder*='improve coss']", "Love the new command palette!", { delay: 16, hold: 400 });
  await film.mark("hero");
  await film.click({ role: "button", name: /Send feedback/ }, { hold: 600 });
  await film.press("Escape", { hold: 300 });
};
