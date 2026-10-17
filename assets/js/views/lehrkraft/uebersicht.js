/* Lehrkraft: Übersicht */
import { h, icon, isoTag, datumLang, seit, prozent, anzahl } from "../../core/ui.js";
import { meineKlassen, tnDerKlasse, istUnterrichtstag, liste } from "../../core/daten.js";
import { unterrichtstage, anwesenheit, fertigkeiten, ergebnisListe, ampel } from "../../core/auswertung.js";
import { aktivitaet, FERTIGKEITEN } from "../../data/katalog.js";

export default async function (ctx) {
  const { store, session } = ctx;
  const S = ctx.schule();
  const [klassenRoh, students, buchAlle, ergebnisseAlle] = await Promise.all([
    store.get(S + "/klassen"), store.get(S + "/students"), store.get(S + "/klassenbuch"), store.get(S + "/ergebnisse"),
  ]);
  const klassen = meineKlassen(klassenRoh, session);
  const heute = isoTag();
  const stunde = new Date().getHours();
  const gruss = stunde < 11 ? "Guten Morgen" : stunde < 18 ? "Guten Tag" : "Guten Abend";

  const heuteBox = h("div");
  const hinweisBox = h("div");
  const kennzahlBox = h("div");

  // Anwesenheit live (Einchecken erscheint sofort)
  ctx.on(S + "/anwesenheit", (anwAlle) => {
    anwAlle = anwAlle || {};
    // Heute
    const heuteKlassen = klassen.filter((k) => istUnterrichtstag(k, heute, (buchAlle?.[k.id] || {})[heute]));
    heuteBox.replaceChildren(heuteKlassen.length
      ? h("ul.liste", heuteKlassen.map((k) => {
          const tn = tnDerKlasse(students, k.id, false);
          const tag = (anwAlle[k.id] || {})[heute] || {};
          const da = tn.filter((s) => tag[s.id] && ["da", "spaet", "frueh"].includes(tag[s.id].status)).length;
          const offen = tn.filter((s) => tag[s.id] && tag[s.id].bestaetigt === false).length;
          return h("li.klickbar", { onclick: () => (location.hash = `#/klassenbuch/${k.id}/${heute}`) },
            h("span.niveau." + k.niveau, k.niveau),
            h("div.wachsen", h("div.titel", k.name), h("div.unter", `${k.zeit || ""}${k.raum ? ", " + k.raum : ""}`)),
            offen ? h("span.chip.mittel", anzahl(offen, "Check-in offen", "Check-ins offen")) : null,
            h("span.chip" + (da ? ".gut" : ""), `${da} von ${tn.length} da`),
            icon("arrowR"));
        }))
      : h("div.flaeche.leer", "Heute ist in Ihren Klassen kein Unterricht."));

    // Kennzahlen + Hinweise
    let tnGesamt = 0, quoteSumme = 0, quoteN = 0;
    const auffaellig = [];
    const wocheGrenze = Date.now() - 7 * 864e5;
    let uebungenWoche = 0;
    for (const k of klassen) {
      const tage = unterrichtstage(k, buchAlle?.[k.id] || {}, heute).filter((t) => t >= isoTag(new Date(Date.now() - 28 * 864e5)));
      for (const s of tnDerKlasse(students, k.id, false)) {
        tnGesamt++;
        const a = anwesenheit(s.id, tage, anwAlle[k.id] || {});
        if (a.quote != null) { quoteSumme += a.quote; quoteN++; }
        const erg = ergebnisListe(ergebnisseAlle?.[s.id]);
        uebungenWoche += erg.filter((e) => e.ts > wocheGrenze).length;
        const f = fertigkeiten(erg);
        const schwach = Object.entries(f).filter(([, v]) => v && v.prozent < 50).map(([n]) => FERTIGKEITEN[n]);
        if ((a.quote != null && a.quote < 80) || schwach.length) auffaellig.push({ s, k, a, schwach });
      }
    }
    kennzahlBox.replaceChildren(h("div.kennzahlen",
      h("div.kennzahl", h("b", klassen.length), h("span", klassen.length === 1 ? "Klasse" : "Klassen")),
      h("div.kennzahl", h("b", tnGesamt), h("span", "Lernende")),
      h("div.kennzahl", h("b", quoteN ? Math.round(quoteSumme / quoteN) + " %" : "–"), h("span", "Anwesenheit, letzte 4 Wochen")),
      h("div.kennzahl", h("b", uebungenWoche), h("span", "Übungen in den letzten 7 Tagen"))));

    auffaellig.sort((x, y) => (x.a.quote ?? 100) - (y.a.quote ?? 100));
    hinweisBox.replaceChildren(auffaellig.length
      ? h("ul.liste", auffaellig.slice(0, 6).map(({ s, k, a, schwach }) => h("li.klickbar", { onclick: () => (location.hash = "#/tn/" + s.id) },
          h("div.avatar", s.vorname[0]),
          h("div.wachsen", h("div.titel", s.vorname), h("div.unter", k.name)),
          a.quote != null && a.quote < 80 ? h("span.chip.schlecht", `Anwesenheit ${a.quote} %`) : null,
          schwach.length ? h("span.chip.mittel", "Unter 50 %: " + schwach.join(", ")) : null)))
      : h("div.flaeche.leer", "Gerade fällt niemand auf. Gut so."));
  });

  // Letzte Aktivitäten
  const namen = Object.fromEntries(liste(students).map((s) => [s.id, s]));
  const meineKids = new Set(klassen.map((k) => k.id));
  const feed = [];
  for (const [stid, erg] of Object.entries(ergebnisseAlle || {})) {
    if (!namen[stid] || !meineKids.has(namen[stid].klasseId)) continue;
    for (const e of ergebnisListe(erg).slice(0, 3)) feed.push({ ...e, stid });
  }
  feed.sort((a, b) => b.ts - a.ts);

  ctx.render(
    h("header.seitenkopf", h("div", h("h1", `${gruss}, ${session.name.split(" ")[0]}`), h("p", datumLang(heute)))),
    kennzahlBox,
    h("section.abschnitt", h("h2", "Heute im Unterricht"), heuteBox),
    h("div.raster-2.abschnitt",
      h("section", h("h2", "Braucht Aufmerksamkeit"), hinweisBox),
      h("section", h("h2", "Zuletzt geübt"),
        feed.length ? h("ul.liste", feed.slice(0, 7).map((e) => {
          const a = aktivitaet(e.aktivitaet); const p = prozent(e.punkte, e.max);
          return h("li", h("div.wachsen", h("div.titel", namen[e.stid].vorname), h("div.unter", (a ? a.titel : e.aktivitaet) + ", " + seit(e.ts))), h("span.chip." + ampel(p), p + " %"));
        })) : h("div.flaeche.leer", "Noch keine Übungen."))));
}
