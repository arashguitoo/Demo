/* ==========================================================
   Auswertung: Fertigkeiten, Anwesenheit, Prüfungsprognose
   Die Prognose wendet die offiziellen Bestehensregeln an:
   DTZ (g.a.s.t.-Übungssatz 2024) und DTB B2 (telc/BAMF, Übungstest 1).
   ========================================================== */
import { FERTIGKEITEN, aktivitaet } from "../data/katalog.js";
import { ausIso, isoTag } from "./ui.js";

export const STATUS = {
  da: { text: "anwesend", kurz: "da" },
  spaet: { text: "verspätet", kurz: "spät" },
  frueh: { text: "früher gegangen", kurz: "früh" },
  entsch: { text: "entschuldigt", kurz: "entsch." },
  fehlt: { text: "unentschuldigt", kurz: "fehlt" },
};

/** Liste der Ergebnisse (neueste zuerst) aus dem Datenknoten */
export const ergebnisListe = (knoten) =>
  Object.entries(knoten || {}).map(([id, e]) => ({ id, ...e })).sort((a, b) => b.ts - a.ts);

/** Durchschnitt je Fertigkeit aus den jüngsten 8 Ergebnissen pro Fertigkeit */
export function fertigkeiten(ergebnisse) {
  const out = {};
  for (const f of Object.keys(FERTIGKEITEN)) {
    const eig = ergebnisse.filter((e) => e.fertigkeit === f && e.max > 0).slice(0, 8);
    if (!eig.length) { out[f] = null; continue; }
    const p = eig.reduce((s, e) => s + e.punkte / e.max, 0) / eig.length;
    // Trend: jüngste Hälfte vs. ältere Hälfte
    let trend = 0;
    if (eig.length >= 4) {
      const half = Math.floor(eig.length / 2);
      const neu = eig.slice(0, half).reduce((s, e) => s + e.punkte / e.max, 0) / half;
      const alt = eig.slice(half).reduce((s, e) => s + e.punkte / e.max, 0) / (eig.length - half);
      trend = neu - alt > 0.04 ? 1 : alt - neu > 0.04 ? -1 : 0;
    }
    out[f] = { prozent: Math.round(p * 100), anzahl: eig.length, trend };
  }
  return out;
}

/** Unterrichtstage einer Klasse zwischen Start und min(Ende, bis) */
export function unterrichtstage(klasse, buch = {}, bis = isoTag()) {
  const tage = [];
  if (!klasse || !klasse.start) return tage;
  const ende = klasse.ende && klasse.ende < bis ? klasse.ende : bis;
  const wt = new Set(klasse.tage || [1, 2, 3, 4, 5]);
  for (let d = ausIso(klasse.start); isoTag(d) <= ende; d.setDate(d.getDate() + 1)) {
    const k = isoTag(d);
    const eintrag = buch[k];
    if (eintrag && eintrag.unterricht === false) continue;
    if (wt.has(d.getDay()) || (eintrag && eintrag.unterricht === true)) tage.push(k);
  }
  return tage;
}

/** Anwesenheit eines TN über vergangene Unterrichtstage */
export function anwesenheit(stid, tage, anw = {}) {
  const z = { da: 0, spaet: 0, frueh: 0, entsch: 0, fehlt: 0, offen: 0 };
  for (const t of tage) {
    const e = anw[t] && anw[t][stid];
    if (!e || !e.status) z.offen++;
    else z[e.status]++;
  }
  const erfasst = tage.length - z.offen;
  const anwesend = z.da + z.spaet + z.frueh;
  return { ...z, tage: tage.length, erfasst, quote: erfasst ? Math.round((anwesend / erfasst) * 100) : null };
}

/* ---------------- Prüfungsprognose ---------------- */
const jungstes = (ergebnisse, id) => ergebnisse.find((e) => e.aktivitaet === id);

/** DTZ: Hören+Lesen (45), Schreiben (20), Sprechen (100) */
export function prognoseDTZ(ergebnisse) {
  const lesen = jungstes(ergebnisse, "pr-dtz-lesen");   // 25 Items
  const hoeren = jungstes(ergebnisse, "pr-dtz-hoeren"); // 20 Items
  const schreiben = jungstes(ergebnisse, "pr-dtz-schreiben"); // 20 Punkte
  const sprechen = jungstes(ergebnisse, "pr-dtz-sprechen");   // 100 Punkte
  const fehlend = [];
  let hl = null;
  if (lesen && hoeren) hl = Math.round((lesen.punkte / lesen.max) * 25 + (hoeren.punkte / hoeren.max) * 20);
  else fehlend.push(!lesen && !hoeren ? "Hören und Lesen" : !lesen ? "Lesen" : "Hören");
  const sch = schreiben ? Math.round((schreiben.punkte / schreiben.max) * 20) : null;
  if (!schreiben) fehlend.push("Schreiben");
  const spr = sprechen ? Math.round((sprechen.punkte / sprechen.max) * 100) : null;
  if (!sprechen) fehlend.push("Sprechen");

  const stufeHL = hl == null ? null : hl >= 33 ? "B1" : hl >= 20 ? "A2" : "unter A2";
  const stufeS = sch == null ? null : sch >= 15 ? "B1" : sch >= 7 ? "A2" : "unter A2";
  const stufeSp = spr == null ? null : spr >= 75 ? "B1" : spr >= 35 ? "A2" : "unter A2";

  let ergebnis = null;
  if (!fehlend.length) {
    const rang = { B1: 2, A2: 1, "unter A2": 0 };
    if (rang[stufeSp] === 0) ergebnis = "kein Zertifikat";
    else if (rang[stufeSp] === 2 && (rang[stufeHL] === 2 || rang[stufeS] === 2)) ergebnis = "B1";
    else if (rang[stufeHL] >= 1 || rang[stufeS] >= 1) ergebnis = "A2";
    else ergebnis = "kein Zertifikat";
  }
  return {
    pruefung: "DTZ",
    teile: [
      { name: "Hören und Lesen", wert: hl, max: 45, stufe: stufeHL, grenzeText: "B1 ab 33, A2 ab 20" },
      { name: "Schreiben", wert: sch, max: 20, stufe: stufeS, grenzeText: "B1 ab 15, A2 ab 7" },
      { name: "Sprechen", wert: spr, max: 100, stufe: stufeSp, grenzeText: "B1 ab 75, A2 ab 35" },
    ],
    fehlend, ergebnis,
    regel: "B1 gibt es mit B1 im Sprechen und B1 in Hören/Lesen oder Schreiben. Ohne mindestens A2 im Sprechen gibt es kein Zertifikat.",
  };
}

/** DTB B2: je Fertigkeit 60 Punkte, bestanden ab 144 und 3 von 4 über 60 %, eine darf 40–60 % */
export function prognoseDTB(ergebnisse) {
  const teil = (f) => {
    const eig = ergebnisse.filter((e) => { const a = aktivitaet(e.aktivitaet); return a && a.pruefung === "DTB" && e.fertigkeit === f; });
    if (!eig.length) return null;
    // jüngstes Ergebnis je Aktivität, dann Mittel
    const seen = new Set(); const neu = [];
    for (const e of eig) if (!seen.has(e.aktivitaet)) { seen.add(e.aktivitaet); neu.push(e); }
    return Math.round((neu.reduce((s, e) => s + e.punkte / e.max, 0) / neu.length) * 60);
  };
  const map = { Lesen: "lesen", Hören: "hoeren", Schreiben: "schreiben", Sprechen: "sprechen" };
  // Sprachbausteine zählen im DTB zum Schreiben
  const sb = ergebnisse.find((e) => e.aktivitaet === "pr-dtb-sprachbausteine");
  const teile = Object.entries(map).map(([name, f]) => {
    let wert = teil(f);
    if (f === "schreiben" && sb) { const s = Math.round((sb.punkte / sb.max) * 60); wert = wert == null ? s : Math.round(wert * 0.8 + s * 0.2); }
    return { name, wert, max: 60, stufe: wert == null ? null : wert >= 36 ? "über 60 %" : wert >= 24 ? "40–60 %" : "unter 40 %", grenzeText: "über 60 % = 36 Punkte" };
  });
  const fehlend = teile.filter((t) => t.wert == null).map((t) => t.name);
  let ergebnis = null, summe = null;
  if (!fehlend.length) {
    summe = teile.reduce((s, t) => s + t.wert, 0);
    const ueber = teile.filter((t) => t.wert >= 36).length;
    const schwach = teile.filter((t) => t.wert < 36);
    const ok = summe >= 144 && ueber >= 3 && schwach.every((t) => t.wert >= 24);
    ergebnis = ok ? "bestanden" : "noch nicht bestanden";
  }
  return { pruefung: "DTB B2", teile, fehlend, ergebnis, summe, maxSumme: 240,
    regel: "Bestanden mit mindestens 144 von 240 Punkten. Drei Fertigkeiten müssen über 60 % liegen, eine darf zwischen 40 und 60 % liegen." };
}

export const ampel = (p) => (p == null ? "" : p >= 70 ? "gut" : p >= 50 ? "mittel" : "schlecht");
