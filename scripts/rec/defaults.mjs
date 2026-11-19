// Default take scripts by kind of component, used when there is no bespoke
// scripts/takes/<name>.mjs. Each one behaves like a calm person showing the
// component off: look first, interact with 2-3 things, end at rest.
//
// Kind comes from the component's primary category (registry/categories.json).

const SAMPLE = {
  email: "maya@stashui.dev",
  password: "correct-horse-42",
  search: "pricing table",
  tel: "+1 415 555 0132",
  url: "stashui.dev",
  number: "42",
  otp: "482913",
  name: "Maya Chen",
  text: "Ship it on Friday",
  textarea: "Love the new dashboard, the charts load so much faster now.",
};

async function visible(page, selector, max = 4) {
  const loc = page.locator(selector);
  const n = Math.min(await loc.count().catch(() => 0), 40);
  const out = [];
  for (let i = 0; i < n && out.length < max; i++) {
    const el = loc.nth(i);
    const box = await el.boundingBox().catch(() => null);
    if (box && box.width > 2 && box.height > 2 && (await el.isVisible().catch(() => false))) out.push(el);
  }
  return out;
}

const CLICKABLE =
  "[data-rec-root] button:not([disabled]), [data-rec-root] a[href], [data-rec-root] a[data-href], [data-rec-root] [role=button], [data-rec-root] [role=tab], [data-rec-root] [role=menuitem]";

// Pick text a real person would type into this particular field, from its
// placeholder, label, aria-label, name, id and autocomplete hints.
const RULES = [
  [/card ?num|cc-number|•••• ••••/, "4242 4242 4242 4242"],
  [/mm ?\/ ?yy|expir|cc-exp/, "12/28"],
  [/cvc|cvv|security code|cc-csc/, "314"],
  [/zip|postal/, "94107"],
  [/amount|price|\$|usd|budget/, "1,250"],
  [/otp|one.time|verification|code|pin/, SAMPLE.otp],
  [/e-?mail/, SAMPLE.email],
  [/pass/, SAMPLE.password],
  [/phone|tel|mobile/, SAMPLE.tel],
  [/user ?name|handle/, "mayachen"],
  [/first name/, "Maya"],
  [/last name|surname/, "Chen"],
  [/name/, SAMPLE.name],
  [/company|organi[sz]ation/, "Northwind Labs"],
  [/url|website|domain|link/, SAMPLE.url],
  [/search|find|filter|look/, SAMPLE.search],
  [/tag|keyword/, "design"],
  [/city/, "San Francisco"],
  [/address|street/, "500 Howard St"],
  [/qty|quantity|count/, "3"],
  [/date/, "08/11/2026"],
  [/time/, "09:30"],
  [/colou?r|hex/, "#6366F1"],
  [/message|comment|feedback|note|bio|description|about/, SAMPLE.textarea],
  [/title|subject/, "Quarterly roadmap"],
];

async function sampleFor(el) {
  const a = await el
    .evaluate((n) => {
      const id = n.id;
      const forLabel = id ? document.querySelector(`label[for="${CSS.escape(id)}"]`)?.textContent : "";
      return {
        tag: n.tagName.toLowerCase(),
        type: (n.getAttribute("type") || "").toLowerCase(),
        max: n.getAttribute("maxlength"),
        hint: [
          n.getAttribute("placeholder"),
          n.getAttribute("aria-label"),
          n.getAttribute("name"),
          id,
          n.getAttribute("autocomplete"),
          forLabel || n.closest("label")?.textContent,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase(),
      };
    })
    .catch(() => ({ hint: "" }));
  if (a.max === "1") return SAMPLE.otp;
  for (const [re, v] of RULES) if (re.test(a.hint)) return v;
  const byType = { email: SAMPLE.email, password: SAMPLE.password, search: SAMPLE.search, url: SAMPLE.url, tel: SAMPLE.tel, number: "3" };
  if (byType[a.type]) return byType[a.type];
  if (a.tag === "textarea") return SAMPLE.textarea;
  return SAMPLE.text;
}

const routines = {
  // hover a few clickable things, press the last one
  async press(film) {
    const els = await visible(film.page, CLICKABLE, 3);
    if (!els.length) return routines.look(film);
    for (const el of els.slice(0, -1)) await film.hover(el, { hold: 900 });
    await film.click(els.at(-1), { hold: 1300 });
  },
  async look(film) {
    await film.hover(film.root(), { hold: 1800 }).catch(() => film.hold(1800));
  },
  async type(film) {
    const fields = await visible(
      film.page,
      "[data-rec-root] input:not([type=hidden]):not([type=checkbox]):not([type=radio]):not([type=range]):not([type=file]), [data-rec-root] textarea, [data-rec-root] [contenteditable=true]",
      3,
    );
    if (!fields.length) return routines.press(film);
    const otp = (await fields[0].getAttribute("maxlength").catch(() => null)) === "1";
    if (otp) {
      await film.click(fields[0], { hold: 300 });
      await film.type(null, SAMPLE.otp, { delay: 120 });
    } else {
      for (const f of fields.slice(0, 3)) await film.type(f, await sampleFor(f), { hold: 450 });
    }
    const submit = await visible(film.page, "[data-rec-root] button:not([disabled])", 1);
    if (submit.length) await film.hover(submit[0], { hold: 1000 });
  },
  async pick(film) {
    const triggers = await visible(
      film.page,
      "[data-rec-root] [role=combobox], [data-rec-root] [aria-haspopup], [data-rec-root] select, [data-rec-root] button",
      1,
    );
    if (!triggers.length) return routines.look(film);
    await film.click(triggers[0], { hold: 1200 });
    const opts = await visible(film.page, "[role=option], [role=menuitem], [role=menuitemradio], [role=menuitemcheckbox], [cmdk-item]", 3);
    if (!opts.length) return;
    for (const o of opts.slice(0, -1)) await film.hover(o, { hold: 500 });
    await film.click(opts.at(-1), { hold: 1200 });
  },
  async toggle(film) {
    const els = await visible(
      film.page,
      "[data-rec-root] [role=checkbox], [data-rec-root] [role=switch], [data-rec-root] [role=radio], [data-rec-root] input[type=checkbox], [data-rec-root] input[type=radio], [data-rec-root] label",
      3,
    );
    if (!els.length) return routines.press(film);
    for (const el of els) await film.click(el, { hold: 800 });
  },
  async slide(film) {
    const thumbs = await visible(film.page, "[data-rec-root] [role=slider], [data-rec-root] input[type=range]", 1);
    if (!thumbs.length) return routines.press(film);
    const b = await thumbs[0].boundingBox();
    const y = b.y + b.height / 2;
    await film.glide({ x: b.x + b.width / 2, y });
    await film.page.mouse.down();
    await film.glide({ x: b.x + b.width / 2 + 140, y }, { secs: 0.9 });
    await film.hold(300);
    await film.glide({ x: b.x + b.width / 2 + 40, y }, { secs: 0.8 });
    await film.page.mouse.up();
    await film.hold(900);
  },
  async dialog(film) {
    const t = await visible(film.page, CLICKABLE, 1);
    if (!t.length) return routines.look(film);
    await film.click(t[0], { hold: 1900 });
    await film.press("Escape", { hold: 900 });
  },
  async flip(film) {
    const els = await visible(
      film.page,
      "[data-rec-root] [role=tab], [data-rec-root] [data-state] > button, [data-rec-root] button[aria-expanded], [data-rec-root] summary",
      3,
    );
    if (!els.length) return routines.press(film);
    for (const el of els.slice(1)) await film.click(el, { hold: 1300 });
    await film.click(els[0], { hold: 1100 });
  },
  // static artwork (gradient swatches): slow camera push-in, no cursor
  async still(film) {
    film.mark("kenburns");
    await film.hideCursor();
    await film.hold(5200);
  },
  async ambient(film) {
    await film.hideCursor();
    await film.hold(5200);
  },
  async play(film) {
    // cursor-reactive effects: idle wander so the effect responds
    await film.drift({ secs: 4.5 });
  },
  async scroll(film) {
    const h = await film.page.evaluate(() => document.scrollingElement.scrollHeight - innerHeight);
    await film.glide({ x: film.W * 0.55, y: film.H * 0.55 });
    await film.hold(600);
    // never slam into the bottom: travel ~55% of the page, ease out, hold
    await film.scroll(Math.max(300, Math.round(h * 0.55)), { secs: 3.2, hold: 1200 });
  },
};

const BY_CATEGORY = {
  buttons: "press",
  badges: "look",
  avatars: "press",
  borders: "look",
  cards: "look",
  tooltips: "press",
  navigation: "press",
  menus: "press",
  notifications: "press",
  inputs: "type",
  forms: "type",
  "file-upload": "press",
  selects: "pick",
  checkboxes: "toggle",
  switches: "toggle",
  sliders: "slide",
  calendar: "press",
  modals: "dialog",
  accordions: "flip",
  tabs: "flip",
  steppers: "press",
  carousels: "press",
  tables: "press",
  charts: "look",
  "data-display": "look",
  loaders: "ambient",
  backgrounds: "ambient",
  gradients: "still",
  text: "ambient",
  media: "look",
  "3d": "play",
  devices: "look",
  code: "ambient",
  effects: "play",
  cursors: "play",
  scroll: "scroll",
};

export function defaultRoutine(category, cfg = {}) {
  if (cfg.scroll) return routines.scroll;
  return routines[BY_CATEGORY[category] ?? "press"];
}
export { routines };
