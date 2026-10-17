/* Ein Modul spielen und das Ergebnis speichern */
import { h, icon, mount, prozent, toast } from "../core/ui.js";
import { aktivitaet } from "../data/katalog.js";
import { ladePaket } from "../data/inhalte/index.js";
import { spielen } from "../spiel/engine.js";

export function sterne(p) { return p >= 90 ? 3 : p >= 70 ? 2 : p >= 50 ? 1 : 0; }

export function ergebnisBild({ punkte, max, titel, text, aktionen, einheit = "richtig" }) {
  const p = prozent(punkte, max);
  const s = sterne(p);
  return h("div.ergebnis",
    h("div.ergebnis-sterne", { "aria-label": `${s} von 3 Sternen` }, [0, 1, 2].map((i) => h("span" + (i < s ? ".an" : ""), { style: { "--i": i } }, "★"))),
    h("h2", titel || (p >= 90 ? "Ausgezeichnet!" : p >= 70 ? "Gut gemacht!" : p >= 50 ? "Geschafft!" : "Weiter üben!")),
    h("p.ergebnis-zahl", h("b", `${punkte} von ${max}`), ` ${einheit} (${p} %)`),
    text ? h("p.leise", text) : null,
    h("div.reihe", { style: { justifyContent: "center" } }, aktionen));
}

export default async function (ctx) {
  const { store, session, params } = ctx;
  const { aid, mid } = params;
  const paket = await ladePaket(aid);
  const idx = paket.module.findIndex((m) => m.id === mid);
  const modul = paket.module[idx];
  if (!modul) { ctx.render(h("h1", "Teil nicht gefunden")); return; }
  const naechstes = paket.module[idx + 1];
  const akt = aktivitaet(aid);
  const istTn = session.rolle === "tn";
  const flaeche = h("div");

  const ende = async (punkte, max) => {
    const p = prozent(punkte, max);
    if (istTn && max > 0) {
      try {
        await store.push(ctx.schule(`ergebnisse/${session.studentId}`), {
          aktivitaet: aid, modul: mid, fertigkeit: modul.fertigkeit || (akt && akt.fertigkeit) || "wortschatz", punkte, max, ts: Date.now(),
        });
      } catch (e) { toast("Ergebnis konnte nicht gespeichert werden", "fehler"); }
    }
    const liga = aid.startsWith("ar-");
    mount(flaeche, ergebnisBild({
      punkte, max,
      text: !istTn ? "Vorschau: Ergebnisse von Lehrkräften werden nicht gespeichert." : liga && naechstes ? (p >= 70 ? `Aufgestiegen! Die Liga „${naechstes.titel}“ ist frei.` : "Ab 70 % steigst du in die nächste Liga auf.") : "Dein Ergebnis ist gespeichert. Deine Lehrkraft sieht es.",
      aktionen: [
        h("button.btn", { onclick: () => starten() }, "Noch einmal"),
        naechstes && (!liga || p >= 70 || !istTn) ? h("a.btn.primaer", { href: `#/spiel/${aid}/${naechstes.id}` }, "Weiter: " + naechstes.titel) : null,
        h("a.btn" + (naechstes ? "" : ".primaer"), { href: "#/paket/" + aid }, "Zur Übersicht"),
      ],
    }));
  };
  function starten() { spielen(flaeche, { aufgaben: modul.aufgaben, titel: modul.titel, onEnde: ende }); }

  ctx.render(
    h("a.zurueck", { href: "#/paket/" + aid }, icon("arrowL", 18), paket.titel),
    flaeche);
  starten();
}
