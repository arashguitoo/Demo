/* Übersicht eines Übungspakets (Module, beste Ergebnisse, Freischaltung in der Liga) */
import { h, icon, prozent } from "../core/ui.js";
import { aktivitaet, bereich, FERTIGKEITEN } from "../data/katalog.js";
import { ladePaket } from "../data/inhalte/index.js";
import { ergebnisListe } from "../core/auswertung.js";
import { vorbereiten, zaehlt } from "../spiel/engine.js";

export const LIGA_FARBEN = { silber: "#8a96a0", gold: "#c39a2c", diamant: "#3b8fb5", meister: "#7a4fa3" };

export function besteWerte(erg, aid) {
  const best = {};
  for (const e of erg) if (e.aktivitaet === aid && e.modul) {
    const p = prozent(e.punkte, e.max);
    if (!best[e.modul] || p > best[e.modul]) best[e.modul] = p;
  }
  return best;
}

export default async function (ctx) {
  const { store, session, params } = ctx;
  const aid = params.aid;
  const akt = aktivitaet(aid);
  const paket = await ladePaket(aid);
  const istTn = session.rolle === "tn";
  const erg = istTn ? ergebnisListe(await store.get(ctx.schule(`ergebnisse/${session.studentId}`))) : [];
  const best = besteWerte(erg, aid);
  const liga = aid.startsWith("ar-");
  const b = akt ? bereich(akt.bereich) : null;

  const module = paket.module.map((m, i) => {
    const offen = !liga || i === 0 || (best[paket.module[i - 1].id] ?? 0) >= 70 || !istTn;
    return { ...m, i, offen, anzahl: vorbereiten(m.aufgaben).filter(zaehlt).length };
  });
  const erledigt = module.filter((m) => best[m.id] != null).length;

  ctx.render(
    b ? h("a.zurueck", { href: "#/bereich/" + b.id }, icon("arrowL", 18), b.titel) : null,
    h("header.seitenkopf",
      h("div", h("div.reihe", h("span.niveau." + paket.niveau, paket.niveau), h("h1", paket.titel)),
        h("p", akt ? akt.text : "")),
      istTn ? h("div.paket-stand", h("b", `${erledigt} von ${module.length}`), h("span", liga ? "Ligen gespielt" : "Teilen geschafft")) : h("span.chip.petrol", "Vorschau für Lehrkräfte")),
    liga ? h("p.leise", "Ab 70 % in einer Liga steigst du in die nächste auf.") : null,
    h("ol.modul-liste" + (liga ? ".liga" : ""), module.map((m) => {
      const wert = best[m.id];
      return h("li", { style: liga ? { "--liga": LIGA_FARBEN[m.id] || "var(--petrol)" } : null, class: m.offen ? "" : "gesperrt" },
        h("span.modul-nr", liga ? icon("trophy", 20) : String(m.i + 1)),
        h("div.wachsen",
          h("div.titel", m.titel),
          h("div.unter", `${FERTIGKEITEN[m.fertigkeit] || ""}, ${m.anzahl} Aufgaben`)),
        wert != null ? h("span.chip." + (wert >= 70 ? "gut" : wert >= 50 ? "mittel" : "schlecht"), `bestes Ergebnis ${wert} %`) : null,
        m.offen ? h("a.btn" + (wert == null ? ".primaer" : ""), { href: `#/spiel/${aid}/${m.id}` }, wert == null ? "Starten" : "Wiederholen")
          : h("span.chip", "noch gesperrt"));
    })));
}
