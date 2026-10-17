/* Lehrkraft: Klassenliste */
import { h, icon, datumKurz, isoTag, anzahl } from "../../core/ui.js";
import { meineKlassen, tnDerKlasse } from "../../core/daten.js";
import { klasseDialog } from "./klassen-formular.js";

export default async function (ctx) {
  const S = ctx.schule();
  const box = h("div");
  let students = await ctx.store.get(S + "/students");
  ctx.on(S + "/students", (v) => { students = v; });
  ctx.on(S + "/klassen", (roh) => {
    const klassen = meineKlassen(roh, ctx.session);
    const heute = isoTag();
    const aktiv = klassen.filter((k) => !k.ende || k.ende >= heute);
    const vorbei = klassen.filter((k) => k.ende && k.ende < heute);
    const zeile = (k) => h("li.klickbar", { onclick: () => (location.hash = "#/klasse/" + k.id) },
      h("span.niveau." + k.niveau, k.niveau),
      h("div.wachsen",
        h("div.titel", k.name),
        h("div.unter", [k.kursart, k.zeit, `${datumKurz(k.start)} bis ${k.ende ? datumKurz(k.ende) : "offen"}`].filter(Boolean).join(", "))),
      h("span.chip", anzahl(tnDerKlasse(students, k.id, false).length, "Person", "Personen")),
      k.pruefung && k.pruefung !== "keine" ? h("span.chip.petrol", "Ziel " + k.pruefung) : null,
      icon("arrowR"));
    box.replaceChildren(
      aktiv.length ? h("ul.liste", aktiv.map(zeile)) : h("div.flaeche.leer", h("p", "Sie haben noch keine laufende Klasse."), h("button.btn.primaer", { onclick: neu }, icon("plus"), "Klasse anlegen")),
      vorbei.length ? h("section.abschnitt", h("h2", "Abgeschlossen"), h("ul.liste", vorbei.map(zeile))) : null);
  });
  async function neu() { const id = await klasseDialog(ctx); if (id) location.hash = "#/klasse/" + id; }
  ctx.render(
    h("header.seitenkopf", h("div", h("h1", "Klassen"), h("p", ctx.session.admin ? "Alle Klassen der Schule." : "Die Klassen, die Sie unterrichten.")),
      h("button.btn.primaer", { onclick: neu }, icon("plus"), "Neue Klasse")),
    box);
}
