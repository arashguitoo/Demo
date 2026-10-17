/* Chat-Simulation A2: Die Kursgruppe plant ein Abschiedsfest
   aufgabe.art: bausteine (woerter = Lösung in Reihenfolge, extra = Ablenker)
                auswahl   (optionen: erste passt, rueckmeldung je Option)
                luecke    (satz mit ___, optionen: erste passt) */
export default {
  id: "gs-whatsapp",
  titel: "Die Kursgruppe",
  niveau: "A2",
  gruppe: { name: "Deutschkurs Mo–Fr 🌻", bild: "🌻" },
  mitglieder: {
    lena: { name: "Lena", farbe: "#b5468b" },
    tarek: { name: "Tarek", farbe: "#2b73ad" },
    olena: { name: "Olena", farbe: "#a96f17" },
    jonas: { name: "Jonas (Kursleiter)", farbe: "#0b6b70" },
  },
  intro: "Euer Kurs endet bald. Lena will für Herrn Weber ein Abschiedsfest organisieren. Du bist in der WhatsApp-Gruppe des Kurses. Lies die Nachrichten und antworte.",
  szenen: [
    {
      nachrichten: [
        { von: "lena", text: "Hallo zusammen! 👋 Unser Kurs ist in zwei Wochen zu Ende." },
        { von: "lena", text: "Ich möchte für Herrn Weber ein kleines Fest machen. Am Freitag nach dem Unterricht im Park. Wer kommt mit?" },
        { von: "tarek", text: "Super Idee! Ich bin dabei 🙌" },
      ],
      aufgabe: { art: "bausteine", anweisung: "Sag Lena: Du kommst gern.", woerter: ["Ich", "komme", "gern", "mit!"], extra: ["kommen", "Du"], alternativen: ["Gern komme ich mit!"] },
      danach: [{ von: "lena", text: "Toll! 😊" }],
    },
    {
      nachrichten: [{ von: "olena", text: "Ich komme auch. Aber wann genau? Ich muss um vier Uhr meine Tochter abholen." }],
      aufgabe: { art: "bausteine", anweisung: "Frag Lena nach der Uhrzeit.", woerter: ["Um", "wie", "viel", "Uhr", "fangen", "wir", "an?"], extra: ["Wann", "fängt"], alternativen: ["Wann fangen wir an?"] },
      danach: [{ von: "lena", text: "Um 13 Uhr, direkt nach dem Unterricht. Bis 15:30 ist Zeit 👍" }, { von: "olena", text: "Perfekt, das passt!" }],
    },
    {
      nachrichten: [{ von: "lena", text: "Jeder bringt etwas mit. Ich mache Kuchen 🎂 Tarek bringt Getränke. Und du?" }],
      aufgabe: { art: "auswahl", anweisung: "Was antwortest du?",
        optionen: [
          { text: "Ich bringe einen Nudelsalat mit 🥗", rueckmeldung: "Passt: Du sagst klar, was du mitbringst." },
          { text: "Ich mitbringe einen Salat.", rueckmeldung: "Fast! „mitbringen“ ist trennbar: Ich bringe … mit." },
          { text: "Ich habe einen Salat mitgebracht.", rueckmeldung: "Das ist Vergangenheit. Das Fest ist aber erst am Freitag." },
        ] },
      danach: [{ von: "lena", text: "Lecker! Danke 😋" }],
    },
    {
      nachrichten: [
        { von: "tarek", text: "Wo treffen wir uns genau? Der Park ist sehr groß 😅" },
        { von: "lena", text: "Am Spielplatz, neben dem Café am See." },
      ],
      aufgabe: { art: "luecke", anweisung: "Ergänze deine Nachricht.", satz: "Ich komme etwas später, ich habe um 13 Uhr einen Termin ___ Arzt.", optionen: ["beim", "bei der", "zum", "im"] },
      danach: [{ von: "lena", text: "Kein Problem! Gute Besserung schon mal 🍀" }],
    },
    {
      nachrichten: [{ von: "olena", text: "Wer kauft ein Geschenk für Herrn Weber? 🎁" }],
      aufgabe: { art: "bausteine", anweisung: "Schlag vor: Wir sammeln Geld und kaufen ein Buch.", woerter: ["Wir", "können", "Geld", "sammeln", "und", "ein", "Buch", "kaufen."], extra: ["kann", "kaufe"], alternativen: [] },
      danach: [{ von: "lena", text: "Gute Idee! Jeder gibt 3 Euro. Ich sammle am Montag 💶" }, { von: "tarek", text: "👍👍" }],
    },
    {
      nachrichten: [{ von: "jonas", text: "Hallo zusammen, ich habe gerade den Wetterbericht gelesen: Am Freitag soll es regnen ☔ Vielleicht lieber drinnen?" }],
      aufgabe: { art: "auswahl", anweisung: "Antworte deinem Kursleiter höflich.",
        optionen: [
          { text: "Danke für den Tipp! Wir können vielleicht ins Café am See gehen.", rueckmeldung: "Höflich und mit Vorschlag. Sehr gut!" },
          { text: "Egal, wir gehen trotzdem in den Park.", rueckmeldung: "Das klingt unhöflich, und im Regen ist es ungemütlich." },
          { text: "Woher wissen Sie das?", rueckmeldung: "Er hat es gerade geschrieben: im Wetterbericht." },
        ] },
      danach: [{ von: "lena", text: "Ich rufe im Café an und reserviere einen Tisch ☎️" }],
    },
    {
      nachrichten: [{ von: "lena", text: "Geschafft! Wir haben einen Tisch für 12 Personen. Freitag, 13 Uhr, Café am See ☕" }],
      aufgabe: { art: "bausteine", anweisung: "Bedanke dich bei Lena für die Organisation.", woerter: ["Vielen", "Dank", "für", "die", "Organisation,", "Lena!"], extra: ["für", "das"], alternativen: [] },
      danach: [{ von: "lena", text: "Gern geschehen 🥰 Bis Freitag!" }, { von: "jonas", text: "Ich freue mich sehr. Bis Freitag! 🌻" }],
    },
  ],
  abschluss: "Das Fest ist organisiert! Du hast Termine erfragt, Vorschläge gemacht und höflich geantwortet.",
};
