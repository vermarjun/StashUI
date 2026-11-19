// hold while the headline types itself out, then the cursor blinks
export default async (film) => {
  await film.hideCursor();
  await film.hold(3300);
};
