// svg-mask-effect — gliding the cursor over the panel opens the spotlight mask
export default async (film) => {
  await film.drift({ secs: 4.5, cx: film.W * 0.5, cy: film.H * 0.48, rx: film.W * 0.22, ry: film.H * 0.18 });
  await film.mark("hero");
};
