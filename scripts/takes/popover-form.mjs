// open the feedback popover, write a note and send it
export default async (film) => {
  await film.hover({ role: "button", name: /^Feedback$/ }, { hold: 1500 });
  await film.click({ role: "button", name: /^Feedback$/ }, { hold: 1300 });
  await film.type("textarea[placeholder*='Share your thoughts']", "The onboarding flow feels smoother now.", { delay: 18, hold: 400 });
  await film.mark("hero");
  await film.click({ role: "button", name: /Send/ }, { hold: 900 });
  await film.click({ x: 90, y: film.H - 90 }, { hold: 400 });
};
