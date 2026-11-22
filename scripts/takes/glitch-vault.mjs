// Glitch vault: sweep the cursor over both cards so the matrix glyph glow trails it
export default async (film) => {
  await film.glide({ text: "Maya Lin" }, { secs: 0.8 });
  await film.drift({ secs: 2.2, rx: 120, ry: 110 });
  film.mark("hero");
  await film.glide({ text: "Project Launch" }, { secs: 0.8 });
  await film.drift({ secs: 2, rx: 150, ry: 60 });
};
