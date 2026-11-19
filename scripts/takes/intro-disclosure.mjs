// intro-disclosure — step through the feature tour with Next so each step's media slides in, then finish
export default async (film) => {
  await film.click({ role: "button", name: /^next$/i }, { hold: 1300 });
  film.mark("hero");
  await film.click({ role: "button", name: /^next$/i }, { hold: 1300 });
  await film.click({ role: "button", name: /^previous$/i }, { hold: 1100 });
};
