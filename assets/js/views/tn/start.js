/* Lernende: Startseite mit Einchecken */
import { h, icon, mount, isoTag, ausIso, datumLang, datumKurz, uhrzeit, toast } from "../../core/ui.js";
import { istUnterrichtstag } from "../../core/daten.js";
import { ergebnisListe, fertigkeiten, ampel } from "../../core/auswertung.js";
import { BEREICHE, AKTIVITAETEN, FERTIGKEITEN } from "../../data/katalog.js";

export default async function (ctx) {
  const { store, session } = ctx;
  const S = ctx.schule();
  const kid = session.klasseId;
  const heute = isoTag();
  const klasse = await store.get(`${S}/klassen/${kid}`);
  const checkin = h("div");
  const aufgabe = h("div");
  const stand = h("div");
  let buch = {}, meinHeute = null;

  function naechsterTag() {
    const d = ausIso(heute);
    for (let i = 0; i < 30; i++) { d.setDate(d.getDate() + 1); const t = isoTag(d); if (istUnterrichtstag(klasse, t, buch[t])) return t; }
    return null;
  }

  function zeichneCheckin() {
    if (!klasse) { mount(checkin); return; }
    const e = buch[heute];
    if (e && e.unterricht === false) {
      mount(checkin, h("div.checkin.ausfall", h("div", h("h2", "Heute kein Unterricht"), h("p", e.grund || "Der Unterricht fällt aus."))));
      return;
    }
    if (!istUnterrichtstag(klasse, heute, e)) {
      const n = naechsterTag();
      mount(checkin, h("div.checkin.ruhig", icon("calendar", 28), h("div", h("h2", "Heute ist kein Unterricht"), h("p", n ? `Nächster Termin: ${datumLang(n)}${klasse.zeit ? ", " + klasse.zeit : ""}.` : "Gerade sind keine Termine eingetragen."))));
      return;
    }
    const m = meinHeute;
    if (m && m.status) {
      const bestaetigt = m.bestaetigt !== false;
      const text = m.status === "da" || m.status === "spaet"
        ? (bestaetigt ? (m.ein ? `Eingecheckt um ${uhrzeit(m.ein)}. Deine Lehrkraft hat es bestätigt.` : "Deine Lehrkraft hat dich als anwesend eingetragen.") : `Eingecheckt um ${uhrzeit(m.ein)}. Deine Lehrkraft bestätigt das gleich.`)
        : m.status === "entsch" ? "Du bist heute entschuldigt." : m.status === "fehlt" ? "Du bist heute als fehlend eingetragen. Bist du doch da? Sag es deiner Lehrkraft." : "Deine Lehrkraft hat deine Anwesenheit eingetragen.";
      mount(checkin, h("div.checkin" + (bestaetigt ? ".fertig" : ".wartet"),
        h("div.checkin-haken", icon(bestaetigt ? "check" : "clock", 30)),
        h("div", h("h2", bestaetigt ? "Du bist eingetragen" : "Du bist eingecheckt"), h("p", text))));
      return;
    }
    mount(checkin, h("div.checkin",
      h("div", h("h2", "Heute ist Unterricht"), h("p", [klasse.zeit, klasse.raum].filter(Boolean).join(", ") || "Bist du da?")),
      h("button.btn.primaer.gross", { onclick: async (ev) => {
        const btn = ev.currentTarget;
        btn.disabled = true;
        try {
          await store.set(`${S}/anwesenheit/${kid}/${heute}/${session.studentId}`, { status: "da", ein: Date.now(), bestaetigt: false });
          toast("Eingecheckt");
        } catch (err) { toast("Einchecken ging nicht: " + err.message, "fehler"); btn.disabled = false; }
      } }, icon("check", 22), "Ich bin da")));
  }

  function zeichneAufgabe() {
    const tage = Object.keys(buch).filter((t) => t <= heute && buch[t] && buch[t].unterricht !== false && buch[t].hausaufgabe).sort();
    const t = tage[tage.length - 1];
    mount(aufgabe, t ? h("div.flaeche.hausaufgabe",
      h("div.reihe.zwischen", h("h2", { style: { margin: 0 } }, "Hausaufgabe"), h("span.chip", "vom " + datumKurz(t))),
      h("p", { style: { margin: ".5rem 0 0", fontSize: "1.08rem" } }, buch[t].hausaufgabe),
      buch[t].thema ? h("p.klein.leise", { style: { margin: ".3rem 0 0" } }, "Thema: " + buch[t].thema) : null) : null);
  }

  ctx.on(`${S}/klassenbuch/${kid}`, (v) => { buch = v || {}; zeichneCheckin(); zeichneAufgabe(); });
  ctx.on(`${S}/anwesenheit/${kid}/${heute}/${session.studentId}`, (v) => { meinHeute = v; zeichneCheckin(); });
  ctx.on(`${S}/ergebnisse/${session.studentId}`, (v) => {
    const erg = ergebnisListe(v);
    const f = fertigkeiten(erg);
    const staerkste = Object.entries(f).filter(([, x]) => x).sort((a, b) => b[1].prozent - a[1].prozent);
    mount(stand, h("a.flaeche.stand", { href: "#/fortschritt" },
      h("div", h("h2", "Mein Fortschritt"),
        erg.length ? h("p", `${erg.length} Übungen gemacht.${staerkste.length ? ` Am stärksten: ${FERTIGKEITEN[staerkste[0][0]]}.` : ""}`) : h("p", "Noch keine Übung. Fang einfach an!")),
      h("div.mini-balken", Object.keys(FERTIGKEITEN).map((k) => h("span." + ampel(f[k] && f[k].prozent), { style: { height: (f[k] ? Math.max(8, f[k].prozent) : 4) + "%" }, title: `${FERTIGKEITEN[k]}: ${f[k] ? f[k].prozent + " %" : "–"}` }))),
      icon("arrowR")));
  });

  const niveau = klasse ? klasse.niveau : "A1";
  ctx.render(
    h("header.seitenkopf", h("div", h("h1", `Hallo ${session.name}!`), h("p", klasse ? `${klasse.name}, Niveau ${niveau}` : ""))),
    checkin,
    h("div.raster-2", { style: { marginTop: "1rem" } }, aufgabe, stand),
    h("section.abschnitt",
      h("h2", "Üben"),
      h("div.bereich-kacheln", BEREICHE.map((b) => {
        const n = AKTIVITAETEN.filter((a) => a.bereich === b.id).length;
        return h("a.bereich-kachel", { href: "#/bereich/" + b.id },
          h("span.ic-rund", icon(b.icon, 22)),
          h("span.bk-text", h("strong", b.titel), h("span", b.text)),
          h("span.chip", n));
      }))));
}
