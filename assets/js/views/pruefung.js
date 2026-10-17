/* ==========================================================
   Prüfungstraining DTZ / DTB B2
   – Lesen, Hören, Sprachbausteine, Telefonnotiz: Antwortbogen wie in
     der Prüfung, Auswertung erst nach dem Abgeben
   – Schreiben: Aufgabe A/B, Redemittel, Wortzähler, Abgabe an die Lehrkraft
   – Sprechen: Partnertraining mit Karten, Zeit und Selbsteinschätzung
   ========================================================== */
import { h, icon, mount, toast, bestaetigen, prozent, pad } from "../core/ui.js";
import { aktivitaet } from "../data/katalog.js";
import { ladePruefung } from "../data/inhalte/index.js";
import { mischen } from "../spiel/engine.js";
import { vorlesen, sprachausgabeMoeglich } from "../spiel/sprache.js";
import { ergebnisBild } from "./spiel.js";

const richtigeAntwort = (a) => (a.typ === "rf" ? a.richtig : a.loesung ?? a.optionen[0]);
const zeit = (s) => `${Math.floor(s / 60)}:${pad(Math.max(0, s % 60))}`;

async function speichereErgebnis(ctx, aid, daten) {
  if (ctx.session.rolle !== "tn") return;
  try { await ctx.store.push(ctx.schule(`ergebnisse/${ctx.session.studentId}`), { ...daten, aktivitaet: aid, ts: Date.now() }); }
  catch (e) { toast("Ergebnis konnte nicht gespeichert werden", "fehler"); }
}

/* ---------- Uhr ---------- */
function uhr(sekunden, onAblauf) {
  const el = h("span.pr-uhr", { role: "timer" });
  const ende = Date.now() + sekunden * 1000;
  let id = null;
  const tick = () => {
    const rest = Math.round((ende - Date.now()) / 1000);
    el.textContent = zeit(rest);
    el.classList.toggle("knapp", rest <= 300);
    if (rest <= 0) { clearInterval(id); onAblauf && onAblauf(); }
  };
  tick(); id = setInterval(tick, 1000);
  return { el, stopp: () => clearInterval(id) };
}

/* ---------- Hörtext-Spieler ---------- */
function hoerSpieler(ht, { pruefungsmodus }) {
  let gespielt = 0, laeuft = null;
  const max = pruefungsmodus ? ht.wiederholen || 1 : Infinity;
  const info = h("span.klein.leise");
  const knopf = h("button.btn.primaer.klein", { type: "button" });
  const aktualisiere = () => {
    knopf.replaceChildren(laeuft ? icon("x", 16) : icon("play", 16), laeuft ? "Stopp" : gespielt ? "Noch einmal hören" : "Abspielen");
    knopf.disabled = !laeuft && gespielt >= max;
    info.textContent = pruefungsmodus ? `In der Prüfung ${ht.wiederholen === 2 ? "zweimal" : "einmal"} zu hören (${Math.min(gespielt, max)}/${max})` : gespielt ? `${gespielt}× gehört` : "";
  };
  knopf.onclick = async () => {
    if (laeuft) { laeuft.stopp(); laeuft = null; aktualisiere(); return; }
    if (!sprachausgabeMoeglich()) { toast("Dieser Browser kann keine Texte vorlesen.", "fehler"); return; }
    gespielt++;
    laeuft = vorlesen(ht.sprecher);
    aktualisiere();
    await laeuft.fertig;
    laeuft = null; aktualisiere();
  };
  aktualisiere();
  return h("div.pr-hoer", h("span.pr-hoer-titel", icon("play", 16), ht.titel), knopf, info);
}

/* ---------- Antwortbogen ---------- */
function frageEl(a, antworten, key, onWahl) {
  const optionen = a.typ === "rf" ? [true, false] : a.fest ? a.optionen : a._reihenfolge;
  const wahl = antworten.get(key);
  const luecke = a.typ === "luecke";
  const [vor, nach] = luecke ? a.satz.split("___") : [];
  return h("div.pr-frage", { id: "f-" + key },
    h("p.pr-frage-text", a.nr ? h("span.sp-nr", a.nr) : null,
      a.typ === "rf" ? a.aussage : luecke ? [vor, h("span.sp-luecke", wahl != null ? String(wahl).replace(/^[a-j] /, "") : "   "), nach] : h("span", { html: a.frage })),
    h("div.pr-optionen" + (optionen.every((o) => String(o).length <= 2) ? ".buchstaben" : ""),
      optionen.map((o) => h("button.pr-opt", { type: "button", "aria-pressed": String(wahl === o), onclick: () => { antworten.set(key, o); onWahl(); } },
        a.typ === "rf" ? (o ? "richtig" : "falsch") : o))));
}

function testAnsicht(ctx, aid, { titel, pruefung, minuten, fertigkeit, teile, notiz = false }) {
  const flaeche = h("div");
  // Lesetexte mit eigenen Fragen („lesen“-Blöcke) in Text + Einzelfragen zerlegen
  teile.forEach((t) => {
    if (t._texte) return;
    t._texte = [];
    t.aufgaben = t.aufgaben.flatMap((a) => {
      if (a.typ !== "lesen") return [a];
      const idx = t._texte.push({ titel: a.titel, text: a.text }) - 1;
      return a.fragen.map((f) => ({ ...f, _text: idx }));
    });
  });
  // Reihenfolge der Optionen einmal festlegen
  teile.forEach((t) => t.aufgaben.forEach((a) => { if (!a.fest && a.optionen) a._reihenfolge = mischen(a.optionen); }));
  const alle = teile.flatMap((t, ti) => t.aufgaben.map((a, ai) => ({ a, key: `${ti}-${ai}`, ti })));
  const antworten = new Map();
  let teilNr = 0, timer = null, mitZeit = true;

  function start() {
    const zeitBox = h("label.reihe", { style: { gap: ".5rem" } }, h("input", { type: "checkbox", checked: true, onchange: (e) => (mitZeit = e.target.checked) }), `Mit Zeitlimit wie in der Prüfung (${minuten} Minuten)`);
    mount(flaeche, h("section.flaeche.pr-start",
      h("div.reihe", h("span.chip.petrol", pruefung), h("h2", { style: { margin: 0 } }, titel)),
      h("ol.pr-teile", teile.map((t) => h("li", h("b", t.titel), t.ziel ? `: ${t.ziel}` : "", h("span.leise", ` (${t.aufgaben.length} Aufgaben)`)))),
      h("p.leise", notiz ? "Sie hören eine telefonische Mitteilung und füllen die Notiz aus." : "Sie sehen die Lösungen erst, wenn Sie abgeben. So wie in der echten Prüfung."),
      teile.some((t) => t.hoertexte) && !sprachausgabeMoeglich() ? h("p.fehler-text", "Dieser Browser kann keine Hörtexte vorlesen. Bitte Chrome, Edge oder Safari verwenden.") : null,
      zeitBox,
      h("button.btn.primaer.gross", { onclick: laufen }, icon("play", 20), "Prüfung starten")));
  }

  function laufen() {
    if (mitZeit) timer = uhr(minuten * 60, () => { toast("Die Zeit ist um."); abgeben(true); });
    ctx.aufraeumen(() => { timer && timer.stopp(); try { speechSynthesis.cancel(); } catch (e) { /* egal */ } });
    zeichneTeil();
  }

  function zeichneTeil() {
    const t = teile[teilNr];
    const beantwortet = alle.filter((x) => antworten.has(x.key)).length;
    const kopf = h("div.pr-kopf",
      h("div.pr-reiter", teile.map((x, i) => {
        const offen = x.aufgaben.some((_, ai) => !antworten.has(`${i}-${ai}`));
        return h("button", { "aria-current": String(i === teilNr), class: offen ? "" : "fertig", onclick: () => { teilNr = i; zeichneTeil(); } }, x.titel.replace(/^Teil /, "T"));
      })),
      h("span.pr-stand", `${beantwortet}/${alle.length}`),
      timer ? timer.el : null,
      h("button.btn.primaer.klein", { onclick: () => abgeben(false) }, "Abgeben"));
    const neuZeichnen = () => { const y = window.scrollY; zeichneTeil(); window.scrollTo(0, y); };
    const fragen = (filter) => t.aufgaben.map((a, ai) => ({ a, ai })).filter(filter).map(({ a, ai }) => frageEl(a, antworten, `${teilNr}-${ai}`, neuZeichnen));
    let inhalt;
    if (t.hoertexte) {
      const gruppen = t.hoertexte.map((ht, hi) => h("div.pr-hoer-block", hoerSpieler(ht, { pruefungsmodus: mitZeit }), fragen(({ a }) => a.hoertext === hi)));
      const ohne = fragen(({ a }) => a.hoertext == null);
      inhalt = h("div.pr-einspaltig", t.material ? h("div.pr-material", { html: t.material }) : null, ohne.length ? h("div.pr-hoer-block", ohne) : null, gruppen);
    } else if (t._texte.length) {
      inhalt = h("div.pr-einspaltig", { style: { maxWidth: "none" } },
        t.material ? h("div.pr-material", { html: t.material }) : null,
        t._texte.map((tx, xi) => h("div.pr-zweispaltig.pr-lese-block",
          h("div.pr-material", tx.titel ? h("h3", { style: { marginTop: 0 } }, tx.titel) : null, h("div", { html: tx.text })),
          h("div.pr-bogen", fragen(({ a }) => a._text === xi)))),
        fragen(({ a }) => a._text == null));
    } else {
      inhalt = t.material
        ? h("div.pr-zweispaltig", h("div.pr-material", { html: t.material }), h("div.pr-bogen", fragen(() => true)))
        : h("div.pr-einspaltig", fragen(() => true));
    }
    mount(flaeche, kopf,
      h("div.pr-teil-kopf", h("h2", t.titel + (t.ziel ? `: ${t.ziel}` : "")), h("p", t.anweisung)),
      inhalt,
      h("div.reihe.zwischen", { style: { marginTop: "1.2rem" } },
        teilNr > 0 ? h("button.btn", { onclick: () => { teilNr--; zeichneTeil(); window.scrollTo(0, 0); } }, icon("arrowL", 18), "Voriger Teil") : h("span"),
        teilNr < teile.length - 1 ? h("button.btn.primaer", { onclick: () => { teilNr++; zeichneTeil(); window.scrollTo(0, 0); } }, "Nächster Teil", icon("arrowR", 18))
          : h("button.btn.primaer", { onclick: () => abgeben(false) }, "Abgeben")));
  }

  async function abgeben(zeitAbgelaufen) {
    const offen = alle.length - antworten.size;
    if (!zeitAbgelaufen && offen && !(await bestaetigen("Jetzt abgeben?", `${offen} Aufgaben sind noch nicht beantwortet.`, "Abgeben"))) return;
    timer && timer.stopp();
    try { speechSynthesis.cancel(); } catch (e) { /* egal */ }
    const ok = (x) => antworten.get(x.key) === richtigeAntwort(x.a);
    const punkte = alle.filter(ok).length;
    await speichereErgebnis(ctx, aid, { fertigkeit, punkte, max: alle.length, modul: notiz ? "telefonnotiz" : "komplett" });
    const p = prozent(punkte, alle.length);
    mount(flaeche,
      ergebnisBild({ punkte, max: alle.length, titel: "Auswertung",
        text: pruefung === "DTZ" ? `Zum Vergleich: In Hören und Lesen zusammen braucht man für B1 etwa 73 % (33 von 45).` : `Zum Vergleich: Im DTB B2 braucht man pro Fertigkeit mehr als 60 %.`,
        aktionen: [h("a.btn", { href: "#/bereich/pruefung" }, "Zum Prüfungstraining"), h("button.btn.primaer", { onclick: () => location.reload() }, "Neu beginnen")] }),
      h("div.pr-bericht", teile.map((t, ti) => {
        const eig = alle.filter((x) => x.ti === ti);
        return h("section.flaeche",
          h("div.reihe.zwischen", h("h2", { style: { margin: 0 } }, t.titel), h("span.chip." + (eig.filter(ok).length / eig.length >= 0.6 ? "gut" : "mittel"), `${eig.filter(ok).length} von ${eig.length}`)),
          h("ul.pr-loesungen", eig.map((x) => {
            const r = richtigeAntwort(x.a), w = antworten.get(x.key);
            const txt = (v) => (x.a.typ === "rf" ? (v ? "richtig" : "falsch") : v);
            return h("li." + (ok(x) ? "ok" : "falsch"),
              h("span.pr-zeichen", ok(x) ? "✓" : "✗"),
              h("div", h("div", x.a.nr ? h("b", x.a.nr + " ") : null, h("span", { html: x.a.frage || x.a.aussage || x.a.satz.replace("___", "…") })),
                h("div.klein", ok(x) ? h("span", "Ihre Antwort: ", h("b", txt(w))) : [w != null ? h("span", "Ihre Antwort: ", h("s", txt(w)), " – ") : h("span", "Nicht beantwortet – "), h("span", "richtig: ", h("b", txt(r)))]),
                x.a.erklaerung ? h("div.klein.leise", x.a.erklaerung) : null));
          })),
          t.hoertexte ? h("details.pr-transkript", h("summary", "Hörtexte zum Nachlesen"), t.hoertexte.map((ht) => h("div", h("b", ht.titel), ht.sprecher.map((s) => h("p", h("span.leise", s.wer + ": "), s.text))))) : null);
      })));
    window.scrollTo(0, 0);
    return p;
  }

  start();
  return flaeche;
}

/* ---------- Schreiben ---------- */
function schreibAnsicht(ctx, aid, { titel, pruefung, minuten, varianten }) {
  // varianten: [{ titel, situation, leitpunkte, material?, redemittel, checkliste, muster, minWoerter }]
  const flaeche = h("div");
  let timer = null;
  function wahl() {
    mount(flaeche, h("div.chat-start", varianten.map((v, i) => h("section.flaeche",
      h("h2", v.titel), v.material ? h("p.leise", "Mit Ausgangstext") : null,
      h("p", v.situation),
      h("ul", v.leitpunkte.map((l) => h("li", l))),
      h("button.btn.primaer", { onclick: () => schreiben(v) }, "Diese Aufgabe wählen")))));
  }
  function schreiben(v) {
    const text = h("textarea.pr-text", { rows: 14, placeholder: "Schreiben Sie hier …", spellcheck: "false", oninput: zaehle });
    const zaehler = h("span.pr-woerter");
    function zaehle() {
      const n = (text.value.match(/\S+/g) || []).length;
      zaehler.textContent = `${n} Wörter${v.minWoerter ? ` (mindestens ${v.minWoerter})` : ""}`;
      zaehler.classList.toggle("ok", !v.minWoerter || n >= v.minWoerter);
      return n;
    }
    const einfuegen = (t) => {
      const s = text.selectionStart ?? text.value.length;
      text.value = text.value.slice(0, s) + t + text.value.slice(text.selectionEnd ?? s);
      text.focus(); text.selectionStart = text.selectionEnd = s + t.length; zaehle();
    };
    timer = uhr(minuten * 60, () => toast("Die Zeit ist um. Sie können noch abgeben."));
    ctx.aufraeumen(() => timer && timer.stopp());
    mount(flaeche,
      h("div.pr-kopf", h("strong", v.titel), h("span"), timer.el, h("button.btn.primaer.klein", { onclick: () => abgeben(v, text.value, zaehle()) }, "Abgeben")),
      h("div.pr-zweispaltig",
        h("div",
          v.material ? h("div.pr-material", { html: v.material }) : null,
          h("div.flaeche", h("p", { style: { fontWeight: 650 } }, v.situation),
            h("p.klein.leise", "Schreiben Sie etwas zu allen Punkten. Haken Sie ab, was Sie schon geschrieben haben:"),
            h("ul.pr-leitpunkte", v.leitpunkte.map((l) => h("li", h("label", h("input", { type: "checkbox" }), " ", l))))),
          h("details.flaeche.pr-redemittel", { open: true }, h("summary", "Redemittel (antippen zum Einfügen)"),
            Object.entries(v.redemittel || {}).map(([k, liste]) => h("div", h("h3", k), h("div.pr-rm-liste", liste.map((r) => h("button.chat-reaktion", { type: "button", onclick: () => einfuegen(r.replace(/…/g, "") + " ") }, r))))))),
        h("div.pr-schreibfeld", text, h("div.reihe.zwischen", zaehler, h("button.btn.primaer", { onclick: () => abgeben(v, text.value, zaehle()) }, "Abgeben")))));
    zaehle();
  }
  async function abgeben(v, text, n) {
    if (n < 10) { toast("Bitte zuerst einen Text schreiben.", "fehler"); return; }
    if (v.minWoerter && n < v.minWoerter && !(await bestaetigen("Text ist kurz", `Ihr Text hat ${n} Wörter. Empfohlen sind mindestens ${v.minWoerter}. Trotzdem abgeben?`, "Abgeben"))) return;
    timer && timer.stopp();
    if (ctx.session.rolle === "tn") {
      try {
        await ctx.store.push(ctx.schule(`abgaben/${ctx.session.studentId}`), { aktivitaet: aid, aufgabe: v.titel, situation: v.situation, text, woerter: n, ts: Date.now(), pruefung });
        toast("Abgegeben. Deine Lehrkraft bewertet den Text.");
      } catch (e) { toast("Abgabe ging nicht: " + e.message, "fehler"); }
    }
    const checks = h("ul.pr-check", (v.checkliste || []).map((c) => h("li", h("label", h("input", { type: "checkbox" }), " ", c))));
    mount(flaeche,
      h("div.raster-2",
        h("section.flaeche", h("h2", "Ihr Text"), h("p.klein.leise", `${n} Wörter`), h("div.pr-abgabe", text),
          ctx.session.rolle === "tn" ? h("p.chip.gut", "An die Lehrkraft geschickt") : h("p.chip.petrol", "Vorschau: wird nicht gespeichert")),
        h("section",
          h("div.flaeche", h("h2", "Selbst prüfen"), h("p.klein.leise", "Gehen Sie die Liste durch. Was fehlt noch?"), checks),
          v.muster ? h("details.flaeche", { style: { marginTop: "1rem" } }, h("summary", { style: { fontWeight: 750, cursor: "pointer" } }, "Musterlösung anzeigen"), h("div.pr-abgabe", { style: { marginTop: ".6rem" } }, v.muster)) : null)),
      h("div.reihe", { style: { marginTop: "1rem" } }, h("a.btn", { href: "#/bereich/pruefung" }, "Zum Prüfungstraining"), h("button.btn.primaer", { onclick: wahl }, "Andere Aufgabe schreiben")));
    window.scrollTo(0, 0);
  }
  wahl();
  return flaeche;
}

/* ---------- Sprechen ---------- */
function sprechAnsicht(ctx, aid, daten) {
  const flaeche = h("div");
  const s = daten.sprechen;
  let laufendeUhr = null;
  const stoppUhr = () => { if (laufendeUhr) { laufendeUhr.stopp(); laufendeUhr = null; } };
  ctx.aufraeumen(stoppUhr);
  const zeitKnopf = (min) => {
    const box = h("span");
    const btn = h("button.btn.klein", { type: "button", onclick: () => { stoppUhr(); laufendeUhr = uhr(min * 60, () => toast("Zeit ist um")); box.replaceChildren(laufendeUhr.el); btn.textContent = "Neu starten"; } }, icon("clock", 16), `${min} Min. starten`);
    return h("div.reihe", btn, box);
  };
  const aufklapp = (titel, inhalt, offen = false) => h("details.pr-aufklapp", { open: offen }, h("summary", titel), inhalt);
  const liste = (arr) => h("ul", arr.map((x) => h("li", x)));

  function bewertung(kriterien, stufenPunkte) {
    const wahl = new Map();
    const fertigBtn = h("button.btn.primaer", { disabled: true, onclick: async () => {
      const summe = [...wahl.values()].reduce((a, b) => a + b, 0);
      const max = kriterien.length * stufenPunkte[0];
      await speichereErgebnis(ctx, aid, { fertigkeit: "sprechen", punkte: Math.round((summe / max) * 100), max: 100, modul: "selbsteinschaetzung" });
      mount(flaeche, ergebnisBild({ punkte: Math.round((summe / max) * 100), max: 100, einheit: "Punkten", titel: ctx.session.rolle === "tn" ? "Selbsteinschätzung gespeichert" : "Selbsteinschätzung",
        text: "Am besten bewertet eine zweite Person oder die Lehrkraft mit. Üben Sie die Teile mehrmals mit wechselnden Partnern.",
        aktionen: [h("a.btn", { href: "#/bereich/pruefung" }, "Zum Prüfungstraining"), h("button.btn.primaer", { onclick: () => location.reload() }, "Noch einmal")] }));
    } }, "Einschätzung speichern");
    return h("section.flaeche",
      h("h2", "Wie lief es? Selbsteinschätzung"),
      h("p.klein.leise", "Wählen Sie je Kriterium die Beschreibung, die am besten passt. Sie können auch die Partnerin oder den Partner fragen."),
      kriterien.map((k, ki) => h("fieldset.pr-krit", h("legend", k.kriterium),
        k.stufen.map((st, si) => h("label", h("input", { type: "radio", name: "k" + ki, onchange: () => { wahl.set(ki, stufenPunkte[si] ?? 0); fertigBtn.disabled = wahl.size < kriterien.length; } }), " ", st)))),
      fertigBtn);
  }

  if (s.saetze) {
    // DTZ: Satz wählen, Teile nacheinander
    const waehle = () => mount(flaeche,
      h("p.leise", "Üben Sie zu zweit. Eine dritte Person oder die Lehrkraft kann die Prüferrolle übernehmen; die Prüferfragen stehen bei jedem Teil."),
      h("div.chat-start", s.saetze.map((satz, i) => h("section.flaeche", h("h2", satz.titel), liste(satz.teile.map((t) => `${t.titel} (${t.minuten} Min.)`)),
        h("button.btn.primaer", { onclick: () => zeigeTeil(satz, 0) }, icon("play", 18), "Mit diesem Satz üben")))));
    const zeigeTeil = (satz, i) => {
      stoppUhr();
      const t = satz.teile[i];
      let karte;
      if (t.karteA) {
        const kA = t.karteA, kB = t.karteB;
        const kartenEl = (k, wer) => h("div.pr-karte", h("div.pr-karte-wer", "Karte " + wer), h("div.pr-bild", k.bild), h("p", k.beschreibung),
          aufklapp("Fragen der Prüferin / des Prüfers", liste(k.fragen)));
        karte = h("div.chat-start", kartenEl(kA, "A"), kartenEl(kB, "B"));
      } else if (t.karte.stichworte) {
        karte = h("div.pr-karte", h("div.pr-karte-wer", "Für beide"), h("div.pr-stichworte", t.karte.stichworte.map((x) => h("span", x))),
          t.prueferfragen ? aufklapp("Nachfragen der Prüferin / des Prüfers", liste(t.prueferfragen)) : null);
      } else {
        karte = h("div.pr-karte", h("div.pr-karte-wer", "Für beide"), h("p", { style: { fontWeight: 650 } }, t.karte.situation), t.karte.aufgabe ? h("p", t.karte.aufgabe) : null,
          h("div.pr-stichworte", (t.karte.stichpunkte || []).map((x) => h("span", x))));
      }
      mount(flaeche,
        h("div.pr-kopf", h("strong", satz.titel), h("span.pr-stand", `Teil ${i + 1} von ${satz.teile.length}`)),
        h("div.pr-teil-kopf", h("h2", t.titel), zeitKnopf(t.minuten)),
        karte,
        t.redemittel ? aufklapp("Redemittel", h("div.pr-rm-liste", t.redemittel.map((r) => h("span.chat-reaktion", r))), false) : null,
        h("div.reihe.zwischen", { style: { marginTop: "1.2rem" } },
          i > 0 ? h("button.btn", { onclick: () => zeigeTeil(satz, i - 1) }, icon("arrowL", 18), "Voriger Teil") : h("button.btn", { onclick: waehle }, "Anderen Satz wählen"),
          i < satz.teile.length - 1 ? h("button.btn.primaer", { onclick: () => zeigeTeil(satz, i + 1) }, "Nächster Teil", icon("arrowR", 18))
            : h("button.btn.primaer", { onclick: () => { stoppUhr(); mount(flaeche, bewertung(s.bewertung, [5, 3, 1])); } }, "Fertig: Selbsteinschätzung")));
      window.scrollTo(0, 0);
    };
    waehle();
    return flaeche;
  }

  // DTB B2
  const themen = mischen(s.teil1Themen);
  const paarA = themen.slice(0, 2), paarB = themen.slice(2, 4);
  const schritte = [
    () => h("div",
      h("div.pr-teil-kopf", h("h2", "Teil 1: Über ein Thema sprechen"), h("p", s.hinweis || ""), liste(s.teil1Ablauf || []), zeitKnopf(2)),
      h("div.chat-start", [["A", paarA], ["B", paarB]].map(([wer, paar]) => h("div.pr-karte", h("div.pr-karte-wer", "Person " + wer + ": ein Thema wählen"),
        paar.map((t) => h("div.pr-thema", h("p", { style: { fontWeight: 650, margin: 0 } }, t.thema), aufklapp("Prüferfragen (1B)", liste(t.prueferfragen)))))))),
    () => h("div",
      h("div.pr-teil-kopf", h("h2", s.teil2.titel), h("p", s.teil2.situation), zeitKnopf(3)),
      h("div.chat-start", mischen(s.teil2.impulse).slice(0, 2).map((imp, i) => h("div.pr-karte", h("div.pr-karte-wer", i === 0 ? "B beginnt" : "Dann beginnt A"), h("p.pr-impuls", "„" + imp + "“"))))),
    () => { const sit = mischen(s.teil3.situationen)[0]; return h("div",
      h("div.pr-teil-kopf", h("h2", s.teil3.titel || "Teil 3: Lösungswege diskutieren"), h("p", s.teil3.anweisung), zeitKnopf(5)),
      h("div.pr-karte", h("div.pr-karte-wer", "Situation"), h("p", { style: { fontWeight: 650 } }, sit.situation), h("p", sit.aufgabe), h("div.pr-stichworte", sit.stichpunkte.map((x) => h("span", x))))); },
  ];
  let i = 0;
  const zeige = () => {
    stoppUhr();
    mount(flaeche,
      h("div.pr-kopf", h("strong", "DTB B2 Sprechen"), h("span.pr-stand", `Teil ${i + 1} von 3`)),
      schritte[i](),
      aufklapp("Redemittel", Object.entries(s.redemittel || {}).map(([k, l]) => h("div", h("h3", k), h("div.pr-rm-liste", l.map((r) => h("span.chat-reaktion", r)))))),
      h("div.reihe.zwischen", { style: { marginTop: "1.2rem" } },
        i > 0 ? h("button.btn", { onclick: () => { i--; zeige(); } }, icon("arrowL", 18), "Voriger Teil") : h("span"),
        i < 2 ? h("button.btn.primaer", { onclick: () => { i++; zeige(); } }, "Nächster Teil", icon("arrowR", 18))
          : h("button.btn.primaer", { onclick: () => { stoppUhr(); mount(flaeche, bewertung(s.bewertung, [10, 7.5, 4, 0])); } }, "Fertig: Selbsteinschätzung")));
    window.scrollTo(0, 0);
  };
  zeige();
  return flaeche;
}

/* ---------- Seite ---------- */
export default async function (ctx) {
  const aid = ctx.params.aid;
  const akt = aktivitaet(aid);
  const d = await ladePruefung(aid);
  let inhalt;
  if (aid === "pr-dtb-telefonnotiz") {
    const tn = d.telefonnotiz;
    inhalt = testAnsicht(ctx, aid, { titel: tn.titel || "Telefonnotiz", pruefung: "DTB B2", minuten: tn.minuten || 5, fertigkeit: "hoeren", notiz: true,
      teile: [{ titel: "Telefonnotiz", ziel: "Kundenanfragen dokumentieren", anweisung: tn.anweisung, hoertexte: [tn.hoertext], aufgaben: tn.aufgaben.map((a) => ({ ...a, hoertext: 0 })) }] });
  } else if (aid === "pr-dtz-schreiben") {
    const s = d.schreiben;
    inhalt = schreibAnsicht(ctx, aid, { titel: d.titel, pruefung: "DTZ", minuten: d.minuten || 30,
      varianten: s.aufgaben.map((a) => ({ ...a, redemittel: s.redemittel, checkliste: s.checkliste, muster: s.musterloesung[a.titel.slice(-1)], minWoerter: s.minWoerter })) });
  } else if (aid === "pr-dtb-schreiben") {
    const s = d.schreiben;
    const lesen = (await ladePruefung("pr-dtb-lesen")).lesenSchreiben;
    const rmMail = { Anrede: ["Sehr geehrter Herr …,", "Sehr geehrte Frau …,"], "Bedauern": ["vielen Dank für Ihre Nachricht.", "Es tut uns sehr leid, dass …", "Wir bedauern die Unannehmlichkeiten."], "Grund": ["Der Grund dafür ist, dass …", "Leider ist es zu … gekommen, weil …"], "Lösung": ["Ab sofort werden wir …", "Damit das nicht wieder passiert, …", "Als Entschuldigung bieten wir Ihnen … an."], Schluss: ["Für Rückfragen stehe ich Ihnen gern zur Verfügung.", "Mit freundlichen Grüßen"] };
    inhalt = schreibAnsicht(ctx, aid, { titel: "DTB B2 Schreiben", pruefung: "DTB", minuten: 30,
      varianten: [
        { titel: "Lesen & Schreiben: Antwort an einen Kunden", situation: lesen.schreibauftrag, leitpunkte: lesen.checkliste.slice(0, 4), material: lesen.material, redemittel: rmMail, checkliste: lesen.checkliste, muster: lesen.musterloesung, minWoerter: lesen.minWoerter || 100 },
        ...s.aufgaben.map((a) => ({ ...a, titel: "Forumsbeitrag: " + a.titel, redemittel: s.redemittel, checkliste: s.checkliste, muster: s.musterloesung[a.titel.slice(-1)], minWoerter: s.minWoerter })),
      ] });
  } else if (d.sprechen) {
    inhalt = sprechAnsicht(ctx, aid, d);
  } else {
    inhalt = testAnsicht(ctx, aid, { titel: d.titel, pruefung: d.pruefung, minuten: d.minuten, fertigkeit: d.fertigkeit, teile: d.teile });
  }
  ctx.render(
    h("a.zurueck", { href: "#/bereich/pruefung" }, icon("arrowL", 18), "Prüfungstraining"),
    h("header.seitenkopf", h("div", h("div.reihe", h("span.chip.petrol", akt ? akt.pruefung : ""), h("h1", akt ? akt.titel : d.titel)), h("p", akt ? akt.text : ""))),
    inhalt);
}
