// inspira-confetti — clicking the button bursts confetti across the panel
export default async (film) => {
  await film.click({ role: "button", name: /celebrate/i }, { hold: 1800 });
  await film.mark("hero");
  await film.hold(900);
};
