// Pulsating button: let the glow ring breathe, then hover and press the primary CTA
export default async (film) => {
  await film.hold(900);
  film.mark("hero");
  await film.hover({ role: "button", name: "Join the waitlist" }, { hold: 1400 });
  await film.click({ role: "button", name: "Join the waitlist" }, { hold: 800 });
  await film.hover({ role: "button", name: "Start free trial" }, { hold: 1400 });
};
