// the label slides out and an arrow slides in on hover: dwell so both states read
export default async (film) => {
  await film.hover({ role: "button", name: /Get Started/i }, { hold: 2000 });
  film.mark("hero");
  await film.glide({ role: "button", name: /Learn More/i }, { secs: 0.8 });
  await film.hold(1700);
};
