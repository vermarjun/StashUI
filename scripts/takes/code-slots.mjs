// Code Slots: type a 6-digit code, digits spring into their slots, success state lands
export default async (film) => {
  await film.type("[data-rec-root] input", "428193", { delay: 160 });
  film.mark("hero");
  await film.hold(1600);
};
