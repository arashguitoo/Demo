/* Karteikasten nach dem Fächer-Prinzip (Leitner): Gewusstes wandert nach hinten.
   Stand: schools/{sid}/karteikasten/{stid}/{niveau}/{index} = Fach 1–5 */
import { h, icon, mount, toast } from "../core/ui.js";
import { NIVEAUS } from "../data/katalog.js";
import { mischen } from "../spiel/engine.js";

const FAECHER = 5;
export function sprich(text) {
  try {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE"; u.rate = 0.9;
    const stimme = speechSynthesis.getVoices().find((v) => v.lang && v.lang.startsWith("de"));
    if (stimme) u.voice = stimme;
    speechSynthesis.speak(u);
  } catch (e) { /* ohne Ton weiter */ }
}

export default async function (ctx) {
  const { store, session } = ctx;
  const istTn = session.rolle === "tn";
  const [a, b] = await Promise.all([
    import("../data/inhalte/ws-karteikasten.js").then((m) => m.default).catch(() => ({ stapel: {} })),
    import("../data/inhalte/ws-karteikasten-b.js").then((m) => m.default).catch(() => ({ stapel: {} })),
  ]);
  const stapel = { ...a.stapel, ...b.stapel };
  const vorhanden = NIVEAUS.filter((n) => stapel[n] && stapel[n].length);
  let niveau = vorhanden[0] || "A1";
  if (istTn) { const k = await store.get(ctx.schule(`klassen/${session.klasseId}`)); if (k && stapel[k.niveau]) niveau = k.niveau; }
  const pfad = (n) => ctx.schule(`karteikasten/${session.studentId}/${n}`);
  let stand = {};
  const lokal = {}; // Lehrkraft-Vorschau
  const flaeche = h("div");

  async function lade() { stand = istTn ? (await store.get(pfad(niveau))) || {} : lokal[niveau] || {}; }
  const fach = (i) => stand[i] || 0; // 0 = neu
  async function setzeFach(i, f) {
    stand[i] = f;
    if (istTn) await store.set(`${pfad(niveau)}/${i}`, f).catch(() => toast("Speichern ging nicht", "fehler"));
    else lokal[niveau] = { ...stand };
  }

  function uebersicht() {
    const karten = stapel[niveau] || [];
    const zaehl = Array.from({ length: FAECHER + 1 }, (_, f) => karten.filter((_, i) => fach(i) === f).length);
    mount(flaeche,
      h("div.reihe", { style: { marginBottom: "1rem" } }, h("span.leise", "Niveau:"),
        h("div.segment", vorhanden.map((n) => h("button", { "aria-pressed": String(n === niveau), style: n === niveau ? { background: `var(--${n.toLowerCase()})`, color: "#fff" } : null, onclick: async () => { niveau = n; await lade(); uebersicht(); } }, n)))),
      h("div.faecher", Array.from({ length: FAECHER + 1 }, (_, f) => h("div.fach" + (f === 0 ? ".neu" : ""), { style: { "--h": Math.min(100, 12 + zaehl[f] * 4) + "%" } },
        h("div.fach-stapel", h("i")),
        h("b", zaehl[f]),
        h("span", f === 0 ? "neu" : f === FAECHER ? "sicher" : `Fach ${f}`)))),
      h("p.leise", "Karten, die du weißt, wandern ein Fach weiter. Was du noch nicht weißt, kommt zurück in Fach 1."),
      h("div.reihe", h("button.btn.primaer.gross", { onclick: () => ueben(), disabled: !karten.length }, icon("cards", 20), "10 Karten üben"),
        !istTn ? h("span.chip.petrol", "Vorschau: Ihr Stand wird nicht gespeichert") : null));
  }

  function ueben() {
    const karten = (stapel[niveau] || []).map((k, i) => ({ ...k, i }));
    // Fällige zuerst: niedrigstes Fach, innerhalb gemischt; Fach 5 nur, wenn sonst nichts da ist
    const sortiert = mischen(karten).sort((x, y) => (fach(x.i) || 0.5) - (fach(y.i) || 0.5));
    const runde = sortiert.slice(0, 10);
    let pos = 0, gewusst = 0;
    const zeige = () => {
      if (pos >= runde.length) return fertig();
      const k = runde[pos];
      const rueckseite = h("div.karte-hinten",
        k.plural ? h("p", h("span.leise", "Plural: "), h("b", k.plural)) : null,
        k.form ? h("p", h("b", k.form)) : null,
        k.beispiel ? h("p.karte-beispiel", "„" + k.beispiel + "“") : null,
        h("div.reihe", { style: { justifyContent: "center" } },
          h("button.btn", { onclick: async () => { await setzeFach(k.i, 1); pos++; zeige(); } }, icon("x", 18), "Noch nicht"),
          h("button.btn.primaer", { onclick: async () => { gewusst++; await setzeFach(k.i, Math.min(FAECHER, (fach(k.i) || 0) + 1)); pos++; zeige(); } }, icon("check", 18), "Wusste ich")));
      const karte = h("div.karte",
        h("div.karte-kopf", h("span", `${pos + 1} / ${runde.length}`), h("span.chip", fach(k.i) ? `Fach ${fach(k.i)}` : "neu")),
        k.bild ? h("div.karte-bild", k.bild) : null,
        h("div.karte-wort", k.wort),
        h("button.btn.leicht.klein", { onclick: () => sprich([k.wort, k.beispiel].filter(Boolean).join(". ")) }, "🔊 Anhören"),
        h("p.leise", { style: { margin: 0 } }, k.plural ? "Wie heißt der Plural? Kennst du ein Beispiel?" : "Was bedeutet das? Wie benutzt man es?"));
      const umdrehen = h("button.btn.primaer.gross", { onclick: () => { umdrehen.replaceWith(rueckseite); karte.classList.add("offen"); } }, "Umdrehen");
      mount(flaeche, h("div.karte-buehne", karte, umdrehen));
    };
    const fertig = async () => {
      if (istTn) await store.push(ctx.schule(`ergebnisse/${session.studentId}`), { aktivitaet: "ws-karteikasten", modul: niveau, fertigkeit: "wortschatz", punkte: gewusst, max: runde.length, ts: Date.now() }).catch(() => {});
      mount(flaeche, h("div.ergebnis", h("h2", "Runde geschafft"), h("p.ergebnis-zahl", h("b", `${gewusst} von ${runde.length}`), " gewusst"),
        h("div.reihe", { style: { justifyContent: "center" } }, h("button.btn", { onclick: uebersicht }, "Zum Kasten"), h("button.btn.primaer", { onclick: ueben }, "Nächste 10 Karten"))));
    };
    zeige();
  }

  ctx.render(
    h("a.zurueck", { href: "#/bereich/wortschatz" }, icon("arrowL", 18), "Wortschatz-Trainer"),
    h("header.seitenkopf", h("div", h("h1", "Karteikasten"), h("p", "Wörter mit Artikel, Plural und Beispielsatz. Schau dir die Karte an, überleg und dreh sie um."))),
    flaeche);
  await lade();
  uebersicht();
}
