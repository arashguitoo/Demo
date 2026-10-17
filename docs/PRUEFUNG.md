# Format für Prüfungssätze (`assets/js/data/pruefung/<id>.js`)

Nachgebildet wird das **Format** von DTZ (g.a.s.t.) und DTB B2 (telc/BAMF). Alle Texte sind **eigene Inhalte**.

```js
export default {
  id: "pr-dtz-lesen", titel: "DTZ Lesen", pruefung: "DTZ", fertigkeit: "lesen", minuten: 45,
  teile: [
    {
      titel: "Teil 1", ziel: "Wegweiser und Verzeichnisse verstehen",
      anweisung: "Sie sind im Rathaus … In welches Stockwerk (a, b oder c) gehen Sie?",
      material: `<table>…</table>`,          // HTML, bleibt sichtbar (optional)
      hoertexte: [ … ],                       // nur bei Hören, s. u.
      aufgaben: [ /* Engine-Aufgaben wie in INHALTE.md */ ],
    },
  ],
};
```

## Aufgaben im Prüfungsformat

Alle Aufgabentypen aus `INHALTE.md` sind erlaubt. Zusätzlich:

- **Feste Reihenfolge mit Buchstaben** (Zuordnen, a/b/c im Prüfungsformat): Feld `fest: true` und `loesung` setzen.
  Dann wird **nicht** gemischt und die Lösung ist der Eintrag mit diesem Text:
  `{ typ: "mc", fest: true, frage: "26 Sie möchten in Ihrer Freizeit Kinder betreuen.", optionen: ["a","b","c","d","e","f","g","h","x"], loesung: "b" }`
  `{ typ: "luecke", fest: true, satz: "…(40) ___ Frau und ich …", optionen: ["a ihre","b meine","c seine"], loesung: "b meine" }`
- `nr`: Nummer der Aufgabe wie in der Prüfung (z. B. 21), optional.
- `hoertext`: Index in `hoertexte` des Teils (bei Hören).

## Hörtexte (Sprachausgabe des Browsers)

```js
hoertexte: [
  { titel: "Ansage 1", wiederholen: 1, sprecher: [
      { wer: "Ansage", stimme: "w", text: "Verehrte Fahrgäste, …" },
  ]},
  { titel: "Gespräch 1", sprecher: [
      { wer: "Frau Wilke", stimme: "w", text: "…" },
      { wer: "Herr Kern", stimme: "m", text: "…" },
  ]},
]
```
`wiederholen`: wie oft der Text in der Prüfung gehört wird (1 oder 2). Natürliche gesprochene Sprache, aber gut verständlich (wird per Sprachsynthese vorgelesen: keine Abkürzungen wie „z. B.“, Zahlen und Uhrzeiten so schreiben, wie man sie spricht, z. B. „neun Uhr sechsunddreißig“; Telefonnummern einzeln: „null – drei – null …“).

## Schreiben

```js
{ id: "pr-dtz-schreiben", titel, pruefung, fertigkeit: "schreiben", minuten: 30, schreiben: {
    aufgaben: [
      { titel: "Aufgabe A", situation: "…", leitpunkte: ["…","…","…","…"], textart: "E-Mail", adressat: "Herr Schmidt", formell: true },
      { titel: "Aufgabe B", … },
    ],
    redemittel: { "Anrede": ["Sehr geehrter Herr …,", …], "Einleitung": […], "Bitte": […], "Schluss": […] },
    checkliste: ["Anrede passt zum Adressaten", "Alle vier Leitpunkte bearbeitet", …],
    musterloesung: { A: "…", B: "…" },
    minWoerter: 80,
} }
```

## Sprechen

```js
{ id: "pr-dtz-sprechen", titel, pruefung, fertigkeit: "sprechen", sprechen: {
    teile: [
      { titel: "Teil 1: Über sich sprechen", minuten: 4, fuer: "beide", karte: { stichworte: ["Name","Geburtsort",…] },
        prueferfragen: ["…"], redemittel: ["…"] },
      { titel: "Teil 2: Über Erfahrungen sprechen", minuten: 6, fuer: "A|B", karteA: { bild: "🛒", beschreibung: "Foto: …", fragen: [...] }, karteB: {...}, redemittel: [...] },
      { titel: "Teil 3: Gemeinsam etwas planen", minuten: 6, fuer: "beide", karte: { situation, aufgabe, stichpunkte: [...] }, redemittel: [...] },
    ],
    bewertung: [ { kriterium: "Aufgabe erfüllt", stufen: [...] }, … ],
} }
```
