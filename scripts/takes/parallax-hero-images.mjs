// parallax-hero-images — sweeping the cursor drifts the image layers apart at different depths
export default async (film) => {
  await film.glide({ x: film.W * 0.2, y: film.H * 0.3 }, { secs: 0.8 });
  film.mark("hero");
  await film.drift({ secs: 4.6, cx: film.W * 0.5, cy: film.H * 0.5, rx: film.W * 0.38, ry: film.H * 0.3 });
};
