// Injected into every recorded page (Playwright addInitScript).
// Draws a macOS-style pointer that follows the REAL dispatched mouse events, so
// hover/click states in the component are genuine and the viewer sees a hand.
// Switches to a pointing hand over clickable things and an I-beam over text
// fields, and shows a soft ripple on click.
(() => {
  if (window.__recCursor) return;
  window.__recCursor = true;

  const ARROW = `<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><path d="M6 3.5v18.2l4.3-4.1 2.7 6.3 3.1-1.3-2.7-6.2h6.1L6 3.5z" fill="#000" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
  const HAND = `<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><path d="M10.2 3.6c1 0 1.8.8 1.8 1.8v6.3l.3-.1c.9-.3 1.9.1 2.3.9l.1.2c.9-.4 2-.1 2.5.8.9-.3 1.9.1 2.3 1 .2.4.3.9.3 1.4v4.4c0 3.6-2.7 6.2-6.2 6.2h-1c-2 0-3.6-.9-4.8-2.5l-3.6-5c-.6-.9-.4-2 .4-2.6.8-.6 1.9-.5 2.5.2l1.6 1.8V5.4c0-1 .8-1.8 1.8-1.8z" fill="#fff" stroke="#000" stroke-width="1.3" stroke-linejoin="round"/><path d="M12 16.5v4M15 16.5v4M18 16.5v4" stroke="#000" stroke-width="1.1" stroke-linecap="round"/></svg>`;
  const BEAM = `<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><path d="M10 5.5c1.8 0 3 .5 4 1.5 1-1 2.2-1.5 4-1.5M10 22.5c1.8 0 3-.5 4-1.5 1 1 2.2 1.5 4 1.5M14 7v14M12 14h4" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/><path d="M10 5.5c1.8 0 3 .5 4 1.5 1-1 2.2-1.5 4-1.5M10 22.5c1.8 0 3-.5 4-1.5 1 1 2.2 1.5 4 1.5M14 7v14M12 14h4" fill="none" stroke="#000" stroke-width="1.3" stroke-linecap="round"/></svg>`;
  // hotspot offsets (px from the top-left of the 28px box)
  const HOT = { arrow: [6, 3.5], hand: [10, 4], beam: [14, 14] };

  function boot() {
    const root = document.createElement("div");
    root.setAttribute("data-rec-cursor", "");
    root.style.cssText =
      "position:fixed;left:0;top:0;width:28px;height:28px;z-index:2147483647;pointer-events:none;" +
      "opacity:0;transition:opacity .25s ease;will-change:transform;filter:drop-shadow(0 1px 1.5px rgba(0,0,0,.35));";
    const ripple = document.createElement("div");
    ripple.style.cssText =
      "position:fixed;left:0;top:0;width:34px;height:34px;margin:-17px 0 0 -17px;border-radius:50%;" +
      "z-index:2147483646;pointer-events:none;opacity:0;border:2px solid rgba(255,255,255,.75);" +
      "background:rgba(255,255,255,.12);transform:scale(.3);";
    const attach = () => {
      if (!root.isConnected && document.body) document.body.append(ripple, root);
    };
    attach();

    let kind = "";
    let x = -100;
    let y = -100;
    let hidden = false;
    function setKind(k) {
      if (k === kind) return;
      kind = k;
      root.innerHTML = k === "hand" ? HAND : k === "beam" ? BEAM : ARROW;
    }
    function place() {
      // the page may be zoomed (small widgets are filmed bigger); keep the
      // cursor at its real size (Chrome reports clientX/Y in viewport px)
      const z = window.__recZoom || 1;
      root.style.zoom = String(1 / z);
      ripple.style.zoom = String(1 / z);
      const [hx, hy] = HOT[kind] || HOT.arrow;
      root.style.transform = `translate(${x - hx}px, ${y - hy}px)` + (root.dataset.down ? " scale(.88)" : "");
    }
    function kindAt(el) {
      if (!el || el.nodeType !== 1) return "arrow";
      const c = getComputedStyle(el).cursor;
      if (c === "pointer") return "hand";
      if (c === "text" || c === "vertical-text") return "beam";
      return "arrow";
    }
    setKind("arrow");

    addEventListener(
      "mousemove",
      (e) => {
        attach();
        x = e.clientX;
        y = e.clientY;
        setKind(kindAt(e.target));
        if (!hidden) root.style.opacity = "1";
        place();
      },
      true,
    );
    addEventListener(
      "mousedown",
      (e) => {
        root.dataset.down = "1";
        place();
        ripple.style.left = e.clientX + "px";
        ripple.style.top = e.clientY + "px";
        ripple.animate(
          [
            { opacity: 0.9, transform: "scale(.3)" },
            { opacity: 0, transform: "scale(1.35)" },
          ],
          { duration: 450, easing: "cubic-bezier(.2,.7,.3,1)" },
        );
      },
      true,
    );
    addEventListener(
      "mouseup",
      () => {
        delete root.dataset.down;
        place();
      },
      true,
    );
    window.__recCursorHide = (h) => {
      hidden = !!h;
      root.style.opacity = h ? "0" : "1";
    };
  }
  // Attach after hydration so React never sees a foreign node; re-attached on
  // every move in case something replaces <body>'s children.
  if (document.readyState === "complete") boot();
  else addEventListener("load", boot);
})();
