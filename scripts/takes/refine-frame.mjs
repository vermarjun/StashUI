// Generation frame: regenerate and watch it step queued -> generating -> refining -> complete.
export default async (film) => {
  await film.click({ role: "button", name: /regenerate/i }, { hold: 1800 });
  film.mark("hero");
  await film.hold(2400);
};
