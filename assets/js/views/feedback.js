/* Feedbackseite: Lehrkraft (für eine Person, mit Bearbeiten) und Lernende (eigene Seite) */
import { h, icon, mount, isoTag, datumKurz, datumLang, seit, prozent, toast } from "../core/ui.js";
import { ergebnisListe, fertigkeiten, unterrichtstage, anwesenheit, prognoseDTZ, prognoseDTB, ampel, STATUS } from "../core/auswertung.js";
import { FERTIGKEITEN, aktivitaet } from "../data/katalog.js";

export default async function (ctx) {
  const { store, session } = ctx;
  const S = ctx.schule();
  const istLk = session.rolle === "lehrkraft";
  const stid = istLk ? ctx.params.stid : session.studentId;
  const s = await store.get(`${S}/students/${stid}`);
  if (!s) { ctx.render(h("h1", "Person nicht gefunden"), h("a", { href: "#/lernende" }, "Zur Liste")); return; }
  const kid = s.klasseId;
  const [klasse, buch] = await Promise.all([store.get(`${S}/klassen/${kid}`), store.get(`${S}/klassenbuch/${kid}`)]);
  const box = h("div");
  let erg = [], anwKlasse = {}, rm = null, abgabenListe = [];

  function zeichne() {
    const gestern = isoTag(new Date(Date.now() - 864e5));
    const tage = klasse ? unterrichtstage(klasse, buch || {}, gestern) : [];
    const a = anwesenheit(stid, tage, anwKlasse);
    const f = fertigkeiten(erg);
    const woche = erg.filter((e) => e.ts > Date.now() - 7 * 864e5).length;
    const schnitt = erg.length ? Math.round((erg.slice(0, 30).reduce((x, e) => x + e.punkte / e.max, 0) / Math.min(30, erg.length)) * 100) : null;
    const prog = klasse && klasse.pruefung === "DTZ" ? prognoseDTZ(erg) : klasse && klasse.pruefung === "DTB" ? prognoseDTB(erg) : null;
    const du = !istLk;

    mount(box,
      istLk ? h("a.zurueck.kein-druck", { href: "#/klasse/" + kid }, icon("arrowL", 18), klasse ? klasse.name : "Klasse") : null,
      h("header.seitenkopf",
        h("div.reihe", { style: { gap: "1rem", alignItems: "center" } },
          h("div.avatar.gross", s.vorname[0]),
          h("div", h("h1", du ? "Mein Fortschritt" : s.vorname),
            h("p", [du ? s.vorname : null, klasse ? klasse.name : null, klasse ? "Niveau " + klasse.niveau : null].filter(Boolean).join(", ")))),
        h("button.btn.kein-druck", { onclick: () => window.print() }, icon("print"), "Drucken")),
      h("p.nur-druck.leise", `Stand: ${datumLang(isoTag())}`),

      h("div.kennzahlen",
        h("div.kennzahl", h("b", a.quote == null ? "–" : a.quote + " %"), h("span", "Anwesenheit")),
        h("div.kennzahl", h("b", erg.length), h("span", "Übungen insgesamt")),
        h("div.kennzahl", h("b", woche), h("span", "in den letzten 7 Tagen")),
        h("div.kennzahl", h("b", schnitt == null ? "–" : schnitt + " %"), h("span", "Durchschnitt"))),

      h("div.raster-2.abschnitt",
        h("section.flaeche",
          h("h2", "Fertigkeiten"),
          h("p.klein.leise", du ? "Durchschnitt deiner letzten Übungen. Ab 70 % bist du sicher." : "Durchschnitt der letzten Übungen je Fertigkeit. Ab 70 % sicher, unter 50 % üben."),
          h("div.fertigkeiten", Object.entries(FERTIGKEITEN).map(([k, name]) => {
            const v = f[k];
            return h("div.fk-zeile",
              h("span.fk-name", name),
              h("div.balken." + ampel(v && v.prozent), { role: "img", "aria-label": v ? `${name}: ${v.prozent} Prozent` : `${name}: noch keine Übung` }, h("i", { style: { width: (v ? v.prozent : 0) + "%" } })),
              h("span.fk-wert", v ? v.prozent + " %" : "–"),
              h("span.fk-trend", { title: v && v.trend > 0 ? "steigt" : v && v.trend < 0 ? "sinkt" : "" }, v && v.trend > 0 ? "↗" : v && v.trend < 0 ? "↘" : ""));
          }))),
        prog ? prognoseBox(prog, du) : h("section.flaeche", h("h2", "Prüfung"), h("p.leise", "Für diese Klasse ist kein Prüfungsziel eingetragen."))),

      h("section.abschnitt", h("h2", du ? "Rückmeldung deiner Lehrkraft" : "Rückmeldung"), rueckmeldung(du)),
      abgabenListe.length ? h("section.abschnitt", h("h2", du ? "Meine Texte" : "Geschriebene Texte"), abgabenAnsicht(du)) : null,

      h("div.raster-2.abschnitt",
        h("section",
          h("h2", "Anwesenheit"),
          h("div.flaeche",
            h("div.anw-zahlen",
              [["da", "anwesend"], ["spaet", "verspätet"], ["frueh", "früher gegangen"], ["entsch", "entschuldigt"], ["fehlt", "unentschuldigt"]].map(([k, t]) => h("div", h("b", a[k]), h("span", t)))),
            h("div.anw-streifen", { "aria-label": "Letzte Unterrichtstage" }, tage.slice(-20).map((t) => {
              const e = anwKlasse[t] && anwKlasse[t][stid];
              return h("span.anw-" + (e ? e.status : "offen"), { title: `${datumKurz(t)}: ${e ? STATUS[e.status].text : "nicht erfasst"}` });
            })),
            h("p.klein.leise", { style: { margin: ".6rem 0 0" } }, `Die letzten ${Math.min(20, tage.length)} Unterrichtstage, der jüngste rechts.`))),
        h("section",
          h("h2", "Zuletzt geübt"),
          erg.length ? h("ul.liste", erg.slice(0, 8).map((e) => {
            const akt = aktivitaet(e.aktivitaet); const p = prozent(e.punkte, e.max);
            return h("li", h("div.wachsen", h("div.titel", akt ? akt.titel : e.aktivitaet), h("div.unter", `${FERTIGKEITEN[e.fertigkeit] || ""}, ${seit(e.ts)}`)),
              h("span.klein.leise", `${e.punkte}/${e.max}`), h("span.chip." + ampel(p), p + " %"));
          })) : h("div.flaeche.leer", du ? "Du hast noch nichts geübt. Fang im Lernpfad an!" : "Noch keine Übungen."))));
  }

  function prognoseBox(p, du) {
    const farbe = !p.ergebnis ? "" : /^B1$|^bestanden$/.test(p.ergebnis) ? "gut" : p.ergebnis === "A2" ? "mittel" : "schlecht";
    return h("section.flaeche.prognose",
      h("div.reihe.zwischen", h("h2", { style: { margin: 0 } }, `Prognose ${p.pruefung}`),
        p.ergebnis ? h("span.prognose-ergebnis." + farbe, p.pruefung === "DTZ" ? (p.ergebnis === "kein Zertifikat" ? "kein Zertifikat" : "Zertifikat " + p.ergebnis) : p.ergebnis) : h("span.chip", "noch offen")),
      h("p.klein.leise", "Aus den letzten Probeprüfungen, gerechnet nach den offiziellen Bestehensregeln."),
      p.teile.map((t) => {
        const proz = t.wert == null ? 0 : (t.wert / t.max) * 100;
        const grenze = p.pruefung === "DTZ" ? { "Hören und Lesen": 33 / 45, Schreiben: 15 / 20, Sprechen: 75 / 100 }[t.name] * 100 : 60;
        return h("div.prog-teil",
          h("div.reihe.zwischen", h("span", { style: { fontWeight: 700 } }, t.name), h("span", t.wert == null ? h("span.sehr-leise", "noch keine Probe") : `${t.wert} von ${t.max}`)),
          h("div.prog-balken", h("i." + (t.wert == null ? "" : proz >= grenze ? "gut" : proz >= (p.pruefung === "DTZ" ? grenze * 0.6 : 40) ? "mittel" : "schlecht"), { style: { width: proz + "%" } }),
            h("span.prog-grenze", { style: { left: grenze + "%" }, title: t.grenzeText })),
          h("div.klein.sehr-leise", t.grenzeText));
      }),
      p.summe != null ? h("p", { style: { margin: ".6rem 0 0", fontWeight: 700 } }, `Gesamt: ${p.summe} von ${p.maxSumme} Punkten (nötig: 144)`) : null,
      p.fehlend.length ? h("p.klein", { style: { margin: ".6rem 0 0" } }, (du ? "Für eine Prognose fehlt noch: " : "Es fehlt noch: ") + p.fehlend.join(", ")) : null,
      h("p.klein.leise", { style: { margin: ".6rem 0 0" } }, p.regel));
  }

  function abgabenAnsicht(du) {
    return h("div.abgaben", abgabenListe.map((ab) => {
      const akt = aktivitaet(ab.aktivitaet);
      const bewertet = ab.bewertung != null;
      return h("details.flaeche", { open: !du && !bewertet },
        h("summary.reihe.zwischen", { style: { cursor: "pointer" } },
          h("span", h("b", (akt ? akt.titel : ab.aktivitaet) + ": " + ab.aufgabe), h("span.klein.leise", `  ${ab.woerter} Wörter, ${seit(ab.ts)}`)),
          bewertet ? h("span.chip." + (ab.bewertung / ab.max >= 0.75 ? "gut" : ab.bewertung / ab.max >= 0.35 ? "mittel" : "schlecht"), `${ab.bewertung} von ${ab.max} Punkten`) : h("span.chip.mittel", "noch nicht bewertet")),
        ab.situation ? h("p.klein.leise", ab.situation) : null,
        h("div.pr-abgabe", ab.text),
        ab.kommentar ? h("p", h("b", "Kommentar: "), ab.kommentar) : null,
        !du ? bewertungsForm(ab) : null);
    }));
  }
  function bewertungsForm(ab) {
    const max = 20;
    const kriterien = ["Aufgabe erfüllt (Leitpunkte)", "Kommunikative Gestaltung", "Korrektheit", "Wortschatz"];
    const sel = kriterien.map((k) => h("label.feld", k, h("select", [5, 4, 3, 2, 1, 0].map((p) => h("option", { value: p }, `${p} Punkte`)))));
    const komm = h("textarea", { rows: 2, placeholder: "Kurzer Kommentar (optional)" }, ab.kommentar || "");
    return h("form.formular", { style: { marginTop: "1rem" }, onsubmit: async (e) => {
      e.preventDefault();
      const punkte = sel.reduce((s, l) => s + Number(l.querySelector("select").value), 0);
      const akt = aktivitaet(ab.aktivitaet);
      await store.update("", {
        [`${S}/abgaben/${stid}/${ab.id}/bewertung`]: punkte, [`${S}/abgaben/${stid}/${ab.id}/max`]: max,
        [`${S}/abgaben/${stid}/${ab.id}/kommentar`]: komm.value.trim() || null,
        [`${S}/ergebnisse/${stid}/a_${ab.id}`]: { aktivitaet: ab.aktivitaet, modul: "bewertet", fertigkeit: (akt && akt.fertigkeit) || "schreiben", punkte, max, ts: ab.ts, bewertetVon: session.name },
      });
      toast(`Bewertet: ${punkte} von ${max} Punkten`);
    } },
      h("div.spalten-2", sel), komm,
      h("div.reihe", h("button.btn.primaer", { type: "submit" }, ab.bewertung != null ? "Bewertung ändern" : "Bewerten"), h("span.klein.leise", "Kriterien wie im DTZ: je 0–5 Punkte. Die Punkte fließen in die Prognose ein.")));
  }

  function rueckmeldung(du) {
    const r = rm || {};
    if (du) {
      if (!r.staerken && !r.ziele) return h("div.flaeche.leer", "Deine Lehrkraft hat noch keine Rückmeldung geschrieben.");
      return h("div.flaeche.rm",
        h("div", h("h3", "Das kannst du gut"), h("p", r.staerken || "–")),
        h("div", h("h3", "Daran arbeitest du als Nächstes"), h("p", r.ziele || "–")),
        r.aktualisiert ? h("p.klein.sehr-leise", { style: { gridColumn: "1/-1", margin: 0 } }, `${r.von || "Lehrkraft"}, ${datumKurz(new Date(r.aktualisiert))}`) : null);
    }
    const form = h("form.flaeche.rm", { onsubmit: async (e) => {
      e.preventDefault();
      await store.set(`${S}/rueckmeldung/${stid}`, { staerken: form.staerken.value.trim(), ziele: form.ziele.value.trim(), aktualisiert: Date.now(), von: session.name });
      toast(`Rückmeldung für ${s.vorname} gespeichert`);
    } },
      h("label.feld", "Das kann die Person gut", h("textarea", { name: "staerken", rows: 3, placeholder: "Stärken, Fortschritte, was gut gelingt" }, r.staerken || "")),
      h("label.feld", "Nächste Ziele", h("textarea", { name: "ziele", rows: 3, placeholder: "Woran soll als Nächstes gearbeitet werden?" }, r.ziele || "")),
      h("div.reihe.zwischen.kein-druck", { style: { gridColumn: "1/-1" } },
        h("span.klein.leise", r.aktualisiert ? `Zuletzt gespeichert von ${r.von || "Lehrkraft"}, ${datumKurz(new Date(r.aktualisiert))}. ${s.vorname} sieht diese Rückmeldung.` : `${s.vorname} sieht diese Rückmeldung auf der eigenen Seite.`),
        h("button.btn.primaer", { type: "submit" }, "Rückmeldung speichern")));
    return form;
  }

  ctx.on(`${S}/ergebnisse/${stid}`, (v) => { erg = ergebnisListe(v); zeichne(); });
  if (istLk) ctx.on(`${S}/anwesenheit/${kid}`, (v) => { anwKlasse = v || {}; zeichne(); });
  else {
    // Lernende dürfen nur die eigenen Einträge lesen: Tag für Tag holen
    const tage = klasse ? unterrichtstage(klasse, buch || {}, isoTag()) : [];
    const werte = await Promise.all(tage.map((t) => store.get(`${S}/anwesenheit/${kid}/${t}/${stid}`).catch(() => null)));
    tage.forEach((t, i) => { if (werte[i]) anwKlasse[t] = { [stid]: werte[i] }; });
    zeichne();
  }
  ctx.on(`${S}/abgaben/${stid}`, (v) => {
    abgabenListe = Object.entries(v || {}).map(([id, x]) => ({ id, ...x })).sort((a, b) => b.ts - a.ts);
    const ae = document.activeElement;
    if (ae && box.contains(ae) && /TEXTAREA|SELECT/.test(ae.tagName)) return;
    zeichne();
  });
  ctx.on(`${S}/rueckmeldung/${stid}`, (v) => {
    rm = v;
    const ae = document.activeElement;
    if (ae && box.contains(ae) && ae.tagName === "TEXTAREA") return; // nicht beim Tippen neu zeichnen
    zeichne();
  });
  ctx.render(box);
}
