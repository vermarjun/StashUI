// Mention: type a comment, hit "@" so the suggestion list opens, pick a teammate
export default async (film) => {
  await film.type("[data-rec-root] textarea", "Can you review this, @Is", { delay: 55 });
  await film.hold(900);
  film.mark("hero");
  await film.click({ role: "option", name: /Isabella/ }, { hold: 1300 });
};
