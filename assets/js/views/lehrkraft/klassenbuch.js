/* Lehrkraft: Klassenbuch – Monatskalender, Inhaltsliste, Anwesenheitsliste */
import { h, icon, mount, isoTag, ausIso, monatName, wochentagKurz, datumKurz, pad } from "../../core/ui.js";
import { meineKlassen, tnDerKlasse, istUnterrichtstag } from "../../core/daten.js";
import { unterrichtstage, anwesenheit, STATUS } from "../../core/auswertung.js";

export default async function (ctx) {
  const { store, params, session } = ctx;
  const S = ctx.schule();
  if (!params.kid) {
    const klassen = meineKlassen(await store.get(S + "/klassen"), session).filter((k) => !k.ende || k.ende >= isoTag());
    if (klassen.length === 1) { location.replace(`#/klassenbuch/${klassen[0].id}`); return; }
    ctx.render(h("header.seitenkopf", h("div", h("h1", "Klassenbuch"), h("p", "Welche Klasse möchten Sie öffnen?"))),
      klassen.length ? h("ul.liste", klassen.map((k) => h("li.klickbar", { onclick: () => (location.hash = `#/klassenbuch/${k.id}`) },
        h("span.niveau." + k.niveau, k.niveau), h("div.wachsen", h("div.titel", k.name), h("div.unter", k.zeit || "")), icon("arrowR"))))
        : h("div.flaeche.leer", "Keine laufende Klasse. ", h("a", { href: "#/klassen" }, "Klasse anlegen")));
    return;
  }
  const kid = params.kid;
  const heute = isoTag();
  let monat = ctx.query.get("monat") ? ausIso(ctx.query.get("monat") + "-01") : new Date();
  monat = new Date(monat.getFullYear(), monat.getMonth(), 1);
  let ansicht = ctx.query.get("ansicht") || "kalender";
  let klasse = null, students = {}, buch = {}, anw = {};
  const koerper = h("div");

  function zeichne() {
    if (!klasse) return;
    const tn = tnDerKlasse(students, kid, false);
    const setzeQ = () => history.replaceState(null, "", `#/klassenbuch/${kid}?ansicht=${ansicht}&monat=${monat.getFullYear()}-${pad(monat.getMonth() + 1)}`);
    const monatsWahl = h("div.reihe",
      h("button.icon-btn", { "aria-label": "Voriger Monat", onclick: () => { monat = new Date(monat.getFullYear(), monat.getMonth() - 1, 1); setzeQ(); zeichne(); } }, icon("arrowL")),
      h("strong", { style: { minWidth: "9.5em", textAlign: "center" } }, `${monatName(monat.getMonth())} ${monat.getFullYear()}`),
      h("button.icon-btn", { "aria-label": "Nächster Monat", onclick: () => { monat = new Date(monat.getFullYear(), monat.getMonth() + 1, 1); setzeQ(); zeichne(); } }, icon("arrowR")));
    const umschalter = h("div.segment.kein-druck", { role: "group", "aria-label": "Ansicht" },
      [["kalender", "Kalender"], ["inhalte", "Inhalte"], ["liste", "Anwesenheitsliste"]].map(([id, t]) =>
        h("button", { "aria-pressed": String(ansicht === id), style: ansicht === id ? { background: "var(--petrol)", color: "#fff" } : null, onclick: () => { ansicht = id; setzeQ(); zeichne(); } }, t)));

    mount(koerper,
      h("a.zurueck.kein-druck", { href: "#/klasse/" + kid }, icon("arrowL", 18), klasse.name),
      h("header.seitenkopf",
        h("div", h("h1", "Klassenbuch"), h("p", `${klasse.name}, ${klasse.zeit || ""}`)),
        h("div.reihe.kein-druck",
          h("button.btn", { onclick: () => window.print() }, icon("print"), "Drucken"),
          istUnterrichtstag(klasse, heute, buch[heute]) ? h("a.btn.primaer", { href: `#/klassenbuch/${kid}/${heute}` }, icon("check"), "Heute eintragen") : null)),
      h("div.reihe.zwischen", { style: { marginBottom: "1rem" } }, monatsWahl, umschalter),
      ansicht === "kalender" ? kalender(tn) : ansicht === "inhalte" ? inhalte() : liste(tn));
  }

  function tageImMonat() {
    const out = [];
    for (let d = new Date(monat); d.getMonth() === monat.getMonth(); d.setDate(d.getDate() + 1)) out.push(isoTag(d));
    return out;
  }

  function kalender(tn) {
    const tage = tageImMonat();
    const zeigeSamstag = (klasse.tage || []).includes(6);
    const spalten = zeigeSamstag ? [1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5];
    const zellen = [];
    const ersterWt = ausIso(tage[0]).getDay();
    const versatz = spalten.indexOf(ersterWt) >= 0 ? spalten.indexOf(ersterWt) : 0;
    for (let i = 0; i < versatz; i++) zellen.push(h("div.kal-zelle.leerzelle"));
    for (const t of tage) {
      const wt = ausIso(t).getDay();
      if (!spalten.includes(wt)) continue;
      const e = buch[t];
      const unterricht = istUnterrichtstag(klasse, t, e);
      const imKurs = t >= klasse.start && (!klasse.ende || t <= klasse.ende);
      const ausfall = e && e.unterricht === false;
      const tag = anw[t] || {};
      const da = tn.filter((s) => tag[s.id] && ["da", "spaet", "frueh"].includes(tag[s.id].status)).length;
      const erfasst = tn.filter((s) => tag[s.id] && tag[s.id].status).length;
      const offen = tn.filter((s) => tag[s.id] && tag[s.id].bestaetigt === false).length;
      const vergangen = t < heute;
      const fehltEintrag = unterricht && vergangen && (erfasst < tn.length || !(e && e.thema));
      const cls = ["kal-zelle", unterricht ? "unterricht" : "", ausfall ? "ausfall" : "", t === heute ? "heute" : "", !imKurs ? "ausserhalb" : ""].filter(Boolean).join(".");
      zellen.push(h("button." + cls, {
        type: "button", disabled: !imKurs && !ausfall,
        "aria-label": `${datumKurz(t)}${unterricht ? ", Unterricht" : ausfall ? ", fällt aus" : ""}`,
        onclick: () => (location.hash = `#/klassenbuch/${kid}/${t}`),
      },
        h("span.kal-datum", ausIso(t).getDate()),
        ausfall ? h("span.kal-text", e.grund || "fällt aus") : null,
        unterricht && e && e.thema ? h("span.kal-text", e.thema) : null,
        unterricht && (vergangen || t === heute) ? h("span.kal-fuss",
          erfasst ? h("span.chip" + (da === tn.length ? ".gut" : ""), `${da}/${tn.length}`) : null,
          offen ? h("span.chip.mittel", `${offen} offen`) : null,
          fehltEintrag ? h("span.kal-warn", { title: "Eintrag unvollständig" }, "!") : null) : null));
    }
    return h("div.kalender", { style: { "--spalten": spalten.length } },
      spalten.map((d) => h("div.kal-kopf", wochentagKurz(d))), zellen);
  }

  function inhalte() {
    const tage = tageImMonat().filter((t) => buch[t] && (buch[t].unterricht !== undefined));
    if (!tage.length) return h("div.flaeche.leer", "In diesem Monat gibt es noch keine Einträge.");
    return h("div.tabelle-wrap", h("table.tabelle",
      h("thead", h("tr", h("th", "Datum"), h("th.zahl", "UE"), h("th", "Thema"), h("th", "Hausaufgabe"))),
      h("tbody", tage.map((t) => {
        const e = buch[t];
        return h("tr", { style: { cursor: "pointer" }, onclick: () => (location.hash = `#/klassenbuch/${kid}/${t}`) },
          h("td", datumKurz(t)),
          h("td.zahl", e.unterricht === false ? "–" : e.ue || ""),
          h("td", { style: { whiteSpace: "normal" } }, e.unterricht === false ? h("span.leise", e.grund || "Unterricht fällt aus") : e.thema || h("span.chip.mittel", "Thema fehlt")),
          h("td", { style: { whiteSpace: "normal" } }, e.hausaufgabe || ""));
      }))));
  }

  function liste(tn) {
    const tage = tageImMonat().filter((t) => istUnterrichtstag(klasse, t, buch[t]) && t <= heute);
    if (!tage.length) return h("div.flaeche.leer", "In diesem Monat gab es noch keinen Unterricht.");
    const kuerzel = { da: "✓", spaet: "V", frueh: "F", entsch: "E", fehlt: "U" };
    const alleTage = unterrichtstage(klasse, buch, heute).filter((t) => t.startsWith(tage[0].slice(0, 7)));
    return h("div",
      h("div.tabelle-wrap", h("table.tabelle.anw-liste",
        h("thead", h("tr", h("th", "Name"), tage.map((t) => h("th.zahl", { title: datumKurz(t) }, ausIso(t).getDate() + ".")), h("th.zahl", "Quote"))),
        h("tbody", tn.map((s) => {
          const a = anwesenheit(s.id, alleTage, anw);
          return h("tr", h("td", { style: { fontWeight: 700 } }, s.vorname),
            tage.map((t) => { const e = (anw[t] || {})[s.id]; return h("td.zahl.anw-" + (e ? e.status : "offen"), { title: e ? STATUS[e.status].text : "nicht erfasst" }, e ? kuerzel[e.status] : "·"); }),
            h("td.zahl", a.quote == null ? "–" : a.quote + " %"));
        })))),
      h("p.klein.leise", { style: { marginTop: ".7rem" } }, "✓ anwesend, V verspätet, F früher gegangen, E entschuldigt, U unentschuldigt, · nicht erfasst"));
  }

  ctx.on(`${S}/klassen/${kid}`, (v) => { klasse = v; zeichne(); });
  ctx.on(`${S}/students`, (v) => { students = v || {}; zeichne(); });
  ctx.on(`${S}/klassenbuch/${kid}`, (v) => { buch = v || {}; zeichne(); });
  ctx.on(`${S}/anwesenheit/${kid}`, (v) => { anw = v || {}; zeichne(); });
  ctx.render(koerper);
}
