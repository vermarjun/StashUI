// footer-bento — tour the footer cards and subscribe to the newsletter
export default async (film) => {
  await film.hover({ role: "button", name: "Get Started" }, { hold: 900 });
  await film.hover({ text: "GitHub" }, { hold: 800 });
  await film.type("[data-rec-root] input[type=email]", "maya@stashui.dev");
  film.mark("hero");
  await film.hold(800);
};
