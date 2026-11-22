// waitlist: type an email, join, and the form swaps to the thank-you pill
export default async (film) => {
  await film.type("input[type=email]", "maya@halcyon.dev");
  await film.click({ role: "button", name: /join waitlist/i }, { hold: 1800 });
  film.mark("hero");
};
