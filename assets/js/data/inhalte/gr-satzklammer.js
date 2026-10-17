/* Grammatik A2: Die Satzklammer */
export default {
  id: "gr-satzklammer",
  titel: "Die Satzklammer",
  niveau: "A2",
  module: [
    {
      id: "trennbar",
      titel: "Trennbare Verben",
      fertigkeit: "grammatik",
      aufgaben: [
        { typ: "info", titel: "Trennbare Verben", html:
          "<p>Bei trennbaren Verben steht das Verb auf <b>Position 2</b>, die Vorsilbe steht <b>am Ende</b>. Das ist die Satzklammer.</p>" +
          "<table><tr><th>Position 1</th><th>Position 2</th><th>Mitte</th><th>Ende</th></tr>" +
          "<tr><td>Ich</td><td><b>stehe</b></td><td>um 6 Uhr</td><td><b>auf</b>.</td></tr>" +
          "<tr><td>Um 6 Uhr</td><td><b>stehe</b></td><td>ich</td><td><b>auf</b>.</td></tr></table>" +
          "<p>Typische Vorsilben: <b>an-, auf-, aus-, ein-, mit-, zu-, ab-, fern-</b></p>" +
          "<p>In der Ja/Nein-Frage steht das Verb vorne: <b>Rufst du mich an?</b></p>" },
        { typ: "satzbau", woerter: ["Ich", "stehe", "jeden Tag", "um 6 Uhr", "auf."], alternativen: ["Jeden Tag stehe ich um 6 Uhr auf.", "Um 6 Uhr stehe ich jeden Tag auf."], erklaerung: "„stehe“ auf Position 2, „auf“ am Ende." },
        { typ: "satzbau", woerter: ["Der Zug", "kommt", "um 8 Uhr", "in Kiel", "an."], alternativen: ["Um 8 Uhr kommt der Zug in Kiel an.", "In Kiel kommt der Zug um 8 Uhr an.", "Der Zug kommt in Kiel um 8 Uhr an."], erklaerung: "ankommen: „kommt“ auf Position 2, „an“ am Ende." },
        { typ: "luecke", satz: "Amira kauft im Supermarkt ___.", optionen: ["ein", "an", "auf", "aus"], erklaerung: "einkaufen: Die Vorsilbe „ein“ steht am Ende." },
        { typ: "satzbau", woerter: ["Rufst", "du", "mich", "heute Abend", "an?"], erklaerung: "Ja/Nein-Frage: Verb vorne, „an“ am Ende." },
        { typ: "mc", frage: "Welcher Satz ist richtig?", optionen: ["Jonas sieht am Abend fern.", "Jonas fernsieht am Abend.", "Jonas sieht fern am Abend.", "Am Abend fern sieht Jonas."], erklaerung: "fernsehen: „sieht“ auf Position 2, „fern“ am Ende." },
        { typ: "satzbau", woerter: ["Am Samstag", "räumen", "wir", "die Wohnung", "auf."], alternativen: ["Wir räumen am Samstag die Wohnung auf.", "Wir räumen die Wohnung am Samstag auf."], erklaerung: "aufräumen: „räumen“ auf Position 2, „auf“ am Ende." },
        { typ: "luecke", satz: "Bitte mach das Fenster ___. Es ist kalt.", optionen: ["zu", "an", "mit", "ein"], erklaerung: "zumachen: Imperativ „Mach … zu!“" },
        { typ: "satzbau", woerter: ["Kommst", "du", "morgen", "mit?"], erklaerung: "mitkommen: In der Frage steht „Kommst“ vorne, „mit“ am Ende." },
      ],
    },
    {
      id: "modal",
      titel: "Modalverben",
      fertigkeit: "grammatik",
      aufgaben: [
        { typ: "info", titel: "Modalverben in der Satzklammer", html:
          "<p>Das Modalverb (<b>können, müssen, wollen, dürfen, sollen, möchten</b>) steht auf <b>Position 2</b>. Das zweite Verb steht im <b>Infinitiv am Ende</b>.</p>" +
          "<table><tr><th>Position 1</th><th>Position 2</th><th>Mitte</th><th>Ende</th></tr>" +
          "<tr><td>Ich</td><td><b>muss</b></td><td>heute lange</td><td><b>arbeiten</b>.</td></tr>" +
          "<tr><td>Heute</td><td><b>muss</b></td><td>ich lange</td><td><b>arbeiten</b>.</td></tr></table>" +
          "<p>Trennbare Verben bleiben am Ende zusammen: <b>Ich kann morgen nicht mitkommen.</b></p>" },
        { typ: "satzbau", woerter: ["Ich", "muss", "heute", "lange", "arbeiten."], alternativen: ["Heute muss ich lange arbeiten."], erklaerung: "„muss“ auf Position 2, „arbeiten“ am Ende." },
        { typ: "satzbau", woerter: ["Olena", "möchte", "im Sommer", "nach Hamburg", "fahren."], alternativen: ["Im Sommer möchte Olena nach Hamburg fahren.", "Nach Hamburg möchte Olena im Sommer fahren."], erklaerung: "„möchte“ auf Position 2, „fahren“ am Ende." },
        { typ: "luecke", satz: "Kannst du mir bitte ___?", optionen: ["helfen", "hilfst", "hilft", "geholfen"], erklaerung: "Nach dem Modalverb steht der Infinitiv am Ende." },
        { typ: "satzbau", woerter: ["Ich", "kann", "morgen", "nicht", "mitkommen."], alternativen: ["Morgen kann ich nicht mitkommen."], erklaerung: "Das trennbare Verb steht im Infinitiv zusammen am Ende." },
        { typ: "mc", frage: "Welcher Satz ist richtig?", optionen: ["Wir wollen am Wochenende einen Ausflug machen.", "Wir wollen machen am Wochenende einen Ausflug.", "Wir machen wollen am Wochenende einen Ausflug."], erklaerung: "Modalverb auf Position 2, Infinitiv am Ende." },
        { typ: "satzbau", woerter: ["Darf", "ich", "hier", "parken?"], erklaerung: "Ja/Nein-Frage: Modalverb vorne, Infinitiv am Ende." },
        { typ: "satzbau", woerter: ["Am Montag", "soll", "Tarek", "früher", "kommen."], alternativen: ["Tarek soll am Montag früher kommen."], erklaerung: "„soll“ auf Position 2, „kommen“ am Ende." },
        { typ: "satzbau", woerter: ["Wann", "musst", "du", "morgen", "aufstehen?"], erklaerung: "W-Frage: W-Wort, Modalverb, … Infinitiv am Ende." },
      ],
    },
    {
      id: "perfekt",
      titel: "Perfekt",
      fertigkeit: "grammatik",
      aufgaben: [
        { typ: "info", titel: "Das Perfekt in der Satzklammer", html:
          "<p><b>haben</b> oder <b>sein</b> steht auf <b>Position 2</b>. Das <b>Partizip II</b> steht <b>am Ende</b>.</p>" +
          "<table><tr><th>Position 1</th><th>Position 2</th><th>Mitte</th><th>Ende</th></tr>" +
          "<tr><td>Ich</td><td><b>habe</b></td><td>gestern Pizza</td><td><b>gegessen</b>.</td></tr>" +
          "<tr><td>Gestern</td><td><b>bin</b></td><td>ich nach Kiel</td><td><b>gefahren</b>.</td></tr></table>" +
          "<p>Trennbare Verben: <b>ein</b>ge<b>kauft</b>, <b>an</b>ge<b>rufen</b>, <b>auf</b>ge<b>standen</b>.</p>" },
        { typ: "satzbau", woerter: ["Ich", "habe", "gestern", "Pizza", "gegessen."], alternativen: ["Gestern habe ich Pizza gegessen."], erklaerung: "„habe“ auf Position 2, „gegessen“ am Ende." },
        { typ: "satzbau", woerter: ["Am Wochenende", "sind", "wir", "an die Ostsee", "gefahren."], alternativen: ["Wir sind am Wochenende an die Ostsee gefahren."], erklaerung: "„sind“ auf Position 2, „gefahren“ am Ende." },
        { typ: "luecke", satz: "Herr Yılmaz hat heute Morgen im Supermarkt ___.", optionen: ["eingekauft", "geeinkauft", "einkauft", "eingekaufen"], erklaerung: "einkaufen → eingekauft: „ge“ steht in der Mitte." },
        { typ: "satzbau", woerter: ["Hast", "du", "die E-Mail", "schon", "gelesen?"], alternativen: ["Hast du schon die E-Mail gelesen?"], erklaerung: "Ja/Nein-Frage: „Hast“ vorne, „gelesen“ am Ende." },
        { typ: "mc", frage: "Welcher Satz ist richtig?", optionen: ["Amira ist um 7 Uhr aufgestanden.", "Amira hat um 7 Uhr aufgestanden.", "Amira ist aufgestanden um 7 Uhr.", "Amira ist um 7 Uhr aufgesteht."], erklaerung: "aufstehen → ist aufgestanden, Partizip am Ende." },
        { typ: "satzbau", woerter: ["Wann", "hast", "du", "deine Mutter", "angerufen?"], erklaerung: "W-Wort, „hast“, … „angerufen“ am Ende." },
        { typ: "satzbau", woerter: ["Letzte Woche", "hat", "Jonas", "seine Wohnung", "aufgeräumt."], alternativen: ["Jonas hat letzte Woche seine Wohnung aufgeräumt.", "Jonas hat seine Wohnung letzte Woche aufgeräumt."], erklaerung: "„hat“ auf Position 2, „aufgeräumt“ am Ende." },
        { typ: "satzbau", woerter: ["Olena", "ist", "gestern", "lange", "im Büro", "geblieben."], alternativen: ["Gestern ist Olena lange im Büro geblieben."], erklaerung: "„ist“ auf Position 2, „geblieben“ am Ende." },
      ],
    },
  ],
};
