/* Wortschatz A1: der, die oder das? */
const ANW = "der, die oder das? Tippe auf die richtige Spalte.";

export default {
  id: "ws-artikel",
  titel: "der, die oder das?",
  niveau: "A1",
  module: [
    {
      id: "runde1",
      titel: "Runde 1: In der Wohnung",
      fertigkeit: "wortschatz",
      aufgaben: [
        { typ: "info", titel: "Vier Merkregeln", html:
          "<ul>" +
          "<li>Wörter auf <b>-ung</b> sind feminin: <b>die Wohnung, die Zeitung</b></li>" +
          "<li>Wörter auf <b>-heit</b> und <b>-keit</b> sind feminin: <b>die Gesundheit, die Möglichkeit</b></li>" +
          "<li>Wörter auf <b>-chen</b> sind neutral: <b>das Mädchen, das Brötchen</b></li>" +
          "<li>Wochentage, Monate und Jahreszeiten sind maskulin: <b>der Montag, der Mai, der Sommer</b></li>" +
          "</ul><p>Lerne Nomen immer mit Artikel!</p>" },
        { typ: "sortieren", anweisung: ANW, gruppen: {
          der: ["Tisch", "Stuhl", "Schrank", "Balkon"],
          die: ["Wohnung", "Lampe", "Küche"],
          das: ["Bett", "Sofa", "Bad", "Fenster"],
        } },
        { typ: "sortieren", anweisung: ANW, gruppen: {
          der: ["Teppich", "Kühlschrank", "Spiegel"],
          die: ["Tür", "Heizung", "Dusche", "Treppe"],
          das: ["Regal", "Zimmer", "Kissen"],
        } },
        { typ: "sortieren", anweisung: "Denk an die Regeln!", gruppen: {
          der: ["Montag", "Sonntag", "Winter"],
          die: ["Zeitung", "Rechnung", "Krankheit"],
          das: ["Mädchen", "Brötchen", "Häuschen"],
        } },
      ],
    },
    {
      id: "runde2",
      titel: "Runde 2: Essen und Trinken",
      fertigkeit: "wortschatz",
      aufgaben: [
        { typ: "sortieren", anweisung: ANW, gruppen: {
          der: ["Apfel", "Käse", "Kaffee", "Reis"],
          die: ["Milch", "Banane", "Butter", "Tomate"],
          das: ["Brot", "Ei", "Wasser", "Brötchen"],
        } },
        { typ: "sortieren", anweisung: ANW, gruppen: {
          der: ["Tee", "Saft", "Kuchen"],
          die: ["Kartoffel", "Suppe", "Zwiebel"],
          das: ["Fleisch", "Obst", "Gemüse", "Salz"],
        } },
        { typ: "sortieren", anweisung: "Auf dem Tisch: der, die oder das?", gruppen: {
          der: ["Teller", "Löffel", "Becher"],
          die: ["Gabel", "Tasse", "Flasche"],
          das: ["Messer", "Glas", "Würstchen"],
        } },
      ],
    },
    {
      id: "runde3",
      titel: "Runde 3: Kleidung",
      fertigkeit: "wortschatz",
      aufgaben: [
        { typ: "sortieren", anweisung: ANW, gruppen: {
          der: ["Pullover", "Rock", "Schuh", "Mantel"],
          die: ["Hose", "Jacke", "Bluse"],
          das: ["Hemd", "Kleid", "T-Shirt"],
        } },
        { typ: "sortieren", anweisung: ANW, gruppen: {
          der: ["Schal", "Hut", "Gürtel"],
          die: ["Mütze", "Socke", "Brille", "Kleidung"],
          das: ["Halstuch", "Unterhemd", "Kostüm"],
        } },
      ],
    },
    {
      id: "runde4",
      titel: "Runde 4: Bei der Arbeit",
      fertigkeit: "wortschatz",
      aufgaben: [
        { typ: "sortieren", anweisung: ANW, gruppen: {
          der: ["Computer", "Drucker", "Kollege", "Termin"],
          die: ["Arbeit", "Pause", "Besprechung", "Firma"],
          das: ["Büro", "Telefon", "Handy"],
        } },
        { typ: "sortieren", anweisung: ANW, gruppen: {
          der: ["Chef", "Vertrag", "Lohn"],
          die: ["Schicht", "Kollegin", "Bewerbung", "Ausbildung"],
          das: ["Werkzeug", "Gehalt", "Lager"],
        } },
        { typ: "sortieren", anweisung: "Denk an die Regeln!", gruppen: {
          der: ["Freitag", "Urlaub", "Feierabend"],
          die: ["Krankmeldung", "Pünktlichkeit", "Sicherheit"],
          das: ["Formular", "Päckchen", "Wochenende"],
        } },
      ],
    },
  ],
};
