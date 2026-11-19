// Magnetic button: orbit slowly inside the dashed field so the button visibly chases the cursor, then press it
export default async (film) => {
  const btn = film.page.getByRole("button", { name: "Get started" }).first();
  const box = await btn.boundingBox();
  if (!box) throw new Error("Get started button not found");
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;

  await film.glide({ x: cx - 75, y: cy }, { secs: 0.8 });
  for (let i = 0; i <= 20; i++) {
    const a = Math.PI + (i / 20) * Math.PI * 2;
    await film.glide({ x: cx + Math.cos(a) * 75, y: cy + Math.sin(a) * 36 }, { secs: 0.16 });
  }
  film.mark("hero");
  await film.hover({ role: "button", name: "Documentation" }, { hold: 900 });
  await film.click({ role: "button", name: "Get started" }, { hold: 900 });
};
