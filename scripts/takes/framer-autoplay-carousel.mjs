// framer-autoplay-carousel — ambient: autoplay advances the photo every 3s
export default async (film) => {
  await film.hideCursor();
  await film.hold(5200);
};
