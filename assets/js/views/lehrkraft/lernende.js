/* Lehrkraft: alle Lernenden mit Suche → Feedbackseite */
import { h, icon, mount, isoTag, seit } from "../../core/ui.js";
import { meineKlassen, tnDerKlasse } from "../../core/daten.js";
import { ergebnisListe, unterrichtstage, anwesenheit } from "../../core/auswertung.js";

export default async function (ctx) {
  const { store, session } = ctx;
  const S = ctx.schule();
  const [klassenRoh, students, erg, buch, anw] = await Promise.all([
    store.get(S + "/klassen"), store.get(S + "/students"), store.get(S + "/ergebnisse"), store.get(S + "/klassenbuch"), store.get(S + "/anwesenheit")]);
  const klassen = meineKlassen(klassenRoh, session);
  let filter = ctx.query.get("klasse") || "alle", suche = "";
  const box = h("div");
  const gestern = isoTag(new Date(Date.now() - 864e5));

  const zeilen = klassen.flatMap((k) => {
    const tage = unterrichtstage(k, buch?.[k.id] || {}, gestern);
    return tnDerKlasse(students, k.id, false).map((s) => ({ s, k, e: ergebnisListe(erg?.[s.id]), a: anwesenheit(s.id, tage, anw?.[k.id] || {}) }));
  });

  function zeichne() {
    const q = suche.trim().toLowerCase();
    const treffer = zeilen.filter((z) => (filter === "alle" || z.k.id === filter) && (!q || z.s.vorname.toLowerCase().includes(q)));
    mount(box, treffer.length ? h("ul.liste", treffer.map(({ s, k, e, a }) => h("li.klickbar", { onclick: () => (location.hash = "#/tn/" + s.id) },
      h("div.avatar", s.vorname[0]),
      h("div.wachsen", h("div.titel", s.vorname), h("div.unter", k.name)),
      h("span.klein.leise", e.length ? `zuletzt ${seit(e[0].ts)}` : "noch nicht geübt"),
      a.quote != null ? h("span.chip." + (a.quote >= 90 ? "gut" : a.quote >= 80 ? "mittel" : "schlecht"), a.quote + " %") : null,
      icon("arrowR"))))
      : h("div.flaeche.leer", "Niemand gefunden."));
  }

  ctx.render(
    h("header.seitenkopf", h("div", h("h1", "Lernende & Feedback"), h("p", "Öffnen Sie eine Person, um Fortschritt, Anwesenheit und Prognose zu sehen und eine Rückmeldung zu schreiben."))),
    h("div.reihe", { style: { marginBottom: "1rem" } },
      h("div", { style: { flex: "1 1 240px" } }, h("input", { type: "search", placeholder: "Name suchen", "aria-label": "Name suchen", oninput: (e) => { suche = e.target.value; zeichne(); } })),
      h("div", { style: { flex: "0 1 300px" } }, h("select", { "aria-label": "Klasse", onchange: (e) => { filter = e.target.value; zeichne(); } },
        h("option", { value: "alle" }, "Alle Klassen"), klassen.map((k) => h("option", { value: k.id, selected: filter === k.id }, k.name))))),
    box);
  zeichne();
}
