// distorted-glass — scroll a photo feed under the ribbed glass strip so images warp as they pass beneath it
export default async (film) => {
  await film.glide("[data-scroll]", { secs: 0.7 });
  await film.scroll(300, { secs: 1.6, hold: 600 });
  film.mark("hero");
  await film.scroll(320, { secs: 1.6, hold: 600 });
  await film.scroll(-620, { secs: 1.6 });
};
