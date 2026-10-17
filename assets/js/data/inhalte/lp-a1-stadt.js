/* Themenpaket A1: Neu in der Stadt */
export default {
  id: "lp-a1-stadt",
  titel: "Neu in der Stadt",
  niveau: "A1",
  module: [
    {
      id: "woerter",
      titel: "Wörter: Wohnung und Stadt",
      fertigkeit: "wortschatz",
      aufgaben: [
        { typ: "paare", anweisung: "Welches Zimmer passt? Tippe links und dann rechts.", paare: [
          ["die Küche", "kochen"],
          ["das Bad", "duschen"],
          ["das Schlafzimmer", "schlafen"],
          ["das Wohnzimmer", "fernsehen"],
          ["der Flur", "die Jacke aufhängen"],
        ] },
        { typ: "sortieren", anweisung: "der, die oder das?", gruppen: {
          der: ["Balkon", "Flur", "Tisch"],
          die: ["Küche", "Wohnung", "Straße", "Miete"],
          das: ["Bad", "Zimmer", "Haus", "Fenster"],
        } },
        { typ: "mc", frage: "Wo kaufst du Brot und Brötchen?", optionen: ["In der Bäckerei.", "In der Apotheke.", "In der Bank.", "Im Kino."] },
        { typ: "luecke", satz: "Die Wohnung hat drei ___ und einen Balkon.", optionen: ["Zimmer", "Straßen", "Busse"], erklaerung: "Eine Wohnung hat Zimmer: Küche, Bad, Wohnzimmer …" },
        { typ: "paare", anweisung: "Was macht man wo?", paare: [
          ["der Supermarkt", "Lebensmittel kaufen"],
          ["die Apotheke", "Medikamente kaufen"],
          ["die Bank", "Geld holen"],
          ["der Bahnhof", "den Zug nehmen"],
          ["die Post", "ein Paket schicken"],
        ] },
        { typ: "mc", frage: "Frau Schulz wohnt im gleichen Haus wie ich. Sie ist meine …", optionen: ["Nachbarin.", "Verkäuferin.", "Ärztin."] },
        { typ: "luecke", satz: "Ich bezahle jeden Monat 650 Euro ___.", optionen: ["Miete", "Küche", "Stadt"], erklaerung: "Für eine Wohnung bezahlt man jeden Monat Miete." },
        { typ: "sortieren", anweisung: "In der Stadt: der, die oder das?", gruppen: {
          der: ["Bahnhof", "Supermarkt", "Park"],
          die: ["Post", "Bank", "Apotheke", "Haltestelle"],
          das: ["Rathaus", "Kino", "Café"],
        } },
        { typ: "mc", frage: "Was ist das Gegenteil von <b>links</b>?", optionen: ["rechts", "geradeaus", "oben"] },
        { typ: "luecke", satz: "Ich wohne im dritten ___.", optionen: ["Stock", "Straße", "Küche"], erklaerung: "der Stock: im ersten, zweiten, dritten Stock." },
        { typ: "paare", anweisung: "Finde das Gegenteil.", paare: [
          ["groß", "klein"],
          ["hell", "dunkel"],
          ["laut", "leise"],
          ["alt", "neu"],
          ["teuer", "billig"],
        ] },
        { typ: "mc", frage: "Wo wartest du auf den Bus?", optionen: ["An der Haltestelle.", "In der Küche.", "Im Supermarkt.", "Auf dem Balkon."] },
      ],
    },
    {
      id: "grammatik",
      titel: "sein, haben und W-Fragen",
      fertigkeit: "grammatik",
      aufgaben: [
        { typ: "info", titel: "sein, haben und W-Fragen", html:
          "<table><tr><th></th><th>sein</th><th>haben</th></tr>" +
          "<tr><td>ich</td><td><b>bin</b></td><td><b>habe</b></td></tr>" +
          "<tr><td>du</td><td><b>bist</b></td><td><b>hast</b></td></tr>" +
          "<tr><td>er / sie / es</td><td><b>ist</b></td><td><b>hat</b></td></tr>" +
          "<tr><td>wir</td><td><b>sind</b></td><td><b>haben</b></td></tr>" +
          "<tr><td>ihr</td><td><b>seid</b></td><td><b>habt</b></td></tr>" +
          "<tr><td>sie / Sie</td><td><b>sind</b></td><td><b>haben</b></td></tr></table>" +
          "<p>W-Fragen: <b>Wer?</b> (Person) <b>Was?</b> (Sache) <b>Wo?</b> (Ort) <b>Woher?</b> (Herkunft) <b>Wann?</b> (Zeit) <b>Wie?</b></p>" +
          "<p>Das Verb steht auf Position 2: <b>Wo wohnst du?</b></p>" },
        { typ: "luecke", satz: "Ich ___ Amira.", optionen: ["bin", "bist", "ist", "habe"], erklaerung: "ich bin" },
        { typ: "luecke", satz: "Tarek ___ zwei Kinder.", optionen: ["hat", "habt", "ist", "haben"], erklaerung: "er hat" },
        { typ: "luecke", satz: "___ wohnst du? – In Kiel.", optionen: ["Wo", "Wer", "Was", "Wann"], erklaerung: "Die Antwort ist ein Ort, also fragt man mit „Wo?“." },
        { typ: "luecke", satz: "Wir ___ neu in der Stadt.", optionen: ["sind", "seid", "ist", "haben"], erklaerung: "wir sind" },
        { typ: "satzbau", woerter: ["Wie", "alt", "ist", "dein", "Sohn?"], hinweis: "Eine W-Frage", erklaerung: "W-Wort zuerst, dann das Verb auf Position 2." },
        { typ: "satzbau", woerter: ["Olena", "hat", "heute", "keine Zeit."], alternativen: ["Heute hat Olena keine Zeit."], erklaerung: "Das Verb steht immer auf Position 2." },
        { typ: "mc", frage: "Du möchtest den Namen wissen. Was fragst du?", optionen: ["Wie heißen Sie?", "Wo wohnen Sie?", "Woher kommen Sie?", "Wie alt sind Sie?"], erklaerung: "Nach dem Namen fragt man mit „Wie heißen Sie?“." },
        { typ: "luecke", satz: "___ ist das? – Das ist Herr Yılmaz, mein Nachbar.", optionen: ["Wer", "Was", "Wo", "Wie"], erklaerung: "Die Antwort ist eine Person, also fragt man mit „Wer?“." },
        { typ: "satzbau", woerter: ["Wo", "ist", "die", "Bushaltestelle?"], erklaerung: "W-Wort, Verb, dann der Rest." },
        { typ: "luecke", satz: "___ ihr heute Zeit?", optionen: ["Habt", "Hat", "Seid", "Habe"], erklaerung: "ihr habt – in der Frage steht das Verb vorne: Habt ihr …?" },
      ],
    },
    {
      id: "zahlen",
      titel: "Zahlen und Uhrzeiten",
      fertigkeit: "wortschatz",
      aufgaben: [
        { typ: "paare", anweisung: "Wie spät ist es? Finde die Uhrzeit.", paare: [
          ["Es ist Viertel nach drei.", "15:15"],
          ["Es ist halb neun.", "8:30"],
          ["Es ist Viertel vor zwölf.", "11:45"],
          ["Es ist zehn nach sieben.", "7:10"],
          ["Es ist fünf vor sieben.", "18:55"],
        ] },
        { typ: "paare", anweisung: "Finde die Zahl.", paare: [
          ["zwölf", "12"],
          ["zwanzig", "20"],
          ["dreizehn", "13"],
          ["dreißig", "30"],
          ["einundzwanzig", "21"],
          ["siebzehn", "17"],
        ] },
        { typ: "mc", frage: "Wie sagt man <b>45</b>?", optionen: ["fünfundvierzig", "vierundfünfzig", "fünfvierzig"], erklaerung: "Im Deutschen sagt man zuerst die Einer: fünf-und-vierzig." },
        { typ: "mc", frage: "Es ist <b>halb zehn</b>. Wie spät ist es?", optionen: ["9:30", "10:30", "9:50"], erklaerung: "„Halb zehn“ heißt: 30 Minuten vor zehn." },
        { typ: "luecke", satz: "Der Kurs beginnt ___ neun Uhr.", optionen: ["um", "am", "im"], erklaerung: "Bei der Uhrzeit sagt man „um“." },
        { typ: "luecke", satz: "Die Hausnummer ist achtzehn: Hafenstraße ___.", optionen: ["18", "80", "8"] },
        { typ: "mc", frage: "Wie sagt man <b>13:00</b> im Alltag?", optionen: ["Es ist eins.", "Es ist drei.", "Es ist halb zwei."], erklaerung: "Im Alltag sagt man oft nur 1 bis 12: 13 Uhr = eins." },
        { typ: "luecke", satz: "Der Bus fährt um 7:40. Das ist zwanzig ___ acht.", optionen: ["vor", "nach", "halb"], erklaerung: "7:40 sind 20 Minuten vor acht." },
        { typ: "mc", frage: `Jonas sagt: „Wir treffen uns um Viertel vor elf.“ Wann ist das?`, optionen: ["10:45", "11:15", "11:45", "10:15"], erklaerung: "Viertel vor elf = 15 Minuten vor elf." },
        { typ: "paare", anweisung: "In welchem Stock?", paare: [
          ["im ersten Stock", "1. Stock"],
          ["im zweiten Stock", "2. Stock"],
          ["im dritten Stock", "3. Stock"],
          ["im siebten Stock", "7. Stock"],
        ] },
      ],
    },
    {
      id: "text",
      titel: "Lesen: Eine Nachricht von der Nachbarin",
      fertigkeit: "lesen",
      aufgaben: [
        { typ: "lesen", titel: "Ein Zettel im Treppenhaus", text:
          "<p>Liebe Nachbarn,</p>" +
          "<p>am Samstag habe ich Geburtstag und mache eine Party. Die Party beginnt um 19 Uhr. Es wird vielleicht ein bisschen laut. Ab 23 Uhr machen wir die Musik leise.</p>" +
          "<p>Sie sind herzlich eingeladen! Ich wohne im 2. Stock links.</p>" +
          "<p>Viele Grüße<br>Olena Kovalenko</p>",
          fragen: [
            { typ: "rf", aussage: "Die Party beginnt um 23 Uhr.", richtig: false, erklaerung: "Die Party beginnt um 19 Uhr. Um 23 Uhr wird die Musik leise." },
            { typ: "mc", frage: "Wo wohnt Olena?", optionen: ["Im 2. Stock links.", "Im 2. Stock rechts.", "Im Erdgeschoss."] },
            { typ: "rf", aussage: "Die Nachbarn sind zur Party eingeladen.", richtig: true, erklaerung: "Olena schreibt: „Sie sind herzlich eingeladen!“" },
          ] },
        { typ: "lesen", titel: "Eine SMS", text:
          "<p>Hallo Amira, hier ist Frau Schulz aus dem 3. Stock. Ich habe ein Paket für Sie. Der Postbote war heute um 10 Uhr da. Ich bin bis 18 Uhr zu Hause. Klingeln Sie einfach! Viele Grüße</p>",
          fragen: [
            { typ: "mc", frage: "Was hat Frau Schulz?", optionen: ["Ein Paket für Amira.", "Einen Brief für Amira.", "Einen Schlüssel für Amira."] },
            { typ: "rf", aussage: "Frau Schulz ist bis 18 Uhr zu Hause.", richtig: true },
            { typ: "mc", frage: "Was macht Amira jetzt?", optionen: ["Sie klingelt bei Frau Schulz.", "Sie ruft die Post an.", "Sie geht zum Bahnhof."] },
          ] },
        { typ: "satzbau", woerter: ["Ich", "hole", "das Paket", "heute", "ab."], alternativen: ["Ich hole heute das Paket ab.", "Heute hole ich das Paket ab."], hinweis: "abholen: „ab“ steht am Ende." },
        { typ: "satzbau", woerter: ["Die Party", "beginnt", "am Samstag", "um 19 Uhr."], alternativen: ["Am Samstag beginnt die Party um 19 Uhr.", "Um 19 Uhr beginnt die Party am Samstag.", "Die Party beginnt um 19 Uhr am Samstag."] },
      ],
    },
    {
      id: "test",
      titel: "Abschlusstest",
      fertigkeit: "grammatik",
      aufgaben: [
        { typ: "luecke", satz: "Woher ___ Sie?", optionen: ["kommen", "kommt", "kommst"], erklaerung: "Sie (formell) kommen" },
        { typ: "luecke", satz: "Das ___ meine Nachbarin, Frau Schulz.", optionen: ["ist", "sind", "bin", "hat"], erklaerung: "das ist" },
        { typ: "mc", frage: "Wie spät ist es? <b>7:30</b>", optionen: ["Es ist halb acht.", "Es ist halb sieben.", "Es ist Viertel nach sieben."], erklaerung: "7:30 = 30 Minuten vor acht = halb acht." },
        { typ: "sortieren", anweisung: "der, die oder das?", gruppen: {
          der: ["Stuhl", "Schlüssel", "Bahnhof"],
          die: ["Lampe", "Tür", "Bank"],
          das: ["Bett", "Kino", "Fenster"],
        } },
        { typ: "satzbau", woerter: ["Wie", "ist", "Ihre", "Telefonnummer?"], erklaerung: "W-Wort, Verb, dann der Rest." },
        { typ: "luecke", satz: "Mein Sohn ___ acht Jahre alt.", optionen: ["ist", "hat", "sind", "habt"], erklaerung: "Das Alter sagt man mit „sein“: Er ist acht." },
        { typ: "paare", anweisung: "Welche Antwort passt zur Frage?", paare: [
          ["Wer ist das?", "Das ist Jonas."],
          ["Wo wohnst du?", "In der Hafenstraße."],
          ["Wann kommst du?", "Um sechs Uhr."],
          ["Was machst du?", "Ich koche."],
          ["Woher kommst du?", "Aus Polen."],
        ] },
        { typ: "mc", frage: "Wie sagt man <b>67</b>?", optionen: ["siebenundsechzig", "sechsundsiebzig", "sechzigsieben"], erklaerung: "Zuerst die Einer, dann die Zehner: sieben-und-sechzig." },
        { typ: "luecke", satz: "Wir ___ eine Wohnung mit Balkon.", optionen: ["haben", "hat", "sind", "habt"], erklaerung: "wir haben" },
        { typ: "satzbau", woerter: ["Am Montag", "habe", "ich", "keine Zeit."], alternativen: ["Ich habe am Montag keine Zeit."], erklaerung: "Das Verb steht auf Position 2." },
        { typ: "mc", frage: "Wo kauft man Briefmarken?", optionen: ["In der Post.", "In der Bäckerei.", "Im Kino."] },
        { typ: "luecke", satz: "Der Deutschkurs ist ___ Montag bis Freitag.", optionen: ["von", "um", "im"], erklaerung: "von … bis …: von Montag bis Freitag." },
      ],
    },
  ],
};
