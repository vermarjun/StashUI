// press update, watch the spinner run, then see the button return to rest
export default async (film) => {
  await film.click({ role: "button", name: /Update now/ }, { hold: 1200 });
  film.mark("hero");
  await film.hold(1400);
  await film.hover({ role: "button", name: /Update now/ }, { hold: 1000 });
};
