/* ==========================================================
   Übungs-Engine
   Aufgabentypen (Konvention: richtige Option steht immer zuerst,
   die Engine mischt):
     info      { titel, html }                       Erklärung, ohne Punkte
     mc        { frage, optionen[], erklaerung? }
     luecke    { satz:"… ___ …", optionen[], erklaerung? }
     rf        { aussage, richtig:bool, erklaerung? }
     paare     { anweisung?, paare:[[links, rechts], …] }
     satzbau   { woerter[] (in richtiger Reihenfolge), alternativen?[], hinweis? }
     sortieren { anweisung, gruppen:{ Name:[…], … } }
     lesen     { titel?, text, fragen:[mc|rf …] }   Text bleibt sichtbar
   Falsche Aufgaben kommen am Ende noch einmal (ohne Punkte).
   ========================================================== */
import { h, mount, icon } from "../core/ui.js";

export const mischen = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const norm = (s) => String(s).toLowerCase().replace(/[.,!?;:„“"'«»]/g, "").replace(/\s+/g, " ").trim();

/** Aufgabenliste aufbereiten: Lesetexte in Einzelfragen zerlegen */
export function vorbereiten(aufgaben) {
  const out = [];
  for (const a of aufgaben) {
    if (a.typ === "lesen") a.fragen.forEach((f, i) => out.push({ ...f, text: a.text, textTitel: a.titel, teil: `${i + 1}/${a.fragen.length}` }));
    else out.push(a);
  }
  return out;
}
export const zaehlt = (a) => a.typ !== "info";

/**
 * Spielt eine Aufgabenliste ab.
 * @param {HTMLElement} ziel
 * @param {object} opt { aufgaben, titel, farbe, onEnde(punkte, max, fehler) }
 */
export function spielen(ziel, { aufgaben, titel, onEnde, wiederholen = true }) {
  const liste = vorbereiten(aufgaben);
  const max = liste.filter(zaehlt).length;
  const queue = liste.map((a, i) => ({ a, i, zweiter: false }));
  let punkte = 0, erledigt = 0;
  const fehler = [];
  const fortschritt = h("div.sp-fortschritt", h("i"));
  const zaehler = h("span.sp-zaehler");
  const buehne = h("div.sp-buehne");
  mount(ziel, h("div.spiel", h("div.sp-kopf", h("strong", titel), zaehler), fortschritt, buehne));

  function weiter() {
    const total = liste.length;
    fortschritt.firstChild.style.width = Math.round((erledigt / total) * 100) + "%";
    zaehler.textContent = max ? `${punkte} von ${max} richtig` : "";
    const item = queue.shift();
    if (!item) { onEnde && onEnde(punkte, max, fehler); return; }
    const { a } = item;
    const fertig = (ok, loesungText) => {
      if (zaehlt(a) && !item.zweiter) { if (ok) punkte++; else fehler.push(a); }
      if (!ok && wiederholen && zaehlt(a)) queue.push({ ...item, zweiter: true });
      if (!item.zweiter || ok || !wiederholen) erledigt++;
      zaehler.textContent = max ? `${punkte} von ${max} richtig` : "";
      return rueckmeldung(ok, loesungText, a.erklaerung, weiter, item.zweiter);
    };
    const karte = RENDER[a.typ] ? RENDER[a.typ](a, fertig, item.zweiter) : h("p", "Unbekannter Aufgabentyp: " + a.typ);
    mount(buehne, item.zweiter ? h("p.sp-nochmal", icon("clock", 16), "Noch einmal: diese Aufgabe war vorhin falsch.") : null,
      a.text ? h("details.sp-text", { open: true }, h("summary", a.textTitel || "Text"), h("div.sp-text-inhalt", { html: a.text })) : null,
      karte);
    const f = buehne.querySelector("button:not([disabled])"); if (f) f.focus({ preventScroll: true });
    buehne.scrollIntoView({ block: "nearest" });
  }
  weiter();
}

function rueckmeldung(ok, loesung, erklaerung, weiter, zweiter) {
  return h("div.sp-rm." + (ok ? "ok" : "falsch"), { role: "status" },
    h("div.sp-rm-text",
      h("strong", ok ? (zweiter ? "Jetzt stimmt’s." : pick(["Richtig!", "Genau!", "Sehr gut!", "Stimmt!"])) : "Leider nicht."),
      !ok && loesung ? h("span", "Richtig ist: ", h("b", loesung)) : null,
      erklaerung ? h("span.sp-erkl", erklaerung) : null),
    h("button.btn.primaer", { onclick: weiter, autofocus: true }, "Weiter", icon("arrowR", 18)));
}
const pick = (a) => a[Math.floor(Math.random() * a.length)];

/* Nach Antwort: Rückmeldung unter der Karte einhängen und Eingaben sperren */
function abschliessen(karte, rm) {
  karte.querySelectorAll("button").forEach((b) => (b.disabled = true));
  karte.after(rm);
  rm.querySelector("button").focus();
}

const RENDER = {
  info(a, fertig) {
    return h("div.sp-karte.info", h("h2", a.titel), h("div.sp-info", { html: a.html }),
      h("button.btn.primaer", { onclick: (e) => { e.target.closest(".sp-karte").remove(); fertig(true).querySelector("button").click(); } }, "Verstanden, weiter", icon("arrowR", 18)));
  },

  mc(a, fertig) {
    const richtig = a.loesung ?? a.optionen[0];
    const karte = h("div.sp-karte", a.teil ? h("div.sp-teil", "Frage " + a.teil) : null, h("p.sp-frage", a.nr ? h("span.sp-nr", a.nr) : null, h("span", { html: a.frage })),
      h("div.sp-optionen" + (a.fest && a.optionen.every((o) => o.length <= 2) ? ".buchstaben" : ""), (a.fest ? a.optionen : mischen(a.optionen)).map((o) => h("button.sp-opt", { onclick: (e) => {
        const ok = o === richtig;
        e.currentTarget.classList.add(ok ? "ok" : "falsch");
        if (!ok) karte.querySelectorAll(".sp-opt").forEach((b) => { if (b.dataset.o === richtig) b.classList.add("ok"); });
        abschliessen(karte, fertig(ok, ok ? null : richtig));
      }, "data-o": o, html: o }))));
    return karte;
  },

  luecke(a, fertig) {
    const richtig = a.loesung ?? a.optionen[0];
    const [vor, nach] = a.satz.split("___");
    const luecke = h("span.sp-luecke", "    ");
    const karte = h("div.sp-karte", a.anweisung ? h("p.sp-anw", a.anweisung) : null,
      h("p.sp-satz", a.nr ? h("span.sp-nr", a.nr) : null, vor, luecke, nach),
      h("div.sp-optionen.kurz", (a.fest ? a.optionen : mischen(a.optionen)).map((o) => h("button.sp-opt", { "data-o": o, onclick: (e) => {
        const ok = o === richtig;
        luecke.textContent = o; luecke.classList.add(ok ? "ok" : "falsch");
        e.currentTarget.classList.add(ok ? "ok" : "falsch");
        if (!ok) karte.querySelectorAll(".sp-opt").forEach((b) => { if (b.dataset.o === richtig) b.classList.add("ok"); });
        abschliessen(karte, fertig(ok, ok ? null : richtig));
      } }, o))));
    return karte;
  },

  rf(a, fertig) {
    const karte = h("div.sp-karte", a.teil ? h("div.sp-teil", "Aussage " + a.teil) : null, h("p.sp-frage", a.nr ? h("span.sp-nr", a.nr) : null, a.aussage),
      h("div.sp-optionen.zwei", [true, false].map((w) => h("button.sp-opt", { onclick: (e) => {
        const ok = w === a.richtig;
        e.currentTarget.classList.add(ok ? "ok" : "falsch");
        abschliessen(karte, fertig(ok, ok ? null : a.richtig ? "richtig" : "falsch"));
      } }, w ? "richtig" : "falsch"))));
    return karte;
  },

  paare(a, fertig) {
    const links = mischen(a.paare.map((p, i) => ({ t: p[0], i })));
    const rechts = mischen(a.paare.map((p, i) => ({ t: p[1], i })));
    let wahl = null, fehlerZahl = 0, geschafft = 0;
    const knopf = (x, seite) => h("button.sp-paar", { "data-i": x.i, "data-s": seite, onclick: (e) => {
      const b = e.currentTarget;
      if (b.classList.contains("fertig")) return;
      if (!wahl || wahl.dataset.s === seite) { if (wahl) wahl.classList.remove("gewaehlt"); wahl = b; b.classList.add("gewaehlt"); return; }
      if (wahl.dataset.i === b.dataset.i) {
        [wahl, b].forEach((x) => { x.classList.remove("gewaehlt"); x.classList.add("fertig"); x.disabled = true; x.style.setProperty("--n", geschafft % 6); });
        geschafft++; wahl = null;
        if (geschafft === a.paare.length) abschliessen(karte, fertig(fehlerZahl <= Math.floor(a.paare.length / 4), fehlerZahl ? `${fehlerZahl} Fehlversuch${fehlerZahl > 1 ? "e" : ""}` : null));
      } else {
        fehlerZahl++;
        const w = wahl; [w, b].forEach((x) => x.classList.add("wackeln"));
        setTimeout(() => { [w, b].forEach((x) => x.classList.remove("wackeln", "gewaehlt")); }, 450);
        wahl = null;
      }
    } }, x.t);
    const karte = h("div.sp-karte", h("p.sp-anw", a.anweisung || "Was passt zusammen? Tippe links und dann rechts."),
      h("div.sp-paare", h("div", links.map((x) => knopf(x, "l"))), h("div", rechts.map((x) => knopf(x, "r")))));
    return karte;
  },

  satzbau(a, fertig) {
    const loesungen = [a.woerter.join(" "), ...(a.alternativen || [])].map(norm);
    const kacheln = mischen(a.woerter.map((w, i) => ({ w, i })));
    // Mischen, bis es nicht zufällig schon stimmt
    for (let k = 0; k < 5 && kacheln.map((x) => x.w).join(" ") === a.woerter.join(" ") && a.woerter.length > 1; k++) kacheln.reverse();
    const zeile = h("div.sp-zeile", { "aria-label": "Dein Satz" });
    const vorrat = h("div.sp-vorrat");
    const pruefen = h("button.btn.primaer", { disabled: true, onclick: () => {
      const satz = [...zeile.children].map((b) => b.textContent).join(" ");
      const ok = loesungen.includes(norm(satz));
      zeile.classList.add(ok ? "ok" : "falsch");
      abschliessen(karte, fertig(ok, ok ? null : a.woerter.join(" ")));
    } }, "Prüfen");
    const tausch = (b) => {
      (b.parentElement === vorrat ? zeile : vorrat).appendChild(b);
      pruefen.disabled = vorrat.children.length > 0;
    };
    kacheln.forEach((x) => vorrat.appendChild(h("button.sp-wort", { onclick: (e) => tausch(e.currentTarget) }, x.w)));
    const karte = h("div.sp-karte", h("p.sp-anw", a.anweisung || "Bilde den Satz. Tippe die Wörter in der richtigen Reihenfolge."),
      a.hinweis ? h("p.sp-hinweis", a.hinweis) : null, zeile, vorrat, h("div.reihe", pruefen));
    return karte;
  },

  sortieren(a, fertig) {
    const gruppen = Object.keys(a.gruppen);
    const woerter = mischen(gruppen.flatMap((g) => a.gruppen[g].map((w) => ({ w, g }))));
    let idx = 0, fehlerZahl = 0;
    const aktuell = h("div.sp-aktuell");
    const spalten = Object.fromEntries(gruppen.map((g) => [g, h("div.sp-spalte-inhalt")]));
    const zeige = () => {
      if (idx >= woerter.length) {
        mount(aktuell, h("span.sp-hinweis", "Alles einsortiert."));
        abschliessen(karte, fertig(fehlerZahl <= Math.floor(woerter.length / 5), fehlerZahl ? `${fehlerZahl} Fehler beim Sortieren` : null));
        return;
      }
      mount(aktuell, h("span.sp-wort.gross", woerter[idx].w));
    };
    const karte = h("div.sp-karte", h("p.sp-anw", a.anweisung),
      aktuell,
      h("div.sp-spalten", { style: { "--n": gruppen.length } }, gruppen.map((g) => h("div.sp-spalte",
        h("button.btn.sp-ziel", { onclick: (e) => {
          const x = woerter[idx]; if (!x) return;
          if (x.g === g) { spalten[g].appendChild(h("span.sp-einsortiert", x.w)); idx++; zeige(); }
          else { fehlerZahl++; const b = e.currentTarget; b.classList.add("wackeln"); setTimeout(() => b.classList.remove("wackeln"), 450); }
        } }, g), spalten[g]))));
    zeige();
    return karte;
  },
};
