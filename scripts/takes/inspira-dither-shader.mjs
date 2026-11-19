// Switch the dither mode to halftone and duotone, then back to bayer/grayscale.
export default async (film) => {
  await film.click({ role: "button", name: /^halftone$/ }, { hold: 900 });
  await film.click({ role: "button", name: /^duotone$/ }, { hold: 1300 });
  film.mark("hero");
  await film.click({ role: "button", name: /^bayer$/ }, { hold: 700 });
  await film.click({ role: "button", name: /^grayscale$/ }, { hold: 900 });
};
