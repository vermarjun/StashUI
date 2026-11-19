// open the floating note panel, write a note and submit it
export default async (film) => {
  // this panel positions itself from getBoundingClientRect, which the
  // recorder's page zoom would double-scale; run it at 1x
  await film.page.evaluate(() => {
    document.documentElement.style.zoom = "1";
  });
  await film.hold(300);
  await film.hover({ role: "button", name: /Add Note/ }, { hold: 1200 });
  await film.click({ role: "button", name: /Add Note/ }, { hold: 1200 });
  await film.type("textarea", "Ship the pricing page on Friday.", { delay: 22, hold: 400 });
  await film.mark("hero");
  await film.click({ role: "button", name: /Submit note/ }, { hold: 700 });
};
