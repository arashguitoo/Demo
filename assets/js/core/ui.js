/* ==========================================================
   Kleine UI-Bausteine ohne Framework
   ========================================================== */

/** Element bauen: h("div.klasse#id", {attr}, kinder…) */
export function h(tag, attrs, ...kids) {
  const m = /^([a-z0-9-]+)?((?:[.#][\w-]+)*)$/i.exec(tag) || [];
  const el = document.createElement(m[1] || "div");
  (m[2] || "").replace(/([.#])([\w-]+)/g, (_, t, n) => { if (t === ".") el.classList.add(n); else el.id = n; });
  if (attrs != null && (typeof attrs !== "object" || attrs instanceof Node || Array.isArray(attrs))) { kids.unshift(attrs); attrs = null; }
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k === "class") el.className += (el.className ? " " : "") + v;
    else if (k === "style" && typeof v === "object") { for (const [sk, sv] of Object.entries(v)) { if (sk.startsWith("--")) el.style.setProperty(sk, sv); else el.style[sk] = sv; } }
    else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === "html") el.innerHTML = v;
    else if (k === "value") { el.value = v; if (el.tagName === "INPUT") el.setAttribute("value", v); }
    else if (k in el && typeof v !== "string" && k !== "list") el[k] = v;
    else el.setAttribute(k, v === true ? "" : v);
  }
  append(el, kids);
  return el;
}
function append(el, kids) {
  for (const k of kids.flat(Infinity)) {
    if (k == null || k === false) continue;
    el.appendChild(k instanceof Node ? k : document.createTextNode(String(k)));
  }
}
export const clear = (el) => { while (el.firstChild) el.removeChild(el.firstChild); return el; };
export const mount = (el, ...kids) => { clear(el); append(el, kids); return el; };
export const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- Icons (Linien, 24er Raster) ---------- */
const P = {
  home: "M3 11.5 12 4l9 7.5M5.5 10v9.5h13V10",
  book: "M5 4.5h9.5a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3zM5 17a3 3 0 0 1 3-3h9.5",
  users: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20c.6-3.4 3.2-5.5 6.5-5.5s5.9 2.1 6.5 5.5M16 4.3a3.5 3.5 0 0 1 0 6.4M18.5 14.8c1.6.8 2.7 2.6 3 5.2",
  calendar: "M4 6.5h16V20H4zM4 10.5h16M8.5 3.5v5M15.5 3.5v5",
  chart: "M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6",
  chat: "M4 5.5h16v11H9l-5 4z",
  play: "M7 4.5v15l12-7.5z",
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM12 12h.01",
  cards: "M7 7.5h12v12H7zM4 16.5V4.5h12",
  puzzle: "M10 4.5a2 2 0 1 1 4 0V6h4.5v4.5H17a2 2 0 1 0 0 4h1.5V19H14v-1.5a2 2 0 1 0-4 0V19H5.5v-4.5H7a2 2 0 1 0 0-4H5.5V6H10z",
  trophy: "M8 4.5h8V10a4 4 0 0 1-8 0zM8 6.5H4.5c0 3 1.5 4.5 3.7 4.8M16 6.5h3.5c0 3-1.5 4.5-3.7 4.8M12 14v3.5M8.5 20h7l-.8-2.5H9.3z",
  map: "M9 4.5 3.5 6.5v13L9 17.5l6 2 5.5-2v-13L15 6.5zM9 4.5v13M15 6.5v13",
  logout: "M14 4.5H5.5v15H14M10 12h10.5M17 8.5l3.5 3.5-3.5 3.5",
  plus: "M12 5v14M5 12h14",
  check: "M5 12.5l4.5 4.5L19 7.5",
  x: "M6 6l12 12M18 6 6 18",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7.5V12l3 2",
  print: "M7 9V4.5h10V9M7 17H4.5V9h15v8H17M7 14h10v6H7z",
  key: "M14.5 9.5a4.5 4.5 0 1 1-1.3 3.2M14.5 9.5 20 4M17 7l2 2M13.2 12.7 4 4",
  arrowL: "M15 5l-7 7 7 7",
  arrowR: "M9 5l7 7-7 7",
  edit: "M4.5 19.5h4L19 9l-4-4L4.5 15.5zM13 7l4 4",
  trash: "M5 7h14M10 7V4.5h4V7M7 7l1 13h8l1-13",
  copy: "M8.5 8.5h11v11h-11zM15.5 8.5V4.5h-11v11h4",
  mail: "M4 6h16v12H4zM4 6.5l8 6.5 8-6.5",
  spark: "M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3",
  layers: "M12 4 3 8.5l9 4.5 9-4.5zM3 12.5l9 4.5 9-4.5M3 16.5l9 4.5 9-4.5",
  menu: "M4 7h16M4 12h16M4 17h16",
  info: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v5.5M12 7.5h.01",
  school: "M3 9 12 4.5 21 9l-9 4.5zM6.5 11v5c1.5 1.6 3.4 2.5 5.5 2.5s4-.9 5.5-2.5v-5M21 9v5.5",
};
export function icon(name, size = 20) {
  const ns = "http://www.w3.org/2000/svg";
  const s = document.createElementNS(ns, "svg");
  s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("width", size); s.setAttribute("height", size);
  s.setAttribute("aria-hidden", "true"); s.classList.add("ic");
  const p = document.createElementNS(ns, "path");
  p.setAttribute("d", P[name] || P.info);
  s.appendChild(p);
  return s;
}

/* ---------- Meldungen ---------- */
let toastBox = null;
export function toast(text, art = "ok") {
  if (!toastBox) { toastBox = h("div.toasts", { role: "status", "aria-live": "polite" }); document.body.appendChild(toastBox); }
  const t = h("div.toast." + art, text);
  toastBox.appendChild(t);
  setTimeout(() => t.classList.add("weg"), 2600);
  setTimeout(() => t.remove(), 3100);
}

/* ---------- Dialog ---------- */
export function dialog({ titel, inhalt, aktionen = [], breit = false }) {
  return new Promise((resolve) => {
    const d = h("dialog.dlg" + (breit ? ".breit" : ""));
    const close = (v) => { d.close(); d.remove(); resolve(v); };
    const fuss = h("div.dlg-fuss",
      aktionen.map((a) => h("button.btn" + (a.primaer ? ".primaer" : "") + (a.gefahr ? ".gefahr" : ""), {
        type: a.submit ? "submit" : "button",
        onclick: async (e) => {
          if (a.submit) return;
          e.preventDefault();
          if (a.vorher) { const ok = await a.vorher(d); if (ok === false) return; }
          close(a.wert);
        },
      }, a.text)));
    const form = h("form.dlg-form", { method: "dialog", onsubmit: async (e) => {
      e.preventDefault();
      const a = aktionen.find((x) => x.submit);
      if (a && a.vorher) { const ok = await a.vorher(d); if (ok === false) return; }
      close(a ? a.wert : true);
    } },
      h("header.dlg-kopf", h("h2", titel), h("button.icon-btn", { type: "button", "aria-label": "Schließen", onclick: () => close(null) }, icon("x"))),
      h("div.dlg-inhalt", inhalt),
      fuss);
    d.appendChild(form);
    d.addEventListener("cancel", (e) => { e.preventDefault(); close(null); });
    document.body.appendChild(d);
    d.showModal();
    const first = d.querySelector("input,select,textarea");
    if (first) first.focus();
  });
}
export const bestaetigen = (titel, text, ja = "Ja", gefahr = false) =>
  dialog({ titel, inhalt: h("p", text), aktionen: [{ text: "Abbrechen", wert: false }, { text: ja, wert: true, primaer: !gefahr, gefahr }] });

/* ---------- Formatierung ---------- */
const WT = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
const WT_LANG = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const MON = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
export const pad = (n) => String(n).padStart(2, "0");
/** "2026-10-17" aus Date (lokale Zeit) */
export const isoTag = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const ausIso = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
export const datumKurz = (s) => { const d = typeof s === "string" ? ausIso(s) : new Date(s); return `${WT[d.getDay()]}, ${d.getDate()}.${d.getMonth() + 1}.`; };
export const datumLang = (s) => { const d = typeof s === "string" ? ausIso(s) : new Date(s); return `${WT_LANG[d.getDay()]}, ${d.getDate()}. ${MON[d.getMonth()]} ${d.getFullYear()}`; };
export const monatName = (m) => MON[m];
export const wochentagKurz = (i) => WT[i];
export const uhrzeit = (ts) => { const d = new Date(ts); return `${pad(d.getHours())}:${pad(d.getMinutes())}`; };
export const prozent = (a, b) => (b ? Math.round((a / b) * 100) : 0);
export function seit(ts) {
  const m = Math.round((Date.now() - ts) / 60000);
  if (m < 1) return "gerade eben";
  if (m < 60) return `vor ${m} Min.`;
  const hh = Math.round(m / 60);
  if (hh < 24) return `vor ${hh} Std.`;
  const t = Math.round(hh / 24);
  return t === 1 ? "gestern" : `vor ${t} Tagen`;
}

/** Wörter für Mengen */
export const anzahl = (n, ein, mehr) => `${n} ${n === 1 ? ein : mehr}`;

export function kopieren(text) {
  if (navigator.clipboard) return navigator.clipboard.writeText(text).then(() => toast("Kopiert"), () => toast("Kopieren ging nicht", "fehler"));
  toast("Kopieren ging nicht", "fehler");
}
