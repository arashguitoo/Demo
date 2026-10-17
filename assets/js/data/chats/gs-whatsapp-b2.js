/* Chat-Simulation B2: Teamgruppe der Frühschicht in einer Logistikfirma */
export default {
  id: "gs-whatsapp-b2",
  titel: "Team Frühschicht",
  niveau: "B2",
  gruppe: { name: "Lager Nord – Frühschicht", bild: "📦" },
  mitglieder: {
    kaya: { name: "Frau Kaya (Schichtleitung)", farbe: "#0b6b70" },
    milan: { name: "Milan", farbe: "#2b73ad" },
    sophie: { name: "Sophie", farbe: "#b5468b" },
    herr_brandt: { name: "Herr Brandt (Lagerleitung)", farbe: "#6f4b98" },
  },
  intro: "Du arbeitest seit drei Monaten im Lager einer Spedition in Kiel. In der Gruppe der Frühschicht werden Schichten, Probleme und Termine besprochen. Achte auf den richtigen Ton: kollegial unter Kolleg:innen, höflich gegenüber der Leitung.",
  szenen: [
    {
      nachrichten: [
        { von: "milan", text: "Moin zusammen! Kann jemand am Samstag meine Frühschicht übernehmen? Meine Schwester heiratet 💍" },
      ],
      aufgabe: { art: "bausteine", anweisung: "Biete Milan an, die Schicht zu übernehmen, wenn er dafür deinen Dienstag nimmt.",
        woerter: ["Ich", "kann", "übernehmen,", "wenn", "du", "dafür", "meinen", "Dienstag", "nimmst."], extra: ["nimmt", "wenn"],
        alternativen: ["Wenn du dafür meinen Dienstag nimmst, kann ich übernehmen."] },
      danach: [{ von: "milan", text: "Deal! Tausend Dank, du rettest mir das Wochenende 🙏" }],
    },
    {
      nachrichten: [{ von: "kaya", text: "Bitte denkt daran: Schichttausch muss ich vorher genehmigen. Schreibt mir kurz, wer wann arbeitet." }],
      aufgabe: { art: "auswahl", anweisung: "Informiere die Schichtleitung. Welche Nachricht passt am besten?",
        optionen: [
          { text: "Guten Morgen Frau Kaya, Milan und ich möchten tauschen: Ich übernehme seine Frühschicht am Samstag, er meine am Dienstag. Ist das in Ordnung?", rueckmeldung: "Genau: höflich, vollständig und mit einer klaren Frage." },
          { text: "Milan und ich tauschen. Passt schon.", rueckmeldung: "Zu knapp. Die Schichtleitung muss genehmigen, also fragen statt mitteilen." },
          { text: "Hey Frau Kaya, wir haben mal was getauscht 😉", rueckmeldung: "Der Ton ist zu locker und die Information fehlt: Wer, wann?" },
        ] },
      danach: [{ von: "kaya", text: "Danke für die Info. Genehmigt ✅" }],
    },
    {
      nachrichten: [
        { von: "sophie", text: "Leute, der Gabelstapler 3 macht wieder komische Geräusche beim Bremsen 😬" },
        { von: "milan", text: "Echt? Gestern war noch alles okay." },
      ],
      aufgabe: { art: "luecke", anweisung: "Ergänze den Satz für die Meldung.", satz: "Der Gabelstapler sollte sofort ___ und nicht mehr benutzt werden.", optionen: ["abgestellt", "abstellen", "abgestellt worden", "abzustellen"],
        erklaerung: "Passiv mit Modalverb: sollte + Partizip II + werden." },
      danach: [{ von: "kaya", text: "Richtig. Ich sperre ihn und rufe den Service an. Danke, Sophie, dass du es gemeldet hast!" }],
    },
    {
      nachrichten: [{ von: "herr_brandt", text: "Guten Morgen. Ein Kunde hat sich beschwert: Die Lieferung an die Firma Holm war gestern unvollständig. Wer hat die Kommissionierung gemacht?" }],
      aufgabe: { art: "bausteine", anweisung: "Antworte: Du hast sie gemacht, prüfst es gleich und meldest dich bis 10 Uhr.",
        woerter: ["Das", "war", "ich.", "Ich", "prüfe", "das", "sofort", "und", "melde", "mich", "bis", "10", "Uhr."], extra: ["mir", "meldet"],
        alternativen: [] },
      danach: [{ von: "herr_brandt", text: "Danke für die schnelle Rückmeldung." }],
    },
    {
      nachrichten: [{ von: "sophie", text: "Ich hab nachgeschaut: Zwei Paletten stehen noch an Rampe 4 – falsch etikettiert 🤦‍♀️" }],
      aufgabe: { art: "auswahl", anweisung: "Erkläre Herrn Brandt die Ursache und schlage eine Lösung vor.",
        optionen: [
          { text: "Die Ursache war ein falsches Etikett: Zwei Paletten sind an Rampe 4 geblieben. Ich schlage vor, dass sie heute mit der Nachlieferung um 13 Uhr rausgehen.", rueckmeldung: "Sachlich, mit Ursache und konkretem Vorschlag." },
          { text: "Sophie hat einen Fehler gemacht.", rueckmeldung: "Schuld zuweisen hilft nicht und stimmt so auch nicht." },
          { text: "Keine Ahnung, wie das passieren konnte.", rueckmeldung: "Die Ursache ist bekannt, und es fehlt ein Lösungsvorschlag." },
        ] },
      danach: [{ von: "herr_brandt", text: "Einverstanden. Bitte informieren Sie auch den Kunden kurz." }],
    },
    {
      nachrichten: [{ von: "kaya", text: "Wegen der Nachlieferung verschiebe ich die Teambesprechung von 13 auf 14 Uhr." }],
      aufgabe: { art: "bausteine", anweisung: "Frag nach, ob die Besprechung trotzdem im Pausenraum stattfindet.",
        woerter: ["Findet", "die", "Besprechung", "trotzdem", "im", "Pausenraum", "statt?"], extra: ["stattfindet", "Ob"],
        alternativen: ["Findet die Besprechung im Pausenraum trotzdem statt?"] },
      danach: [{ von: "kaya", text: "Ja, gleicher Raum. Und bringt bitte eure Vorschläge zum neuen Schichtplan mit 📋" }],
    },
    {
      nachrichten: [{ von: "milan", text: "Ich finde, wir sollten feste Pausenzeiten einführen. Was meint ihr?" }],
      aufgabe: { art: "luecke", anweisung: "Begründe deine Meinung.", satz: "Gute Idee, ___ dann nicht immer alle gleichzeitig in der Kantine sind.", optionen: ["weil", "deshalb", "trotzdem", "obwohl"],
        erklaerung: "„weil“ leitet einen Grund ein, das Verb steht am Ende." },
      danach: [{ von: "sophie", text: "Seh ich auch so 👍" }, { von: "kaya", text: "Gut, das besprechen wir um 14 Uhr. Schönen Feierabend später allen!" }],
    },
  ],
  abschluss: "Schicht geschafft! Du hast eine Schicht getauscht, einen Defekt gemeldet, eine Beschwerde geklärt und im richtigen Ton geschrieben.",
};
