// ClipPathCarousel: step forward twice so the active slide unclips to full height
export default async (film) => {
  await film.click({ role: "button", name: "Next slide" }, { hold: 1300 });
  film.mark("hero");
  await film.click({ role: "button", name: "Next slide" }, { hold: 1300 });
};
