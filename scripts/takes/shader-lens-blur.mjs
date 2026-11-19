// shader-lens-blur — sweep the cursor across the shader so the lens distortion follows.
export default async (film) => {
  await film.drift({ secs: 4.6, cx: film.W * 0.5, cy: film.H * 0.5, rx: film.W * 0.26, ry: film.H * 0.2 });
  film.mark("hero");
};
