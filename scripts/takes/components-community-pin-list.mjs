// components-community-pin-list — pinning an item moves it into Pinned
export default async (film) => {
  await film.click({ text: "Settings" }, { hold: 1700 });
  film.mark("hero");
  await film.click({ text: "Notifications" }, { hold: 1500 });
};
