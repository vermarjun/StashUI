// tiles rise in, figures count up and the growth bars grow; then hover a couple of tiles
export default async (film) => {
  await film.hold(1000);
  film.mark("hero");
  await film.hover({ text: "Dominating the cloud-native" }, { hold: 1000 });
  await film.hover({ text: "G2 Peer Reviews" }, { hold: 1000 });
  await film.hover({ text: "Growth" }, { hold: 900 });
};
