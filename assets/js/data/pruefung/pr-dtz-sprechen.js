/* DTZ Sprechen (Paarprüfung) – drei eigene Übungssätze im Prüfungsformat */
const TEIL1 = {
  titel: "Teil 1: Über sich sprechen",
  minuten: 4,
  fuer: "beide",
  karte: { stichworte: ["Name", "Geburtsort", "Wohnort", "Arbeit/Beruf", "Familie", "Sprachen"] },
  redemittel: [
    "Ich heiße … und komme aus …",
    "Ich bin in … geboren.",
    "Seit … wohne ich in …",
    "Ich arbeite als … / Im Moment suche ich Arbeit.",
    "Ich bin verheiratet / ledig und habe … Kinder.",
    "Ich spreche …, ein bisschen … und natürlich Deutsch.",
    "Entschuldigung, können Sie die Frage bitte wiederholen?",
  ],
};

const REDEMITTEL_TEIL2 = [
  "Auf meinem Bild sehe ich …",
  "Im Vordergrund / Im Hintergrund ist …",
  "Links / Rechts sieht man …",
  "Ich glaube, die Person …, weil …",
  "Das erinnert mich an …",
  "In meinem Heimatland ist das anders / ähnlich: …",
  "Ich persönlich finde …, denn …",
];

const REDEMITTEL_TEIL3 = [
  "Was meinst du? Sollen wir …?",
  "Ich schlage vor, dass wir …",
  "Wie wäre es mit …?",
  "Das ist eine gute Idee. / Da bin ich nicht sicher, weil …",
  "Ich kann … übernehmen. Und du?",
  "Dann machen wir das so: …",
  "Gut, also: Wir treffen uns am … um …",
];

export default {
  id: "pr-dtz-sprechen",
  titel: "DTZ Sprechen zu zweit",
  pruefung: "DTZ",
  fertigkeit: "sprechen",
  niveau: "B1",
  minuten: 16,
  sprechen: {
    saetze: [
      /* ============ Satz 1: Einkaufen / Kursausflug ============ */
      {
        titel: "Satz 1: Einkaufen – Kursausflug",
        teile: [
          { ...TEIL1, prueferfragen: [
            "Wo genau wohnen Sie? Wie gefällt es Ihnen dort?",
            "Was haben Sie in Ihrem Heimatland gearbeitet?",
            "Was möchten Sie in Deutschland beruflich machen?",
            "Wie lange lernen Sie schon Deutsch?",
          ]},
          {
            titel: "Teil 2: Über Erfahrungen sprechen – Einkaufen",
            minuten: 6,
            fuer: "A|B",
            karteA: {
              bild: "🛒🥦🍎",
              beschreibung: "Foto: Ein Wochenmarkt unter freiem Himmel. Eine ältere Frau mit Stoffbeutel kauft an einem Stand Gemüse. Der Verkäufer gibt ihr eine Tüte mit Tomaten. Im Hintergrund viele Stände und Menschen.",
              fragen: [
                "A2: Was sehen Sie auf dem Bild?",
                "A2: Wo kaufen Sie Obst und Gemüse?",
                "B1: Welche Vorteile hat ein Markt im Vergleich zum Supermarkt?",
                "B1: Wie war das Einkaufen in Ihrem Heimatland? Erzählen Sie.",
              ],
            },
            karteB: {
              bild: "💻📦🚪",
              beschreibung: "Foto: Ein junger Mann steht an seiner Wohnungstür und nimmt ein Paket vom Paketboten entgegen. Im Flur liegen schon zwei andere Pakete. Er hat sein Handy in der Hand.",
              fragen: [
                "A2: Was sehen Sie auf dem Bild?",
                "A2: Was haben Sie zuletzt im Internet gekauft?",
                "B1: Was sind Vor- und Nachteile vom Online-Einkauf?",
                "B1: Hatten Sie schon einmal Probleme mit einer Bestellung? Was ist passiert?",
              ],
            },
            redemittel: REDEMITTEL_TEIL2,
          },
          {
            titel: "Teil 3: Gemeinsam etwas planen – Kursausflug",
            minuten: 6,
            fuer: "beide",
            karte: {
              situation: "Ihr Deutschkurs macht am Ende des Kurses einen Ausflug. Sie beide sollen den Ausflug planen.",
              aufgabe: "Planen Sie gemeinsam. Machen Sie Vorschläge, reagieren Sie auf die Vorschläge Ihres Partners / Ihrer Partnerin und einigen Sie sich.",
              stichpunkte: ["Wann? (Tag, Uhrzeit)", "Wohin?", "Wie fahren?", "Essen und Trinken?", "Kosten?", "Wer informiert die anderen?"],
            },
            redemittel: REDEMITTEL_TEIL3,
          },
        ],
      },

      /* ============ Satz 2: Freizeit/Sport / Abschiedsfeier ============ */
      {
        titel: "Satz 2: Freizeit und Sport – Abschiedsfeier",
        teile: [
          { ...TEIL1, prueferfragen: [
            "Mit wem wohnen Sie zusammen?",
            "Was machen Ihre Kinder / Ihre Familie gerade?",
            "Welche Sprache sprechen Sie zu Hause?",
            "Was haben Sie gelernt, bevor Sie nach Deutschland gekommen sind?",
          ]},
          {
            titel: "Teil 2: Über Erfahrungen sprechen – Freizeit und Sport",
            minuten: 6,
            fuer: "A|B",
            karteA: {
              bild: "⚽👨‍👩‍👧",
              beschreibung: "Foto: Auf einer Wiese im Park spielen ein Vater und zwei Kinder Fußball. Die Mutter sitzt auf einer Decke und lacht. Die Sonne scheint.",
              fragen: [
                "A2: Was sehen Sie auf dem Bild?",
                "A2: Was machen Sie am Wochenende gern?",
                "B1: Warum ist Sport für Kinder wichtig?",
                "B1: Wie haben Sie als Kind Ihre Freizeit verbracht?",
              ],
            },
            karteB: {
              bild: "🏋️‍♀️🎧",
              beschreibung: "Foto: Eine Frau trainiert allein in einem Fitnessstudio auf einem Laufband. Sie hat Kopfhörer auf. Neben ihr steht eine Wasserflasche.",
              fragen: [
                "A2: Was sehen Sie auf dem Bild?",
                "A2: Machen Sie Sport? Welchen?",
                "B1: Treiben Sie lieber allein Sport oder in einer Gruppe? Warum?",
                "B1: Was kann man tun, wenn man wenig Zeit für Sport hat?",
              ],
            },
            redemittel: REDEMITTEL_TEIL2,
          },
          {
            titel: "Teil 3: Gemeinsam etwas planen – Abschiedsfeier",
            minuten: 6,
            fuer: "beide",
            karte: {
              situation: "Ihre Kollegin Frau Petrović geht nach zwölf Jahren in Rente. Sie beide sollen eine kleine Abschiedsfeier im Betrieb organisieren.",
              aufgabe: "Planen Sie gemeinsam. Machen Sie Vorschläge, reagieren Sie auf die Vorschläge Ihres Partners / Ihrer Partnerin und einigen Sie sich.",
              stichpunkte: ["Wann und wo?", "Wer wird eingeladen?", "Essen und Getränke?", "Geschenk?", "Geld sammeln?", "Wer macht was?"],
            },
            redemittel: REDEMITTEL_TEIL3,
          },
        ],
      },

      /* ============ Satz 3: Wohnen / Nachbarschaftsfest ============ */
      {
        titel: "Satz 3: Wohnen – Nachbarschaftsfest",
        teile: [
          { ...TEIL1, prueferfragen: [
            "In welchem Stadtteil wohnen Sie? Was gibt es dort?",
            "Wie sind Sie heute hierhergekommen?",
            "Was arbeiten Sie im Moment, oder was möchten Sie gern arbeiten?",
            "Welche Sprachen möchten Sie noch lernen?",
          ]},
          {
            titel: "Teil 2: Über Erfahrungen sprechen – Wohnen",
            minuten: 6,
            fuer: "A|B",
            karteA: {
              bild: "🏢🏙️",
              beschreibung: "Foto: Ein großes Mehrfamilienhaus in der Stadt mit vielen Balkonen. Auf einem Balkon stehen Blumen, auf einem anderen hängt Wäsche. Unten auf der Straße fahren Autos und eine Straßenbahn.",
              fragen: [
                "A2: Was sehen Sie auf dem Bild?",
                "A2: Wie wohnen Sie? Beschreiben Sie Ihre Wohnung.",
                "B1: Was ist gut und was ist schwierig, wenn man in der Stadt wohnt?",
                "B1: Wie haben Sie Ihre Wohnung in Deutschland gefunden?",
              ],
            },
            karteB: {
              bild: "🏡🌳🐓",
              beschreibung: "Foto: Ein kleines Haus mit Garten auf dem Land. Vor dem Haus steht ein Fahrrad, im Garten wachsen Gemüse und ein Apfelbaum. Weit und breit sind Felder zu sehen.",
              fragen: [
                "A2: Was sehen Sie auf dem Bild?",
                "A2: Möchten Sie gern so wohnen? Warum (nicht)?",
                "B1: Welche Vor- und Nachteile hat das Leben auf dem Land?",
                "B1: Wie haben Sie in Ihrem Heimatland gewohnt?",
              ],
            },
            redemittel: REDEMITTEL_TEIL2,
          },
          {
            titel: "Teil 3: Gemeinsam etwas planen – Nachbarschaftsfest",
            minuten: 6,
            fuer: "beide",
            karte: {
              situation: "In Ihrem Haus wohnen viele Familien, aber die Nachbarn kennen sich kaum. Sie beide möchten ein Nachbarschaftsfest im Hof organisieren.",
              aufgabe: "Planen Sie gemeinsam. Machen Sie Vorschläge, reagieren Sie auf die Vorschläge Ihres Partners / Ihrer Partnerin und einigen Sie sich.",
              stichpunkte: ["Wann?", "Erlaubnis vom Vermieter?", "Einladung (wie)?", "Essen und Trinken?", "Programm für Kinder?", "Aufräumen?"],
            },
            redemittel: REDEMITTEL_TEIL3,
          },
        ],
      },
    ],
    bewertung: [
      { kriterium: "Aufgabenbewältigung", stufen: [
        "B1: Alle Punkte der Aufgabe angesprochen, eigene Beiträge ausführlich, aktiv im Gespräch",
        "A2: Aufgabe zum großen Teil gelöst, Beiträge kurz, reagiert meist angemessen",
        "unter A2: Aufgabe kaum gelöst, braucht viel Hilfe",
      ]},
      { kriterium: "Aussprache und Intonation", stufen: [
        "B1: Gut verständlich, Akzent stört kaum, Satzmelodie meist natürlich",
        "A2: Verständlich, aber man muss manchmal genau hinhören",
        "unter A2: Oft schwer verständlich",
      ]},
      { kriterium: "Flüssigkeit", stufen: [
        "B1: Spricht zusammenhängend, kurze Pausen zum Planen",
        "A2: Kurze Sätze, häufigere Pausen, Neuanfänge",
        "unter A2: Sehr stockend, viele lange Pausen",
      ]},
      { kriterium: "Korrektheit", stufen: [
        "B1: Häufige Strukturen meist richtig, Fehler stören das Verständnis nicht",
        "A2: Einfache Strukturen richtig, systematische Fehler kommen vor",
        "unter A2: Viele Fehler, die das Verständnis stören",
      ]},
      { kriterium: "Wortschatz", stufen: [
        "B1: Ausreichender Wortschatz für Alltagsthemen, kann umschreiben",
        "A2: Grundwortschatz für vertraute Situationen",
        "unter A2: Sehr begrenzter Wortschatz",
      ]},
    ],
  },
};
