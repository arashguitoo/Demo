# Inhaltsformat (für alle Übungspakete)

Jedes Paket ist eine ES-Modul-Datei in `assets/js/data/inhalte/<id>.js` mit
`export default { … }`. Die `id` entspricht der Aktivität in `assets/js/data/katalog.js`.

```js
export default {
  id: "lp-a2-arzt",
  titel: "Beim Arzt",
  niveau: "A2",
  module: [
    { id: "woerter", titel: "Wörter: Körper und Beschwerden", fertigkeit: "wortschatz", aufgaben: [ … ] },
    { id: "grammatik", titel: "Modalverben", fertigkeit: "grammatik", aufgaben: [ … ] },
    …
  ],
};
```

`fertigkeit` ∈ `wortschatz | grammatik | lesen | hoeren | schreiben | sprechen`.

## Aufgabentypen

**Die richtige Antwort steht IMMER an erster Stelle** von `optionen` – die Engine mischt.

| typ | Felder | Hinweis |
|---|---|---|
| `info` | `titel`, `html` | Erklärkasten ohne Punkte (Grammatik kompakt). Einfaches HTML: `<p>`, `<b>`, `<ul><li>`, `<table>` mit `<tr><th><td>`. Kurz halten, Beispiele fett. |
| `mc` | `frage` (HTML erlaubt), `optionen` (3–4), `erklaerung?` | |
| `luecke` | `satz` mit genau einem `___`, `optionen` (3–4), `anweisung?`, `erklaerung?` | |
| `rf` | `aussage`, `richtig` (true/false), `erklaerung?` | |
| `paare` | `paare: [[links, rechts], …]` (4–6 Paare), `anweisung?` | Zählt als eine Aufgabe. Rechte Seiten müssen eindeutig sein. |
| `satzbau` | `woerter: [...]` in richtiger Reihenfolge (Satzzeichen ans letzte Wort hängen), `alternativen?: ["andere korrekte Reihenfolge als String"]`, `hinweis?` | 4–9 Kacheln. Mehrwortkacheln erlaubt („zum Arzt“). Alle korrekten Wortstellungen als Alternativen angeben! |
| `sortieren` | `anweisung`, `gruppen: { "der": [..], "die": [..], "das": [..] }` | 2–4 Gruppen, insgesamt 8–12 Wörter. Gruppennamen kurz. |
| `lesen` | `titel?`, `text` (HTML, `<p>`), `fragen: [mc|rf …]` | Text bleibt beim Beantworten sichtbar. 3–5 Fragen. |

`erklaerung` = ein kurzer Satz, warum die Lösung stimmt (wird nach der Antwort gezeigt). Bei Grammatik immer angeben.

## Sprache und Inhalt

- Lebensnah für Erwachsene in Integrations- und Berufssprachkursen in Deutschland (Kiel, Norddeutschland darf vorkommen).
- Vielfältige Namen (Amira, Jonas, Olena, Tarek, Frau Schulz, Herr Yılmaz …).
- Niveau streng einhalten (A1: Präsens, kurze Hauptsätze; A2: Perfekt, Modalverben, weil/dass; B1: Nebensätze, Konnektoren, formelle Briefe; B2: Passiv, Nominalisierung, Berufswelt).
- Keine Religion, keine Politik, keine Klischees. Keine Text-Eingabe-Aufgaben.
- Korrekte deutsche Rechtschreibung, typografische Anführungszeichen „…“ (in JS-Strings als `„` und `“` oder direkt, aber nie ein gerades `"` nach einem öffnenden „ innerhalb eines "…"-Strings – lieber Strings mit Backticks oder `'` begrenzen).
- Keine Lehrbuchtitel, keine „Lektion …“-Angaben.
