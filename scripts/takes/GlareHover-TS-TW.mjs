// GlareHover-TS-TW — the shimmer sweeps across each card as the cursor enters
export default async (film) => {
  await film.hover({ text: "Hover to reveal glare" }, { hold: 1400 });
  await film.hover({ text: "Purple tint" }, { hold: 1400 });
  await film.mark("hero");
  await film.hover({ text: "Hover to reveal glare" }, { hold: 1100 });
};
