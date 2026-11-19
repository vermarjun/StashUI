// hover the rounded learn-more action, then its dismiss control
export default async (film) => {
  await film.hover({ role: "button", name: /Learn more/ }, { hold: 1500 });
  film.mark("hero");
  await film.click({ role: "button", name: /Learn more/ }, { hold: 1000 });
  await film.hover({ role: "button", name: /Close banner/ }, { hold: 900 });
};
