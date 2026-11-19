// hover the banner's call to action, then its dismiss control (don't remove it)
export default async (film) => {
  await film.hover({ text: "Learn more" }, { hold: 1400 });
  film.mark("hero");
  await film.hover({ role: "button", name: /Close banner/ }, { hold: 1200 });
};
