/* Schnitzeljagd A2 für zwei Personen: „Der verlorene Schlüssel“
   Jede Person sieht nur ihren Teil (A oder B). Fragen beantwortet
   abwechselnd A oder B – die andere Person hilft mit ihrem Text.
   Richtige Option steht zuerst (wird gemischt). */
export default {
  id: "gs-schnitzeljagd",
  titel: "Der verlorene Schlüssel",
  niveau: "A2",
  intro: "Amira wohnt in der Werftstraße 9. Heute Morgen ist sie zur Arbeit gegangen – und hat ihren Schlüssel verloren! Zum Glück gibt es einen Ersatzschlüssel in einem Schlüsselkasten. Der Kasten hat ein Zahlenschloss mit drei Ziffern. Findet die Ziffern und öffnet den Kasten!",
  regeln: [
    "Ihr spielt zu zweit: Person A und Person B. Jede Person sieht nur ihren Teil.",
    "Lest euch eure Texte vor. Zeigt dem anderen nicht euren Bildschirm!",
    "Bei jeder Frage steht, wer antwortet. Die andere Person darf helfen.",
    "Jede Station bringt eine Ziffer. Mit drei Ziffern öffnet ihr den Kasten.",
  ],
  code: [4, 7, 2],
  stationen: [
    {
      titel: "Amiras Sprachnachricht", icon: "🎙️",
      auftrag: "Amira hat euch eine Sprachnachricht geschickt. Die Verbindung war schlecht: A hat den Anfang, B das Ende.",
      A: `<p>„Hallo, hier ist Amira! Ich habe ein großes Problem: Mein Wohnungsschlüssel ist weg. Heute Morgen habe ich die Tür abgeschlossen und bin zum Bus gegangen. Im Bus habe ich mein Handy aus der Tasche genommen …</p>`,
      B: `<p>… und bei der Arbeit war der Schlüssel nicht mehr da. Vielleicht ist er im Bus Nummer 4 runtergefallen. Aber keine Panik: Es gibt einen Ersatzschlüssel in einem Kasten im Hof. Die Nachbarin, Frau Petersen, kennt den Code. Sie ist ab vier Uhr zu Hause. Bitte helft mir!“</p>`,
      woerter: { "abschließen": "die Tür zumachen, mit dem Schlüssel", "runterfallen": "nach unten fallen", "der Ersatzschlüssel": "ein zweiter Schlüssel", "der Hof": "der Platz hinter dem Haus" },
      fragen: [
        { wer: "A", frage: "Was hat Amira im Bus aus der Tasche genommen?", optionen: ["ihr Handy", "ihren Schlüssel", "ihr Ticket"] },
        { wer: "B", frage: "Wo ist der Ersatzschlüssel?", optionen: ["in einem Kasten im Hof", "bei der Arbeit", "im Bus"] },
        { wer: "A", frage: "Ab wann ist Frau Petersen zu Hause? Das ist eure erste Ziffer!", optionen: ["4", "9", "6"], ziffer: true },
      ],
    },
    {
      titel: "Wo wohnt Frau Petersen?", icon: "🗺️",
      auftrag: "Ihr steht vor dem Haus Werftstraße 9. A hat Amiras Wegbeschreibung, B sieht die Klingelschilder in der Straße.",
      A: `<p><b>Amira schreibt:</b> „Frau Petersen wohnt nicht in meinem Haus. Geh aus meiner Haustür nach links. Am Bäcker vorbei, dann kommt ein Haus mit einer roten Tür. Dort wohnt sie, im Erdgeschoss. Auf ihrem Klingelschild ist eine kleine Katze.“</p>`,
      B: `<p><b>Das seht ihr in der Werftstraße (von links nach rechts):</b></p>
<ul><li>Nr. 3: Bäckerei Hansen</li><li>Nr. 5: Haus mit grüner Tür – Klingeln: Ahmadi, Lange, Petersen (2. Stock)</li><li>Nr. 7: Haus mit roter Tür – Klingeln: Kowalski, Petersen 🐱 (Erdgeschoss)</li><li>Nr. 9: Amiras Haus</li><li>Nr. 11: Apotheke</li></ul>`,
      woerter: { "das Klingelschild": "der Name an der Klingel", "das Erdgeschoss": "ganz unten im Haus, Stockwerk 0", "vorbei": "an etwas entlang und weiter" },
      fragen: [
        { wer: "B", frage: "Es gibt zwei Petersens! Welche Farbe hat die Tür von Amiras Nachbarin?", optionen: ["rot", "grün", "blau"] },
        { wer: "A", frage: "In welchem Stock wohnt sie?", optionen: ["im Erdgeschoss", "im 2. Stock", "im 1. Stock"] },
        { wer: "B", frage: "Welche Hausnummer hat Frau Petersen? Das ist eure zweite Ziffer!", optionen: ["7", "5", "3"], ziffer: true },
      ],
    },
    {
      titel: "Frau Petersens Rätsel", icon: "🧩",
      auftrag: "Frau Petersen macht gern Rätsel. Sie gibt euch den letzten Code nicht einfach so! A hat ihre Hinweise, B hat ihren Kalender.",
      A: `<p><b>Frau Petersen sagt:</b> „Die letzte Ziffer ist die Zahl der Tage in dieser Woche, an denen ich Sport mache. Aber nur die Tage <b>vor</b> dem Wochenende. Und Schwimmen zählt nicht – das ist für mich Erholung!“</p>`,
      B: `<p><b>Frau Petersens Wochenkalender:</b></p>
<table><tr><th>Tag</th><th>Termin</th></tr>
<tr><td>Montag</td><td>Yoga 18 Uhr</td></tr><tr><td>Dienstag</td><td>Arzt 10 Uhr</td></tr>
<tr><td>Mittwoch</td><td>Schwimmen 9 Uhr</td></tr><tr><td>Donnerstag</td><td>Fußball mit Enkel 16 Uhr</td></tr>
<tr><td>Freitag</td><td>Kino mit Ingrid</td></tr><tr><td>Samstag</td><td>Radtour 10 Uhr</td></tr></table>`,
      woerter: { "die Erholung": "Pause, ausruhen", "der Enkel": "das Kind von meinem Kind", "vor dem Wochenende": "Montag bis Freitag" },
      fragen: [
        { wer: "A", frage: "Welche Tage zählen für das Rätsel?", optionen: ["Montag bis Freitag", "nur Samstag und Sonntag", "alle Tage"] },
        { wer: "B", frage: "Was macht Frau Petersen am Mittwoch?", optionen: ["Sie geht schwimmen.", "Sie spielt Fußball.", "Sie geht zum Arzt."] },
        { wer: "A", frage: "Wie viele Tage zählen? Das ist eure dritte Ziffer!", optionen: ["2", "3", "4"], ziffer: true },
      ],
    },
  ],
  schluss: "Der Kasten ist offen! 🔑 Amira kann heute Abend in ihre Wohnung. Schreibt ihr zusammen eine kurze Nachricht: Wo ist der Schlüssel jetzt?",
};
