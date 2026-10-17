/* Bereiche und Aktivitäten (für Lernende und Lehrkräfte) */
import { h, icon, mount } from "../core/ui.js";
import { BEREICHE, AKTIVITAETEN, NIVEAUS, FERTIGKEITEN, bereich as findeBereich } from "../data/katalog.js";
import { pruefeVerfuegbar, route } from "../data/inhalte/index.js";

export default async function (ctx) {
  const { store, session, params } = ctx;
  const istLk = session.rolle === "lehrkraft";

  if (!params.bid) {
    // Übersicht aller Bereiche (Lehrkraft: „Inhalte“)
    ctx.render(
      h("header.seitenkopf", h("div", h("h1", "Inhalte"), h("p", "Alles, was Ihre Lernenden sehen. Neue Pakete kommen laufend dazu."))),
      h("div.bereich-kacheln", BEREICHE.map((b) => h("a.bereich-kachel", { href: "#/bereich/" + b.id },
        h("span.ic-rund", icon(b.icon, 22)), h("span.bk-text", h("strong", b.titel), h("span", b.text)),
        h("span.chip", AKTIVITAETEN.filter((a) => a.bereich === b.id).length)))));
    return;
  }

  const b = findeBereich(params.bid);
  if (!b) { ctx.render(h("h1", "Bereich nicht gefunden")); return; }
  let eigenesNiveau = null;
  if (!istLk) { const k = await store.get(ctx.schule(`klassen/${session.klasseId}`)); eigenesNiveau = k ? k.niveau : null; }
  const akts = AKTIVITAETEN.filter((a) => a.bereich === b.id);
  const istBereit = await pruefeVerfuegbar(akts.map((a) => a.id));
  const ordnung = eigenesNiveau ? [eigenesNiveau, ...NIVEAUS.filter((n) => n !== eigenesNiveau)] : NIVEAUS;

  ctx.render(
    istLk ? h("a.zurueck", { href: "#/inhalte" }, icon("arrowL", 18), "Inhalte") : null,
    h("header.seitenkopf", h("div.reihe", { style: { gap: ".9rem" } }, h("span.ic-rund.gross", icon(b.icon, 26)), h("div", h("h1", b.titel), h("p", b.text)))),
    ordnung.map((n) => {
      const liste = akts.filter((a) => a.niveau === n);
      if (!liste.length) return null;
      return h("section.abschnitt",
        h("h2.reihe", { style: { gap: ".5rem" } }, h("span.niveau." + n, n), n === eigenesNiveau ? "Dein Niveau" : `Niveau ${n}`),
        h("div.akt-liste", liste.map((a) => {
          const bereit = istBereit(a.id);
          const inhalt = [
            h("div.akt-kopf", h("strong", a.titel), a.pruefung ? h("span.chip.petrol", a.pruefung) : null),
            h("p", a.text),
            h("div.akt-fuss", h("span", FERTIGKEITEN[a.fertigkeit]), h("span", `ca. ${a.dauer} Min.`), bereit ? h("span.akt-los", "Starten", icon("arrowR", 18)) : h("span.chip", "In Arbeit")),
          ];
          return bereit ? h("a.akt", { href: route(a.id) }, inhalt) : h("div.akt.bald", { "aria-disabled": "true" }, inhalt);
        })));
    }));
}
