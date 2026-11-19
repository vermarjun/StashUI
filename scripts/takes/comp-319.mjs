// open the terms dialog, read to the bottom, then accept
export default async (film) => {
  await film.hover({ role: "button", name: /Terms & Conditions/ }, { hold: 1200 });
  await film.click({ role: "button", name: /Terms & Conditions/ }, { hold: 900 });
  await film.scroll(3200, { secs: 2.0, hold: 350 });
  await film.mark("hero");
  await film.click({ role: "button", name: /I agree/ }, { hold: 700 });
};
