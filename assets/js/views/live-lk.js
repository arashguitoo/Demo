/* ==========================================================
   Live-Quiz – Bildschirm der Lehrkraft (für den Beamer)
   schools/{sid}/live/{raum}: meta {typ:"quiz", satz, phase, frage, frageStart, reihenfolge}
                              spieler/{uid}, antworten/{frage}/{uid} {wahl, ts}
   Phasen: lobby → frage → aufloesung → … → ende
   ========================================================== */
import { h, icon, mount, toast } from "../core/ui.js";
import { QUIZ_SAETZE } from "../data/quiz/saetze.js";
import { mischen } from "../spiel/engine.js";

export const FARBEN = ["#c2410c", "#2b73ad", "#a96f17", "#2f7d4f"];
export const FORMEN = ["▲", "◆", "●", "■"];

/** Punkte je Spieler aus allen Antworten berechnen */
export function punkteStand(meta, antworten, satz) {
  const p = {}, richtig = {};
  for (const [fi, liste] of Object.entries(antworten || {})) {
    const f = meta.fragen[fi]; if (!f) continue;
    const start = (meta.starts || {})[fi] || 0;
    const dauer = satz.sekunden * 1000;
    for (const [uid, a] of Object.entries(liste || {})) {
      p[uid] = p[uid] || 0; richtig[uid] = richtig[uid] || 0;
      if (a.wahl === f.loesung) {
        const rest = Math.max(0, 1 - (a.ts - start) / dauer);
        p[uid] += Math.round(500 + 500 * rest);
        richtig[uid]++;
      }
    }
  }
  return { p, richtig };
}

export default async function (ctx) {
  const { store, session } = ctx;
  const flaeche = h("div");
  ctx.render(
    h("header.seitenkopf.kein-beamer", h("div", h("h1", "Live-Quiz"), h("p", "Fragen am Beamer, Antworten am Handy. Wer schnell und richtig antwortet, bekommt mehr Punkte."))),
    flaeche);

  const raumQ = ctx.query.get("raum");
  if (raumQ && (await store.get(ctx.schule(`live/${raumQ}/meta`)))) return leiten(raumQ);

  mount(flaeche, h("div.quiz-wahl", QUIZ_SAETZE.map((s) => h("section.flaeche",
    h("div.reihe", h("span.niveau." + s.niveau, s.niveau), h("h2", { style: { margin: 0 } }, s.titel)),
    h("p.leise", `${s.fragen.length} Fragen, je ${s.sekunden} Sekunden`),
    h("button.btn.primaer", { onclick: () => eroeffnen(s) }, icon("play", 18), "Raum eröffnen")))));

  async function eroeffnen(satz) {
    let raum = null;
    for (let i = 0; i < 20 && !raum; i++) { const r = String(Math.floor(1000 + Math.random() * 9000)); if (!(await store.get(ctx.schule(`live/${r}/meta`)))) raum = r; }
    // Fragen mit gemischten Optionen festlegen, damit alle dieselbe Reihenfolge sehen
    const fragen = satz.fragen.map((f) => { const opt = mischen(f.optionen); return { frage: f.frage, optionen: opt, loesung: opt.indexOf(f.optionen[0]) }; });
    await store.set(ctx.schule(`live/${raum}/meta`), { typ: "quiz", satz: satz.id, von: session.uid, phase: "lobby", frage: 0, fragen, erstellt: Date.now() });
    history.replaceState(null, "", "#/live?raum=" + raum);
    leiten(raum);
  }

  function leiten(raum) {
    const P = ctx.schule(`live/${raum}`);
    let meta = null, spieler = {}, antworten = {}, uhr = null;
    const satz = () => QUIZ_SAETZE.find((s) => s.id === meta.satz);
    document.body.classList.add("beamer");
    ctx.aufraeumen(() => { document.body.classList.remove("beamer"); clearInterval(uhr); });

    const setze = (upd) => store.update(P + "/meta", upd);
    const frageStarten = async (i) => setze({ phase: "frage", frage: i, [`starts/${i}`]: Date.now() });

    function zeichne() {
      if (!meta) return;
      clearInterval(uhr);
      const s = satz();
      const namen = Object.entries(spieler).map(([uid, x]) => ({ uid, ...x }));
      const url = location.href.replace(/app\.html.*$/, "");
      if (meta.phase === "lobby") {
        mount(flaeche, h("div.beamer-lobby",
          h("div", h("p.beamer-klein", "Mitspielen: Handy → Sprachhafen → „Live im Kurs“ → Raumnummer"), h("div.beamer-code", raum), h("p.beamer-klein", url)),
          h("div.beamer-spieler", namen.length ? namen.map((n) => h("span.beamer-name", n.name)) : h("p.leise", "Noch niemand da …")),
          h("div.reihe", { style: { justifyContent: "center" } },
            h("button.btn.primaer.gross", { disabled: !namen.length, onclick: () => frageStarten(0) }, `Quiz starten (${namen.length})`),
            h("button.btn", { onclick: async () => { await store.remove(P); location.hash = "#/live"; } }, "Abbrechen"))));
        return;
      }
      const fi = meta.frage, f = meta.fragen[fi];
      const ant = antworten[fi] || {};
      const anzahl = Object.keys(ant).length;
      if (meta.phase === "frage") {
        const start = (meta.starts || {})[fi] || Date.now();
        const rest = h("div.beamer-uhr");
        const tick = () => {
          const r = Math.max(0, Math.ceil(s.sekunden - (Date.now() - start) / 1000));
          rest.textContent = r;
          if (r <= 0 || anzahl >= namen.length) { clearInterval(uhr); setze({ phase: "aufloesung" }); }
        };
        mount(flaeche, h("div.beamer-frage",
          h("div.beamer-kopf", h("span", `Frage ${fi + 1} von ${meta.fragen.length}`), rest, h("span", `${anzahl} von ${namen.length} geantwortet`)),
          h("h2.beamer-text", f.frage),
          h("div.beamer-optionen", f.optionen.map((o, i) => h("div.beamer-opt", { style: { background: FARBEN[i] } }, h("span.form", FORMEN[i]), o))),
          h("div.reihe", { style: { justifyContent: "flex-end" } }, h("button.btn", { onclick: () => setze({ phase: "aufloesung" }) }, "Auflösen"))));
        tick(); uhr = setInterval(tick, 250);
        return;
      }
      const { p, richtig } = punkteStand(meta, antworten, s);
      const rangliste = namen.map((n) => ({ ...n, punkte: p[n.uid] || 0, richtig: richtig[n.uid] || 0 })).sort((a, b) => b.punkte - a.punkte);
      if (meta.phase === "aufloesung") {
        const verteilung = f.optionen.map((_, i) => Object.values(ant).filter((a) => a.wahl === i).length);
        const max = Math.max(1, ...verteilung);
        mount(flaeche, h("div.beamer-frage",
          h("div.beamer-kopf", h("span", `Frage ${fi + 1} von ${meta.fragen.length}`), h("span"), h("span", `${anzahl} Antworten`)),
          h("h2.beamer-text", f.frage),
          h("div.beamer-optionen", f.optionen.map((o, i) => h("div.beamer-opt" + (i === f.loesung ? ".richtig" : ".blass"), { style: { background: FARBEN[i] } },
            h("span.form", FORMEN[i]), o, h("span.beamer-zahl", verteilung[i]), h("i.beamer-balken", { style: { width: (verteilung[i] / max) * 100 + "%" } })))),
          h("div.beamer-zwischen",
            h("ol", rangliste.slice(0, 5).map((r) => h("li", h("span", r.name), h("b", r.punkte)))),
            h("button.btn.primaer.gross", { onclick: () => (fi + 1 < meta.fragen.length ? frageStarten(fi + 1) : setze({ phase: "ende" })) },
              fi + 1 < meta.fragen.length ? "Nächste Frage" : "Ergebnis zeigen"))));
        return;
      }
      if (meta.phase === "ende") {
        const podest = [rangliste[1], rangliste[0], rangliste[2]];
        mount(flaeche, h("div.beamer-ende",
          h("h2", "Siegerehrung"),
          h("div.podest", podest.map((r, i) => r ? h("div.podest-platz.p" + [2, 1, 3][i], h("span.podest-name", r.name), h("span.podest-punkte", r.punkte + " Punkte"), h("div.podest-sockel", [2, 1, 3][i])) : h("div"))),
          h("ol.beamer-rangliste", rangliste.map((r) => h("li", h("span", r.name), h("span.leise", `${r.richtig} von ${meta.fragen.length} richtig`), h("b", r.punkte)))),
          h("div.reihe", { style: { justifyContent: "center" } },
            h("button.btn", { onclick: async () => { await store.remove(P); location.hash = "#/live"; } }, "Raum schließen"))));
      }
    }
    ctx.on(P + "/meta", (v) => { meta = v; if (!v) { toast("Raum geschlossen"); } zeichne(); });
    ctx.on(P + "/spieler", (v) => { spieler = v || {}; if (meta && meta.phase === "lobby") zeichne(); });
    ctx.on(P + "/antworten", (v) => { antworten = v || {}; if (meta && meta.phase !== "lobby") zeichne(); });
  }
}
