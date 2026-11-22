// text-along-path — the waitlist text runs around the frame while someone signs up
export default async (film) => {
  await film.hold(800);
  await film.type("[data-rec-root] input[type=email]", "maya@stashui.dev");
  await film.click({ role: "button", name: /subscribe/i }, { hold: 2000 });
  film.mark("hero");
  await film.hold(800);
};
