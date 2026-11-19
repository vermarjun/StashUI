// Plain file input: pick a file so the field shows its filename; slow push-in.
export default async (film) => {
  film.mark("kenburns");
  await film.hideCursor();
  await film.page.evaluate(async () => {
    const c = document.createElement("canvas");
    c.width = 1200;
    c.height = 800;
    const g = c.getContext("2d");
    const grad = g.createLinearGradient(0, 0, 1200, 800);
    grad.addColorStop(0, "#6366f1");
    grad.addColorStop(1, "#0ea5e9");
    g.fillStyle = grad;
    g.fillRect(0, 0, 1200, 800);
    const blob = await new Promise((r) => c.toBlob(r, "image/png"));
    const dt = new DataTransfer();
    dt.items.add(new File([blob], "brand-cover.png", { type: "image/png" }));
    const input = document.querySelector("[data-rec-root] input[type=file]");
    input.files = dt.files;
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });
  await film.hold(4500);
};
