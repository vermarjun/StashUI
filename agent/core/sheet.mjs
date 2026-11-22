// A sheet is the one image an agent is handed: a grid of component tiles, each
// with a number the agent answers with.
//
// The size is not a taste call. 1456 x 840 is the largest image Claude's
// standard tier keeps at full resolution (52 x 30 patches of 28px = 1,560 of a
// 1,568 token budget), and it is inside the budgets OpenAI and Gemini document.
// A bigger sheet is silently shrunk by the model provider, which costs exactly
// the detail the sheet exists to show.
import { existsSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { drawText, fillRect, textWidth } from "./font.mjs";

export const SHEET_W = 1456, SHEET_MAX_H = 840;
const GAP = 8, BAR = 24;
const BG = [10, 10, 10], PANEL = [22, 22, 22], BADGE = [255, 214, 10], INK = [0, 0, 0], CAPTION = [200, 200, 200];
const TILE_W = 480, TILE_H = 300;

export const publicDir = () => process.env.STASHUI_PUBLIC || join(process.cwd(), "public");

/** Fit `count` cells in `cols` columns inside the sheet budget. */
export function layout(count, cols) {
  const rows = Math.max(1, Math.ceil(count / cols));
  let cellW = Math.floor((SHEET_W - GAP * (cols + 1)) / cols);
  let cellH = Math.round((cellW * TILE_H) / TILE_W);
  if (GAP + rows * (cellH + BAR + GAP) > SHEET_MAX_H) {      // too tall: shrink cells, centre the grid
    cellH = Math.floor((SHEET_MAX_H - GAP) / rows) - BAR - GAP;
    cellW = Math.round((cellH * TILE_W) / TILE_H);
  }
  const x0 = Math.floor((SHEET_W - (cols * cellW + (cols - 1) * GAP)) / 2);
  return { cols, rows, cellW, cellH, x0, W: SHEET_W, H: GAP + rows * (cellH + BAR + GAP) };
}

/** Columns for a result count: bigger cells when there are fewer things to show. */
export const columnsFor = (n) => (n <= 4 ? 2 : n <= 6 ? 3 : n <= 12 ? 4 : 5);

async function pixels(cell, w, h) {
  const dir = publicDir();
  let img;
  if (!cell.name) return null;
  if (cell.film != null) {                                    // one frame of the 3x2 film strip
    const p = join(dir, "agent/film", `${cell.name}.webp`);
    if (!existsSync(p)) return null;
    img = sharp(p).extract({ left: (cell.film % 3) * TILE_W, top: Math.floor(cell.film / 3) * TILE_H, width: TILE_W, height: TILE_H });
  } else {
    const tile = join(dir, "agent/tiles", `${cell.name}.webp`);
    const poster = join(dir, "previews", `${cell.name}.jpg`); // not yet through the tile pipeline: show the raw poster
    if (existsSync(tile)) img = sharp(tile);
    else if (existsSync(poster)) img = sharp(poster);
    else return null;
  }
  return img.resize(w, h, { fit: "cover" }).removeAlpha().raw().toBuffer();
}

/**
 * @param {{cols?: number, cells: {name: string, badge: string, caption?: string, film?: number}[]}} spec
 * @returns {Promise<Buffer>} JPEG
 */
export async function compose(spec) {
  const L = layout(spec.cells.length, spec.cols || columnsFor(spec.cells.length));
  const buf = Buffer.alloc(L.W * L.H * 3);
  fillRect(buf, L.W, L.H, 0, 0, L.W, L.H, BG);
  const tiles = await Promise.all(spec.cells.map((c) => pixels(c, L.cellW, L.cellH).catch(() => null)));
  spec.cells.forEach((cell, i) => {
    const x = L.x0 + (i % L.cols) * (L.cellW + GAP), y = GAP + Math.floor(i / L.cols) * (L.cellH + BAR + GAP);
    const px = tiles[i];
    if (px) for (let row = 0; row < L.cellH; row++) px.copy(buf, ((y + row) * L.W + x) * 3, row * L.cellW * 3, (row + 1) * L.cellW * 3);
    else {
      fillRect(buf, L.W, L.H, x, y, L.cellW, L.cellH, PANEL);
      if (cell.name) drawText(buf, L.W, L.H, "NO PREVIEW", x + (L.cellW - textWidth("NO PREVIEW", 2)) / 2 | 0, y + L.cellH / 2 - 7 | 0, 2, CAPTION);
    }
    const bw = textWidth(cell.badge, 3) + 12;                 // the number: 29px tall, black on yellow, top-left
    fillRect(buf, L.W, L.H, x, y, bw, 29, BADGE);
    drawText(buf, L.W, L.H, cell.badge, x + 6, y + 4, 3, INK);
    let cap = cell.caption || cell.name;
    while (cap.length > 3 && textWidth(cap, 2) > L.cellW - 14) cap = cap.slice(0, -1);
    drawText(buf, L.W, L.H, cap, x + 3, y + L.cellH + 6, 2, CAPTION);
  });
  return sharp(buf, { raw: { width: L.W, height: L.H, channels: 3 } }).jpeg({ quality: 88, chromaSubsampling: "4:4:4" }).toBuffer();
}

/** Tokens the sheet costs on Claude: one per 28px patch. */
export const sheetTokens = (count, cols) => {
  const L = layout(count, cols || columnsFor(count));
  return Math.ceil(L.W / 28) * Math.ceil(L.H / 28);
};

// A spec travels in the URL, so a sheet needs no storage and the same request always yields the same image.
export const encodeSpec = (spec) => Buffer.from(JSON.stringify(spec)).toString("base64url");
export const decodeSpec = (s) => JSON.parse(Buffer.from(s, "base64url").toString("utf8"));
