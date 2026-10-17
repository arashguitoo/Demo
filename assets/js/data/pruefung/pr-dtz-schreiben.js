/* DTZ Schreiben – eigener Übungssatz im Prüfungsformat */
export default {
  id: "pr-dtz-schreiben",
  titel: "DTZ Schreiben",
  pruefung: "DTZ",
  fertigkeit: "schreiben",
  niveau: "B1",
  minuten: 30,
  schreiben: {
    anweisung: "Wählen Sie Aufgabe A oder Aufgabe B. Schreiben Sie zu allen vier Punkten. Vergessen Sie nicht Anrede und Gruß.",
    aufgaben: [
      {
        titel: "Aufgabe A",
        situation: "Ihre Tochter besucht die Kita „Seestern“. Nächste Woche ist dort ein Elternabend. Sie können an diesem Abend nicht kommen. Schreiben Sie eine E-Mail an die Kitaleiterin, Frau Schröder.",
        leitpunkte: [
          "Grund für Ihr Schreiben",
          "Warum Sie nicht kommen können",
          "Bitte um Informationen über den Elternabend",
          "Vorschlag für ein Gespräch mit der Erzieherin",
        ],
        textart: "E-Mail",
        adressat: "Frau Schröder",
        formell: true,
      },
      {
        titel: "Aufgabe B",
        situation: "In Ihrer Wohnung funktioniert seit einer Woche die Heizung nicht. Sie haben den Hausmeister schon angerufen, aber es ist nichts passiert. Schreiben Sie einen Brief an Ihren Vermieter, Herrn Wagner.",
        leitpunkte: [
          "Problem beschreiben",
          "Was Sie schon gemacht haben",
          "Folgen für Sie und Ihre Familie",
          "Bitte um schnelle Reparatur und Termin",
        ],
        textart: "Brief",
        adressat: "Herr Wagner",
        formell: true,
      },
    ],
    redemittel: {
      "Anrede": ["Sehr geehrte Frau Schröder,", "Sehr geehrter Herr Wagner,", "Sehr geehrte Damen und Herren,"],
      "Einleitung": ["ich schreibe Ihnen, weil …", "ich wende mich an Sie, denn …", "ich möchte Ihnen mitteilen, dass …"],
      "Grund und Erklärung": ["Leider kann ich nicht …, weil …", "Das Problem ist, dass …", "Seit … funktioniert … nicht mehr."],
      "Bisherige Schritte": ["Ich habe schon … angerufen.", "Am … habe ich … informiert.", "Bis jetzt ist leider nichts passiert."],
      "Bitte": ["Könnten Sie mir bitte … schicken?", "Ich bitte Sie, … so schnell wie möglich …", "Ich wäre Ihnen dankbar, wenn …"],
      "Vorschlag": ["Ich schlage vor, dass …", "Wäre es möglich, am … einen Termin zu machen?", "Am besten passt es mir am … um … Uhr."],
      "Schluss": ["Vielen Dank im Voraus.", "Ich freue mich auf Ihre Antwort.", "Mit freundlichen Grüßen"],
    },
    checkliste: [
      "Anrede passt zum Adressaten (formell: Sehr geehrte/r …)",
      "Einleitung: Grund für das Schreiben genannt",
      "Alle vier Leitpunkte bearbeitet",
      "Jeder Leitpunkt mit mindestens einem ganzen Satz",
      "Sätze mit weil, dass, wenn oder obwohl verbunden",
      "Höfliche Bitte (könnten, würde, wäre)",
      "Gruß am Ende und Name",
      "Mindestens 80 Wörter, Sie-Form durchgehend",
    ],
    musterloesung: {
      A: `Sehr geehrte Frau Schröder,

ich schreibe Ihnen wegen des Elternabends am nächsten Donnerstag. Leider kann ich an diesem Abend nicht kommen, weil ich in dieser Woche Spätschicht habe und erst um zweiundzwanzig Uhr nach Hause komme. Das tut mir sehr leid.

Könnten Sie mir bitte die wichtigsten Informationen per E-Mail schicken? Mich interessiert besonders, was für den Ausflug im Sommer geplant ist und ob wir Eltern etwas vorbereiten müssen.

Außerdem möchte ich gern mit der Erzieherin von Lina, Frau Aydın, über die Entwicklung meiner Tochter sprechen. Wäre ein kurzes Gespräch am Montag oder Dienstag um acht Uhr möglich, wenn ich Lina in die Kita bringe?

Vielen Dank im Voraus.

Mit freundlichen Grüßen
Samira Haddad`,
      B: `Sehr geehrter Herr Wagner,

ich wende mich an Sie, weil in meiner Wohnung im zweiten Stock seit einer Woche die Heizung nicht funktioniert. Die Heizkörper im Wohnzimmer und im Kinderzimmer bleiben ganz kalt.

Ich habe schon zweimal den Hausmeister angerufen, zuletzt am Montag. Er hat versprochen, dass er vorbeikommt, aber bis jetzt ist leider nichts passiert.

Draußen ist es sehr kalt, und in der Wohnung sind es nur noch fünfzehn Grad. Mein kleiner Sohn ist schon erkältet, und wir müssen abends mit Jacken im Wohnzimmer sitzen.

Ich bitte Sie deshalb, die Heizung so schnell wie möglich reparieren zu lassen. Am besten passt mir ein Termin am Vormittag, weil ich nachmittags arbeite. Bitte rufen Sie mich an.

Mit freundlichen Grüßen
Daniel Mensah`,
    },
    minWoerter: 80,
  },
};
