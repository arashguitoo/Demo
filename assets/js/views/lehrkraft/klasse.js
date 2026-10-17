/* Lehrkraft: eine Klasse – Teilnehmende, Ergebnisse, Einstellungen */
import { h, icon, mount, datumKurz, isoTag, toast, bestaetigen, kopieren, seit, dialog, esc } from "../../core/ui.js";
import { tnDerKlasse, liste } from "../../core/daten.js";
import { unterrichtstage, anwesenheit, fertigkeiten, ergebnisListe, ampel, prognoseDTZ, prognoseDTB } from "../../core/auswertung.js";
import { FERTIGKEITEN } from "../../data/katalog.js";
import { makeCode } from "../../core/session.js";
import { newKey } from "../../core/store.js";
import { klasseDialog } from "./klassen-formular.js";
import { APP } from "../../config.js";

export async function neuerCode(store) {
  for (let i = 0; i < 20; i++) { const c = makeCode(6); if (!(await store.get("codes/" + c))) return c; }
  throw new Error("Kein freier Code gefunden.");
}

export function zugangskartenDrucken(klasse, tn) {
  const url = location.href.replace(/app\.html.*$/, "index.html");
  const w = window.open("", "_blank");
  if (!w) { toast("Bitte Pop-ups erlauben, um zu drucken.", "fehler"); return; }
  w.document.write(`<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Zugangskarten ${esc(klasse.name)}</title>
  <style>body{font-family:Calibri,"Segoe UI",sans-serif;margin:0;padding:12mm;color:#18262f}
  .k{display:grid;grid-template-columns:repeat(2,1fr);gap:6mm}.c{border:1.2px dashed #9aa8b1;border-radius:4mm;padding:5mm 6mm;break-inside:avoid}
  .n{font-size:15pt;font-weight:700}.code{font-size:24pt;font-weight:800;letter-spacing:.18em;margin:2mm 0 3mm;color:#0b6b70}
  ol{margin:0;padding-left:5mm;font-size:10.5pt;line-height:1.45}.u{font-size:9pt;color:#555;margin-top:2mm;word-break:break-all}
  h1{font-size:13pt;margin:0 0 5mm}</style></head><body>
  <h1>${esc(APP.name)}: Zugangskarten für ${esc(klasse.name)}</h1><div class="k">
  ${tn.map((s) => `<div class="c"><div class="n">${esc(s.vorname)}</div><div class="code">${esc(s.code)}</div>
  <ol><li>Öffne die Seite unten im Browser am Handy oder Computer.</li><li>Tippe auf „Ich lerne“ und gib deinen Code ein.</li><li>Den Code nicht weitergeben. Er ist nur für dich.</li></ol>
  <div class="u">${esc(url)}</div></div>`).join("")}</div>
  <script>window.onload=()=>setTimeout(()=>window.print(),200)<\/script></body></html>`);
  w.document.close();
}

export default async function (ctx) {
  const { store, params } = ctx;
  const S = ctx.schule();
  const kid = params.kid;
  let klasse = null, students = {}, buch = {}, anw = {}, erg = {}, lehrer = {};
  let reiter = ctx.query.get("reiter") || "tn";
  const koerper = h("div");
  const kopf = h("div");

  const zeichne = () => {
    if (!klasse) { ctx.render(h("h1", "Klasse nicht gefunden"), h("a", { href: "#/klassen" }, "Zu den Klassen")); return; }
    mount(kopf,
      h("a.zurueck.kein-druck", { href: "#/klassen" }, icon("arrowL", 18), "Klassen"),
      h("header.seitenkopf",
        h("div", h("div.reihe", h("span.niveau." + klasse.niveau, klasse.niveau), h("h1", klasse.name)),
          h("p", [klasse.kursart, klasse.zeit, klasse.raum, `${datumKurz(klasse.start)} bis ${klasse.ende ? datumKurz(klasse.ende) : "offen"}`].filter(Boolean).join(", "))),
        h("div.reihe.kein-druck",
          h("a.btn", { href: `#/klassenbuch/${kid}` }, icon("book"), "Klassenbuch"),
          h("a.btn.primaer", { href: `#/klassenbuch/${kid}/${isoTag()}` }, icon("check"), "Anwesenheit heute"))),
      h("div.reiter.kein-druck", { role: "tablist" },
        [["tn", "Teilnehmende"], ["ergebnisse", "Ergebnisse"], ["einstellungen", "Einstellungen"]].map(([id, t]) =>
          h("button", { role: "tab", "aria-selected": String(reiter === id), onclick: () => { reiter = id; history.replaceState(null, "", `#/klasse/${kid}?reiter=${id}`); zeichne(); } }, t))));
    mount(koerper, reiter === "tn" ? tnAnsicht() : reiter === "ergebnisse" ? ergebnisAnsicht() : einstellungen());
  };

  function tnAnsicht() {
    const tn = tnDerKlasse(students, kid);
    const tage = unterrichtstage(klasse, buch, isoTag(new Date(Date.now() - 864e5)));
    const eingabe = h("input", { type: "text", placeholder: "Vorname, mehrere mit Komma trennen", "aria-label": "Vorname" });
    const form = h("form.reihe", { style: { marginBottom: "1rem" }, onsubmit: async (e) => {
      e.preventDefault();
      const namen = eingabe.value.split(",").map((x) => x.trim()).filter(Boolean);
      if (!namen.length) return;
      const upd = {};
      for (const vn of namen) {
        const c = await neuerCode(store); const id = "t_" + newKey();
        upd[`${S}/students/${id}`] = { vorname: vn.slice(0, 40), klasseId: kid, code: c, aktiv: true, erstellt: Date.now() };
        upd[`codes/${c}`] = { schoolId: ctx.session.schoolId, studentId: id };
      }
      await store.update("", upd);
      eingabe.value = "";
      toast(namen.length === 1 ? `${namen[0]} hinzugefügt` : `${namen.length} Personen hinzugefügt`);
    } }, h("div", { style: { flex: "1 1 260px" } }, eingabe), h("button.btn.primaer", { type: "submit" }, icon("plus"), "Hinzufügen"),
      tn.length ? h("button.btn", { type: "button", onclick: () => zugangskartenDrucken(klasse, tn) }, icon("print"), "Zugangskarten drucken") : null);

    if (!tn.length) return h("div", form, h("div.flaeche.leer", "Noch niemand in dieser Klasse. Tragen Sie oben die Vornamen ein. Jede Person bekommt automatisch einen Code."));
    return h("div", form, h("div.tabelle-wrap", h("table.tabelle",
      h("thead", h("tr", h("th", "Name"), h("th", "Code"), h("th.zahl", "Anwesenheit"), h("th.zahl", "Übungen"), h("th", "Zuletzt aktiv"), h("th", h("span.versteckt", "Aktionen")))),
      h("tbody", tn.map((s) => {
        const a = anwesenheit(s.id, tage, anw);
        const e = ergebnisListe(erg[s.id]);
        const schnitt = e.length ? Math.round(e.slice(0, 20).reduce((x, y) => x + y.punkte / y.max, 0) / Math.min(e.length, 20) * 100) : null;
        return h("tr",
          h("td", h("a", { href: "#/tn/" + s.id, style: { fontWeight: 700 } }, s.vorname), s.gast ? h("span.chip", { style: { marginLeft: ".4rem" } }, "Gastzugang") : null),
          h("td", h("button.btn.leicht.klein", { title: "Code kopieren", onclick: () => kopieren(s.code), style: { letterSpacing: ".12em", fontWeight: 800 } }, s.code)),
          h("td.zahl", a.quote == null ? "–" : h("span.chip." + (a.quote >= 90 ? "gut" : a.quote >= 80 ? "mittel" : "schlecht"), a.quote + " %")),
          h("td.zahl", schnitt == null ? "–" : h("span", `${e.length}, Ø ${schnitt} %`)),
          h("td", e.length ? seit(e[0].ts) : "noch nie"),
          h("td", h("div.reihe", { style: { flexWrap: "nowrap", gap: ".2rem" } },
            h("button.icon-btn", { title: "Neuen Code vergeben", "aria-label": `Neuen Code für ${s.vorname}`, onclick: () => codeNeu(s) }, icon("key", 18)),
            h("button.icon-btn", { title: "Aus der Klasse entfernen", "aria-label": `${s.vorname} entfernen`, onclick: () => entfernen(s) }, icon("trash", 18)))));
      })))));
  }

  async function codeNeu(s) {
    if (!(await bestaetigen("Neuen Code vergeben?", `${s.vorname} bekommt einen neuen Code. Der alte Code ${s.code} funktioniert danach nicht mehr.`, "Neuen Code vergeben"))) return;
    const c = await neuerCode(store);
    await store.update("", { [`codes/${s.code}`]: null, [`codes/${c}`]: { schoolId: ctx.session.schoolId, studentId: s.id }, [`${S}/students/${s.id}/code`]: c });
    toast(`Neuer Code für ${s.vorname}: ${c}`);
  }
  async function entfernen(s) {
    if (!(await bestaetigen(`${s.vorname} entfernen?`, "Der Code wird gesperrt. Anwesenheit und Ergebnisse bleiben im Klassenbuch erhalten.", "Entfernen", true))) return;
    await store.update("", { [`codes/${s.code}`]: null, [`${S}/students/${s.id}/aktiv`]: false });
    toast(`${s.vorname} entfernt`);
  }

  function ergebnisAnsicht() {
    const tn = tnDerKlasse(students, kid, false);
    const fk = Object.keys(FERTIGKEITEN);
    const zelle = (v) => (v ? h("td.zahl", h("span.chip." + ampel(v.prozent), v.prozent + " %")) : h("td.zahl.sehr-leise", "–"));
    const prog = klasse.pruefung === "DTZ" ? prognoseDTZ : klasse.pruefung === "DTB" ? prognoseDTB : null;
    return h("div",
      h("p.leise", "Durchschnitt der letzten Übungen je Fertigkeit. Ein Klick auf den Namen öffnet die Feedbackseite."),
      h("div.tabelle-wrap", h("table.tabelle",
        h("thead", h("tr", h("th", "Name"), fk.map((f) => h("th.zahl", FERTIGKEITEN[f])), prog ? h("th", "Prognose " + klasse.pruefung) : null)),
        h("tbody", tn.map((s) => {
          const e = ergebnisListe(erg[s.id]);
          const f = fertigkeiten(e);
          let pz = null;
          if (prog) { const p = prog(e); pz = p.ergebnis ? h("span.chip." + (/B1|bestanden$/.test(p.ergebnis) && !/nicht/.test(p.ergebnis) ? "gut" : p.ergebnis === "A2" ? "mittel" : "schlecht"), p.ergebnis) : h("span.sehr-leise.klein", "fehlt: " + p.fehlend.join(", ")); }
          return h("tr", h("td", h("a", { href: "#/tn/" + s.id, style: { fontWeight: 700 } }, s.vorname)), fk.map((x) => zelle(f[x])), prog ? h("td", pz) : null);
        })))));
  }

  function einstellungen() {
    const lk = liste(lehrer);
    return h("div.raster-2",
      h("section.flaeche",
        h("h2", "Kursdaten"),
        h("dl", { style: { display: "grid", gridTemplateColumns: "max-content 1fr", gap: ".4rem 1.2rem", margin: "0 0 1rem" } },
          [["Niveau", klasse.niveau], ["Kursart", klasse.kursart], ["Prüfungsziel", klasse.pruefung], ["Uhrzeit", klasse.zeit || "–"], ["Raum", klasse.raum || "–"],
          ["Zeitraum", `${datumKurz(klasse.start)} bis ${klasse.ende ? datumKurz(klasse.ende) : "offen"}`],
          ["Unterrichtstage", (klasse.tage || []).map((d) => ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"][d]).join(", ")]
        ].map(([a, b]) => [h("dt.leise", a), h("dd", { style: { margin: 0, fontWeight: 650 } }, b)])),
        h("button.btn", { onclick: () => klasseDialog(ctx, klasse, kid) }, icon("edit"), "Bearbeiten")),
      h("section.flaeche",
        h("h2", "Lehrkräfte"),
        h("ul", { style: { listStyle: "none", padding: 0, margin: "0 0 1rem", display: "grid", gap: ".5rem" } },
          lk.map((l) => h("li.reihe", h("div.avatar", l.name[0]), h("div", h("div", { style: { fontWeight: 700 } }, l.name), h("div.klein.leise", l.email)),
            ctx.session.admin ? h("label", { style: { marginLeft: "auto" } }, h("input", { type: "checkbox", checked: !!(klasse.lehrkraefte || {})[l.id],
              onchange: async (e) => { await store.set(`${S}/klassen/${kid}/lehrkraefte/${l.id}`, e.target.checked ? true : null); toast("Gespeichert"); } }), " unterrichtet") :
              (klasse.lehrkraefte || {})[l.id] ? h("span.chip.petrol", { style: { marginLeft: "auto" } }, "unterrichtet") : null))),
        ctx.session.admin ? h("p.klein.leise", "Als Schulleitung können Sie Lehrkräfte zuordnen.") : null));
  }

  lehrer = (await store.get(S + "/teachers")) || {};
  erg = (await store.get(S + "/ergebnisse")) || {};
  ctx.on(`${S}/klassen/${kid}`, (v) => { klasse = v; zeichne(); });
  ctx.on(`${S}/students`, (v) => { students = v || {}; if (klasse) zeichne(); });
  ctx.on(`${S}/klassenbuch/${kid}`, (v) => { buch = v || {}; if (klasse) zeichne(); });
  ctx.on(`${S}/anwesenheit/${kid}`, (v) => { anw = v || {}; if (klasse) zeichne(); });
  ctx.render(kopf, koerper);
}
