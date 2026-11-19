// press the download action, then look at the learn-more link and dismiss control
export default async (film) => {
  await film.click({ role: "button", name: "Download" }, { hold: 1100 });
  film.mark("hero");
  await film.hover({ role: "button", name: /Learn more/ }, { hold: 1200 });
  await film.hover({ role: "button", name: /Close banner/ }, { hold: 900 });
};
