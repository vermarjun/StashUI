// the reels spin up to their values on mount; switch weeks so they roll again
export default async (film) => {
  await film.hold(800);
  await film.click({ role: "button", name: "Launch week" }, { hold: 1800 });
  film.mark("hero");
  await film.click({ role: "button", name: "Last week" }, { hold: 1700 });
};
