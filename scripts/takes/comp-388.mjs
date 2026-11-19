// open the feedback popover, write a note, send it
export default async (film) => {
  await film.hover({ role: "button", name: /Feedback/ }, { hold: 1500 });
  await film.click({ role: "button", name: /Feedback/ }, { hold: 1200 });
  await film.type("textarea[placeholder*='improve coss']", "Dark mode looks great.", { delay: 20, hold: 400 });
  await film.mark("hero");
  await film.click({ role: "button", name: /Send feedback/ }, { hold: 600 });
  await film.click({ x: 90, y: film.H - 90 }, { hold: 400 });
};
