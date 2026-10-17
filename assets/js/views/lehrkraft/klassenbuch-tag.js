/* Lehrkraft: Klassenbuch – ein Tag (Anwesenheit, Thema, Hausaufgabe) */
import { h, icon, mount, isoTag, ausIso, datumLang, uhrzeit, toast, dialog } from "../../core/ui.js";
import { tnDerKlasse, istUnterrichtstag } from "../../core/daten.js";
import { STATUS } from "../../core/auswertung.js";

const REIHENFOLGE = [["da", "da", "anwesend"], ["spaet", "spaet", "verspätet"], ["frueh", "frueh", "früher gegangen"], ["entsch", "entsch", "entschuldigt"], ["fehlt", "fehlt", "unentschuldigt"]];

export default async function (ctx) {
  const { store, params } = ctx;
  const S = ctx.schule();
  const { kid, datum } = params;
  let klasse = null, students = {}, eintrag = null, tag = {}, buchAlle = {};
  const koerper = h("div");
  let fokusVorher = null;

  const nachbarTag = (richtung) => {
    const d = ausIso(datum);
    for (let i = 0; i < 60; i++) {
      d.setDate(d.getDate() + richtung);
      const t = isoTag(d);
      if (klasse && (t < klasse.start || (klasse.ende && t > klasse.ende))) return null;
      if (istUnterrichtstag(klasse, t, buchAlle[t])) return t;
    }
    return null;
  };

  async function setzeStatus(stid, status) {
    const alt = tag[stid] || {};
    const neu = { ...alt, status, bestaetigt: true };
    if (status !== "spaet" && status !== "frueh") delete neu.notiz;
    if (alt.status === status && alt.bestaetigt !== false) { await store.remove(`${S}/anwesenheit/${kid}/${datum}/${stid}`); return; }
    await store.set(`${S}/anwesenheit/${kid}/${datum}/${stid}`, neu);
  }

  function zeichne() {
    if (!klasse) return;
    // Fokus erhalten, falls gerade getippt wird
    const ae = document.activeElement;
    if (ae && koerper.contains(ae) && ae.matches("input,textarea")) { fokusVorher = ae.name; return; }
    const tn = tnDerKlasse(students, kid);
    const unterricht = istUnterrichtstag(klasse, datum, eintrag);
    const ausfall = eintrag && eintrag.unterricht === false;
    const zurueck = nachbarTag(-1), vor = nachbarTag(1);
    const offen = tn.filter((s) => tag[s.id] && tag[s.id].bestaetigt === false);
    const ohne = tn.filter((s) => !tag[s.id] || !tag[s.id].status);
    const zahl = (st) => tn.filter((s) => tag[s.id] && tag[s.id].status === st).length;

    const speichereFeld = async (feld, wert) => {
      await store.update(`${S}/klassenbuch/${kid}/${datum}`, { [feld]: wert, unterricht: true });
    };
    const feld = (name, label, opts = {}) => h("label.feld", label,
      h(opts.mehrzeilig ? "textarea" : "input", { name, type: opts.typ || "text", value: (eintrag && eintrag[name]) ?? "", placeholder: opts.platz || "", rows: 2,
        onchange: async (e) => { await speichereFeld(name, opts.typ === "number" ? Number(e.target.value) || 0 : e.target.value.trim()); toast("Gespeichert"); },
        onblur: () => { fokusVorher = null; setTimeout(zeichne, 0); } }));

    mount(koerper,
      h("a.zurueck", { href: "#/klassenbuch/" + kid }, icon("arrowL", 18), "Klassenbuch " + klasse.name),
      h("header.seitenkopf",
        h("div", h("h1", datumLang(datum)), h("p", `${klasse.name}${klasse.zeit ? ", " + klasse.zeit : ""}${datum === isoTag() ? " (heute)" : ""}`)),
        h("div.reihe",
          h("a.btn" + (zurueck ? "" : ".deaktiviert"), { href: zurueck ? `#/klassenbuch/${kid}/${zurueck}` : null, "aria-disabled": String(!zurueck) }, icon("arrowL", 18), "Voriger Tag"),
          h("a.btn" + (vor ? "" : ".deaktiviert"), { href: vor ? `#/klassenbuch/${kid}/${vor}` : null, "aria-disabled": String(!vor) }, "Nächster Tag", icon("arrowR", 18)))),

      ausfall ? h("div.flaeche.reihe.zwischen",
        h("div", h("strong", "Der Unterricht fällt aus."), h("p.leise", { style: { margin: 0 } }, eintrag.grund || "")),
        h("button.btn", { onclick: async () => { await store.set(`${S}/klassenbuch/${kid}/${datum}`, { unterricht: true }); } }, "Doch Unterricht"))
      : !unterricht ? h("div.flaeche.reihe.zwischen",
        h("div", h("strong", "An diesem Tag ist laut Plan kein Unterricht.")),
        h("button.btn", { onclick: async () => { await store.update(`${S}/klassenbuch/${kid}/${datum}`, { unterricht: true }); } }, "Zusätzlichen Unterricht eintragen"))
      : h("div.raster-2",
        h("section",
          h("div.reihe.zwischen", { style: { marginBottom: ".7rem" } },
            h("h2", { style: { margin: 0 } }, "Anwesenheit"),
            h("div.reihe",
              offen.length ? h("button.btn.primaer.klein", { onclick: async () => {
                const upd = {}; for (const s of offen) upd[`${s.id}/bestaetigt`] = true;
                await store.update(`${S}/anwesenheit/${kid}/${datum}`, upd); toast(`${offen.length} Check-ins bestätigt`);
              } }, icon("check", 18), `${offen.length} Check-ins bestätigen`) : null,
              ohne.length && ohne.length < tn.length ? h("button.btn.klein", { onclick: async () => {
                const upd = {}; for (const s of ohne) upd[s.id] = { status: "fehlt", bestaetigt: true };
                await store.update(`${S}/anwesenheit/${kid}/${datum}`, upd); toast("Rest als fehlend eingetragen");
              } }, "Rest: fehlt") : null,
              ohne.length === tn.length && tn.length ? h("button.btn.klein", { onclick: async () => {
                const upd = {}; for (const s of tn) upd[s.id] = { status: "da", bestaetigt: true };
                await store.update(`${S}/anwesenheit/${kid}/${datum}`, upd); toast("Alle als anwesend eingetragen");
              } }, "Alle da") : null)),
          h("p.klein.leise", `${zahl("da") + zahl("spaet") + zahl("frueh")} von ${tn.length} anwesend, ${zahl("entsch")} entschuldigt, ${zahl("fehlt")} unentschuldigt, ${ohne.length} noch offen`),
          tn.length ? h("ul.liste.anw", tn.map((s) => {
            const e = tag[s.id] || {};
            return h("li" + (e.bestaetigt === false ? ".eingecheckt" : ""),
              h("div.avatar", s.vorname[0]),
              h("div.wachsen",
                h("div.titel", s.vorname, s.gast ? h("span.chip", { style: { marginLeft: ".4rem" } }, "Gast") : null),
                h("div.unter",
                  e.bestaetigt === false ? h("span", { style: { color: "var(--mittel)", fontWeight: 700 } }, `Eingecheckt um ${uhrzeit(e.ein)}, bitte bestätigen`)
                  : e.ein ? `Eingecheckt um ${uhrzeit(e.ein)}` : e.status ? STATUS[e.status].text : "noch nicht erfasst"),
                (e.status === "spaet" || e.status === "frueh") ? h("input.notiz", { name: "notiz_" + s.id, type: "text", value: e.notiz || "", placeholder: e.status === "spaet" ? "z. B. 20 Min. später" : "z. B. ab 11:30 weg",
                  onchange: async (ev) => { await store.set(`${S}/anwesenheit/${kid}/${datum}/${s.id}/notiz`, ev.target.value.trim() || null); },
                  onblur: () => { fokusVorher = null; setTimeout(zeichne, 0); } }) : null),
              h("div.segment", { role: "group", "aria-label": `Anwesenheit ${s.vorname}` },
                REIHENFOLGE.map(([st, cls, text]) => h("button." + cls, { type: "button", title: text, "aria-label": text, "aria-pressed": String(e.status === st && e.bestaetigt !== false), onclick: () => setzeStatus(s.id, st) }, STATUS[st].kurz))));
          })) : h("div.flaeche.leer", "Noch niemand in der Klasse.")),
        h("section.flaeche",
          h("h2", "Unterricht"),
          h("div.formular",
            feld("thema", "Thema", { platz: "Was haben Sie heute gemacht?", mehrzeilig: true }),
            feld("hausaufgabe", "Hausaufgabe", { platz: "optional" }),
            feld("ue", "Unterrichtseinheiten", { typ: "number" }),
            h("button.btn.leicht", { style: { justifySelf: "start" }, onclick: async () => {
              const inp = h("input", { type: "text", name: "grund", value: "Feiertag" });
              const ok = await dialog({ titel: "Unterricht fällt aus", inhalt: h("label.feld", "Grund", h("span.hinweis", "Erscheint im Kalender und auf der Startseite der Lernenden."), inp),
                aktionen: [{ text: "Abbrechen", wert: false }, { text: "Ausfall eintragen", primaer: true, submit: true, wert: true }] });
              if (!ok) return;
              await store.set(`${S}/klassenbuch/${kid}/${datum}`, { unterricht: false, grund: inp.value.trim() || "fällt aus" });
            } }, "Unterricht fällt aus")))));
  }

  buchAlle = (await store.get(`${S}/klassenbuch/${kid}`)) || {};
  ctx.on(`${S}/klassen/${kid}`, (v) => { klasse = v; zeichne(); });
  ctx.on(`${S}/students`, (v) => { students = v || {}; zeichne(); });
  ctx.on(`${S}/klassenbuch/${kid}/${datum}`, (v) => { eintrag = v; buchAlle[datum] = v; zeichne(); });
  ctx.on(`${S}/anwesenheit/${kid}/${datum}`, (v) => { tag = v || {}; zeichne(); });
  ctx.render(koerper);
}
