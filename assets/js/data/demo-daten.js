/* ==========================================================
   Beispieldaten für die Demo-Schule.
   Alles relativ zu „heute“, damit das Klassenbuch immer aktuell wirkt.
   Liefert ein Objekt { pfad: wert } für store.update("", …).
   ========================================================== */
import { AKTIVITAETEN } from "./katalog.js";
import { isoTag } from "../core/ui.js";
import { unterrichtstage } from "../core/auswertung.js";

export const DEMO = {
  schoolId: "s_sprachhafen",
  schule: "Sprachschule am Hafen (Demo)",
  lehrkraefte: [
    // Drei gleichwertige Lehrkraft-Zugänge. Der erste legt technisch die Schule an (Rolle admin).
    { uid: "u_demo_1", name: "Demo 1", email: "demo1@sprachhafen.de", pw: "hafen2026", rolle: "admin" },
    { uid: "u_demo_2", name: "Demo 2", email: "demo2@sprachhafen.de", pw: "hafen2026", rolle: "lehrkraft" },
    { uid: "u_demo_3", name: "Demo 3", email: "demo3@sprachhafen.de", pw: "hafen2026", rolle: "lehrkraft" },
  ],
  gastCodes: { ik: "GASTA2", bsk: "GASTB2", we: "GASTC2" },
};

function rng(seed) {
  return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const ALPHA = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function demoDaten() {
  const r = rng(20261017);
  const pick = (arr) => arr[Math.floor(r() * arr.length)];
  const code = () => Array.from({ length: 6 }, () => ALPHA[Math.floor(r() * ALPHA.length)]).join("");
  const heute = new Date();
  const vor = (tage) => { const d = new Date(heute); d.setDate(d.getDate() - tage); return isoTag(d); };
  const nach = (tage) => { const d = new Date(heute); d.setDate(d.getDate() + tage); return isoTag(d); };
  const S = `schools/${DEMO.schoolId}`;
  const out = {};

  out[`${S}/meta`] = { name: DEMO.schule, erstellt: Date.now(), demo: true };
  for (const l of DEMO.lehrkraefte) {
    out[`users/${l.uid}`] = { schoolId: DEMO.schoolId, name: l.name, email: l.email, rolle: l.rolle };
    out[`${S}/teachers/${l.uid}`] = { name: l.name, email: l.email, rolle: l.rolle };
  }

  const klassen = {
    k_ik: { name: "Integrationskurs Modul 6", niveau: "B1", kursart: "Integrationskurs", pruefung: "DTZ", start: vor(54), ende: nach(26), tage: [1, 2, 3, 4, 5], zeit: "08:30–12:45", raum: "Raum 2", lehrkraefte: { u_demo_1: true, u_demo_2: true, u_demo_3: true }, erstellt: Date.now() },
    k_we: { name: "Wochenendkurs A2", niveau: "A2", kursart: "Allgemeiner Sprachkurs", pruefung: "DTZ", start: vor(40), ende: nach(60), tage: [6, 0], zeit: "10:00–13:15", raum: "Raum 1", lehrkraefte: { u_demo_1: true, u_demo_2: true, u_demo_3: true }, erstellt: Date.now() },
    k_bsk: { name: "Berufssprachkurs B2", niveau: "B2", kursart: "Berufssprachkurs (BSK)", pruefung: "DTB", start: vor(68), ende: nach(40), tage: [1, 2, 4], zeit: "17:30–20:45", raum: "Raum 5", lehrkraefte: { u_demo_1: true, u_demo_2: true, u_demo_3: true }, erstellt: Date.now() },
  };
  for (const [k, v] of Object.entries(klassen)) out[`${S}/klassen/${k}`] = v;

  const namen = {
    k_ik: ["Amira", "Bashir", "Dilara", "Elena", "Farid", "Goli", "Hamza", "Irina", "Jamal", "Kateryna", "Luis", "Mariam"],
    k_we: ["Aylin", "Bilal", "Chiara", "Dawit", "Esra", "Fatima", "Georgi", "Hana"],
    k_bsk: ["Nadia", "Omar", "Pavel", "Rana", "Samir", "Tiago", "Valentina", "Wei", "Yasmin", "Zoran"],
  };

  const themenIK = ["Wohnungssuche: Anzeigen lesen", "Termine beim Amt", "Beschwerdebrief an den Vermieter", "DTZ Lesen Teil 2 trainieren", "Arztbesuch: Rollenspiel",
    "Konnektoren weil/obwohl", "Elternabend und Schule", "DTZ Sprechen Teil 3: gemeinsam planen", "Einkaufen und Reklamieren", "Präteritum der Modalverben",
    "Bewerbung: Lebenslauf", "Nachrichten verstehen", "Relativsätze", "DTZ Schreiben: E-Mail an Kursleitung", "Feste und Feiertage", "Wiederholung Kapitel 9"];
  const themenBSK = ["Besprechung und Protokoll", "Telefonnotiz aufnehmen", "Kundenbeschwerde beantworten", "Passiv in Arbeitsabläufen", "Forumsbeitrag schreiben",
    "Arbeitsschutz und Unterweisung", "Sprachbausteine: Konnektoren", "Lösungswege diskutieren", "Bewerbungsgespräch", "Nominalisierung", "Pausengespräche", "Präsentation halten"];
  const hausaufgaben = ["Übungen im Lernpfad bis Freitag", "Wortschatz-Trainer: 20 Karten", "Text auf S. 112 lesen", "Kurze E-Mail schreiben", "Prüfungsteil Lesen allein üben", ""];

  const studenten = {};
  for (const kid of ["k_ik", "k_we", "k_bsk"]) {
    const kl = klassen[kid];
    const istB2 = kid === "k_bsk";
    namen[kid].forEach((vn, i) => {
      const stid = `t_${kid}_${i + 1}`;
      const c = code();
      // individuelles Profil
      const basis = 0.45 + r() * 0.42;
      const profil = { wortschatz: basis + (r() - .5) * .2, grammatik: basis + (r() - .5) * .25, lesen: basis + (r() - .4) * .2, hoeren: basis + (r() - .5) * .25, schreiben: basis - .06 + (r() - .5) * .2, sprechen: basis + (r() - .5) * .3 };
      const treue = 0.72 + r() * 0.27;
      studenten[stid] = { kid, profil, treue, vn };
      out[`${S}/students/${stid}`] = { vorname: vn, klasseId: kid, code: c, aktiv: true, erstellt: Date.now() - 60 * 864e5 };
      out[`codes/${c}`] = { schoolId: DEMO.schoolId, studentId: stid };
    });
    // Gast-Zugang für Besucher:innen
    const gid = `t_${kid}_gast`;
    const gc = istB2 ? DEMO.gastCodes.bsk : kid === "k_we" ? DEMO.gastCodes.we : DEMO.gastCodes.ik;
    out[`${S}/students/${gid}`] = { vorname: istB2 ? "Sam" : kid === "k_we" ? "Kim" : "Alex", klasseId: kid, code: gc, aktiv: true, erstellt: Date.now(), gast: true };
    out[`codes/${gc}`] = { schoolId: DEMO.schoolId, studentId: gid };

    // Klassenbuch + Anwesenheit
    const buch = {};
    const gestern = vor(1);
    // ein Feiertag/Ausfall zur Realistik
    const ausfall = vor(istB2 ? 22 : 19);
    buch[ausfall] = { unterricht: false, grund: "Unterricht fällt aus (Fortbildung)" };
    const tage = unterrichtstage(kl, buch, gestern);
    const themen = istB2 ? themenBSK : kid === "k_we" ? themenIK.slice().reverse() : themenIK;
    tage.forEach((t, i) => {
      buch[t] = { unterricht: true, thema: themen[i % themen.length], hausaufgabe: pick(hausaufgaben), ue: istB2 ? 4 : 5, lehrkraft: "u_demo_" + (1 + (i % 3)) };
      for (const [stid, p] of Object.entries(studenten)) {
        if (p.kid !== kid) continue;
        const x = r();
        let status = "da";
        if (x > p.treue) status = r() < 0.55 ? "entsch" : "fehlt";
        else if (x > p.treue - 0.08) status = r() < 0.7 ? "spaet" : "frueh";
        const e = { status, bestaetigt: true };
        if (status === "da" || status === "spaet") e.ein = new Date(t + (istB2 ? "T17:" : kid === "k_we" ? "T09:" : "T08:") + (status === "spaet" ? "52" : String(10 + Math.floor(r() * 25)).padStart(2, "0")) + ":00").getTime();
        if (status === "spaet") e.notiz = `${10 + Math.floor(r() * 30)} Min. später`;
        out[`${S}/anwesenheit/${kid}/${t}/${stid}`] = e;
      }
    });
    for (const [t, e] of Object.entries(buch)) out[`${S}/klassenbuch/${kid}/${t}`] = e;

    // Heute: ein paar haben schon eingecheckt (unbestätigt), wenn heute Unterricht ist
    const heuteIso = isoTag(heute);
    if ((kl.tage || []).includes(heute.getDay())) {
      out[`${S}/klassenbuch/${kid}/${heuteIso}`] = { unterricht: true, thema: istB2 ? "DTB Sprechen Teil 3 trainieren" : kid === "k_we" ? "Termine absagen und verschieben" : "DTZ Hören Teil 3", hausaufgabe: "", ue: istB2 ? 4 : 5 };
      const [hh, mm] = (kl.zeit || "08:30").split(/[:–-]/).map(Number);
      const beginn = new Date(heute.getFullYear(), heute.getMonth(), heute.getDate(), hh, mm).getTime();
      if (Date.now() > beginn - 20 * 60000) {
        Object.entries(studenten).filter(([, p]) => p.kid === kid).slice(0, 5).forEach(([stid]) => {
          out[`${S}/anwesenheit/${kid}/${heuteIso}/${stid}`] = { status: "da", ein: beginn - Math.floor(2 + r() * 14) * 60000, bestaetigt: false };
        });
      }
    }
  }

  // Ergebnisse
  const passend = (kid) => AKTIVITAETEN.filter((a) => (kid === "k_bsk" ? (a.niveau === "B2" || a.niveau === "B1") && a.pruefung !== "DTZ" : a.niveau !== "B2" && a.pruefung !== "DTB"));
  for (const [stid, p] of Object.entries(studenten)) {
    const akts = passend(p.kid);
    const n = 14 + Math.floor(r() * 16);
    for (let i = 0; i < n; i++) {
      const a = pick(akts);
      const max = a.id === "pr-dtz-sprechen" ? 100 : a.id === "pr-dtz-schreiben" ? 20 : a.id === "pr-dtz-lesen" ? 25 : a.id === "pr-dtz-hoeren" ? 20 : a.bereich === "pruefung" ? 12 : 10 + Math.floor(r() * 3) * 5;
      const lern = (n - i) / n * 0.08; // ältere etwas schwächer
      const q = Math.max(0.1, Math.min(1, (p.profil[a.fertigkeit] ?? 0.6) - lern + (r() - .5) * .18));
      const ts = Date.now() - Math.floor(((i + 1) / n) * 50 * 864e5 * r() + i * 3 * 3600e3);
      out[`${S}/ergebnisse/${stid}/e${String(i).padStart(3, "0")}`] = { aktivitaet: a.id, fertigkeit: a.fertigkeit, punkte: Math.round(q * max), max, ts };
    }
    // vollständige Probeprüfung für etwa die Hälfte
    if (r() < 0.6) {
      const pr = p.kid === "k_bsk" ? ["pr-dtb-lesen", "pr-dtb-hoeren", "pr-dtb-schreiben", "pr-dtb-sprachbausteine", "pr-dtb-telefonnotiz", "pr-dtb-sprechen"] : ["pr-dtz-lesen", "pr-dtz-hoeren", "pr-dtz-schreiben", "pr-dtz-sprechen"];
      pr.forEach((id, j) => {
        const a = AKTIVITAETEN.find((x) => x.id === id);
        const max = id === "pr-dtz-sprechen" ? 100 : id === "pr-dtz-schreiben" ? 20 : id === "pr-dtz-lesen" ? 25 : id === "pr-dtz-hoeren" ? 20 : 12;
        const q = Math.max(0.15, Math.min(1, (p.profil[a.fertigkeit] ?? .6) + 0.05 + (r() - .5) * .12));
        out[`${S}/ergebnisse/${stid}/p${j}`] = { aktivitaet: id, fertigkeit: a.fertigkeit, punkte: Math.round(q * max), max, ts: Date.now() - (2 + j) * 864e5 };
      });
    }
  }

  // Rückmeldungen der Lehrkraft (für zwei TN schon ausgefüllt)
  out[`${S}/rueckmeldung/t_k_ik_1`] = { staerken: "Liest sehr genau und findet Informationen schnell. Beteiligt sich viel im Unterricht.", ziele: "Im Schreiben alle vier Leitpunkte bearbeiten und Anrede und Gruß nicht vergessen.", aktualisiert: Date.now() - 3 * 864e5, von: "Demo 1" };
  out[`${S}/rueckmeldung/t_k_bsk_1`] = { staerken: "Sicher in Pausengesprächen, guter Berufswortschatz.", ziele: "Sprachbausteine: Konnektoren mit Nebensatz wiederholen (obwohl, sodass, indem).", aktualisiert: Date.now() - 5 * 864e5, von: "Demo 2" };

  return out;
}
