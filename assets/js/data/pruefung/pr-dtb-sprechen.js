/* DTB B2 Sprechen – eigener Übungssatz im Prüfungsformat */
export default {
  id: "pr-dtb-sprechen",
  titel: "DTB B2 Sprechen",
  pruefung: "DTB",
  fertigkeit: "sprechen",
  niveau: "B2",
  minuten: 16,
  sprechen: {
    hinweis: "Die Prüfung findet zu zweit und ohne Vorbereitungszeit statt.",
    teil1Themen: [
      { thema: "Einen Arbeitgeber beschreiben (Branche, Größe, Produkte oder Dienstleistungen, Arbeitsbedingungen)", prueferfragen: [
        "Was gefällt Ihnen an diesem Arbeitgeber besonders?",
        "Würden Sie dort gern langfristig arbeiten? Warum (nicht)?",
        "Was könnte der Arbeitgeber noch verbessern?",
      ]},
      { thema: "Ein gutes Arbeitsumfeld (Kolleginnen und Kollegen, Vorgesetzte, Räume, Arbeitszeiten)", prueferfragen: [
        "Was ist für Sie wichtiger: ein gutes Gehalt oder ein gutes Team?",
        "Wie kann man selbst zu einem guten Arbeitsklima beitragen?",
        "Haben Sie schon einmal in einem schlechten Arbeitsumfeld gearbeitet? Was war das Problem?",
      ]},
      { thema: "Die eigene Berufswahl (Interessen, Ausbildung oder Studium, Einfluss von Familie, Chancen)", prueferfragen: [
        "Würden Sie sich heute noch einmal für diesen Beruf entscheiden?",
        "Wer hat Sie bei Ihrer Entscheidung beraten?",
        "Wie haben sich die Anforderungen in Ihrem Beruf verändert?",
      ]},
      { thema: "Ein berufliches Vorbild (Person, Eigenschaften, Erfolge, was man gelernt hat)", prueferfragen: [
        "Welche Eigenschaft dieser Person hätten Sie auch gern?",
        "Kann eine Vorgesetzte oder ein Vorgesetzter ein Vorbild sein?",
        "Braucht man im Berufsleben überhaupt Vorbilder?",
      ]},
      { thema: "Arbeitssuche in einem Land Ihrer Wahl (Wege der Stellensuche, Bewerbungsunterlagen, Netzwerke)", prueferfragen: [
        "Was ist dort anders als in Deutschland?",
        "Welche Rolle spielen persönliche Kontakte bei der Suche?",
        "Welchen Tipp würden Sie jemandem geben, der dort Arbeit sucht?",
      ]},
      { thema: "Ein Bewerbungsgespräch (Vorbereitung, typische Fragen, Kleidung, Verhalten)", prueferfragen: [
        "Welche Frage finden Sie in einem Bewerbungsgespräch besonders schwierig?",
        "Wie gehen Sie mit Nervosität um?",
        "Sollte man im Gespräch auch selbst Fragen stellen? Welche?",
      ]},
      { thema: "Ein Produkt oder eine Dienstleistung vorstellen (Zielgruppe, Vorteile, Preis, Vertrieb)", prueferfragen: [
        "Warum sollte man gerade dieses Produkt kaufen?",
        "Wie könnte man es besser bekannt machen?",
        "Gibt es auch Nachteile oder Kritik daran?",
      ]},
      { thema: "Eine Geschäftsidee (Idee, Kundschaft, Startkapital, Risiken)", prueferfragen: [
        "Welche Unterstützung bräuchten Sie für die Gründung?",
        "Was wäre das größte Risiko?",
        "Würden Sie lieber allein oder mit Partnern gründen?",
      ]},
    ],
    teil1Ablauf: [
      "1A: Beide wählen je ein Thema (zur Wahl stehen jeweils zwei von acht) und sprechen ca. zwei Minuten darüber.",
      "1B: Die Prüfenden stellen Fragen zum gewählten Thema.",
      "1C: Sie greifen einen Aspekt aus dem Vortrag der anderen Person auf, erläutern ihn und sagen Ihre Meinung dazu.",
    ],
    teil2: {
      titel: "Teil 2: Pausengespräch unter Kolleginnen und Kollegen",
      situation: "Sie treffen eine Kollegin oder einen Kollegen in der Kaffeeküche und unterhalten sich. Ziehen Sie abwechselnd einen Impuls, beantworten Sie die Frage und stellen Sie eine Rückfrage.",
      impulse: [
        "Wie bist du eigentlich heute zur Arbeit gekommen – und wie lange brauchst du normalerweise?",
        "Was machst du in deiner Mittagspause am liebsten?",
        "Hast du schon Pläne für deinen nächsten Urlaub?",
        "Wie findest du die neue Kaffeemaschine – oder trinkst du lieber Tee?",
        "Hast du am Wochenende etwas Schönes erlebt?",
        "Würdest du gern einmal in einer anderen Abteilung arbeiten? In welcher?",
      ],
    },
    teil3: {
      titel: "Teil 3: Lösungswege für ein Problem am Arbeitsplatz diskutieren",
      anweisung: "Lesen Sie die Situation. Sprechen Sie über das Problem, machen Sie Vorschläge, reagieren Sie auf die Vorschläge Ihres Gegenübers und einigen Sie sich auf eine Lösung.",
      situationen: [
        {
          situation: "In Ihrem Team sind zwei Kolleginnen langfristig krank. Die anderen machen seit Wochen Überstunden, und die Stimmung wird schlechter.",
          aufgabe: "Überlegen Sie gemeinsam, wie das Team die Situation bewältigen kann.",
          stichpunkte: ["Aufgaben neu verteilen?", "Aushilfe oder Zeitarbeit?", "Gespräch mit der Abteilungsleitung", "Prioritäten setzen", "langfristig: mehr Personal, Vertretungsplan"],
        },
        {
          situation: "Kundinnen und Kunden beschweren sich zunehmend, dass sie den Kundenservice telefonisch kaum erreichen.",
          aufgabe: "Diskutieren Sie, wie die Erreichbarkeit verbessert werden kann.",
          stichpunkte: ["Rückrufservice", "Häufige Fragen auf der Website", "Telefonzeiten anpassen", "Chat oder E-Mail", "langfristig: Schulung, zusätzliche Stellen"],
        },
        {
          situation: "In Ihrer Abteilung wird eine neue Software eingeführt. Viele Kolleginnen und Kollegen haben Schwierigkeiten damit und arbeiten deshalb langsamer.",
          aufgabe: "Überlegen Sie, wie die Einführung besser gelingen kann.",
          stichpunkte: ["Schulungen", "Ansprechpersonen im Team", "Anleitungen und Videos", "Übergangszeit mit alter Software", "langfristig: Beschäftigte früher beteiligen"],
        },
        {
          situation: "Im Großraumbüro ist es sehr laut. Viele können sich nicht konzentrieren, und Telefonate stören die anderen.",
          aufgabe: "Sprechen Sie darüber, wie man die Situation verbessern kann.",
          stichpunkte: ["Ruhezonen", "Regeln für Telefonate", "Kopfhörer", "Homeoffice-Tage", "langfristig: Umbau, Trennwände, Besprechungsräume"],
        },
      ],
    },
    redemittel: {
      "Teil 1: Thema präsentieren": [
        "Ich habe das Thema … gewählt, weil …",
        "Zunächst möchte ich auf … eingehen.",
        "Ein weiterer wichtiger Aspekt ist …",
        "Aus eigener Erfahrung kann ich sagen, dass …",
        "Zusammenfassend lässt sich sagen, dass …",
      ],
      "Teil 1C: Auf den Vortrag reagieren": [
        "Sie haben vorhin erwähnt, dass … Das finde ich interessant, weil …",
        "Besonders der Punkt … hat mich angesprochen.",
        "Da sehe ich das etwas anders: …",
      ],
      "Teil 2: Small Talk": [
        "Ach, wirklich? Erzähl mal!",
        "Bei mir ist das ganz ähnlich / ganz anders.",
        "Und wie ist das bei dir?",
        "Das klingt ja spannend!",
      ],
      "Teil 3: Diskutieren und einigen": [
        "Ich finde, wir sollten zuerst …",
        "Was hältst du von der Idee, …?",
        "Das wäre eine Möglichkeit, allerdings …",
        "Da stimme ich dir zu. / Da bin ich anderer Meinung, denn …",
        "Kurzfristig könnten wir …, langfristig wäre es sinnvoll, …",
        "Dann einigen wir uns also darauf, dass …",
      ],
    },
    bewertung: [
      { kriterium: "Aufgabenbewältigung", stufen: [
        "B2: Inhalte ausführlich und zusammenhängend, reagiert flexibel, trägt das Gespräch aktiv",
        "B1: Aufgabe weitgehend gelöst, Beiträge eher kurz, reagiert angemessen",
        "unter B1: Aufgabe nur teilweise gelöst",
      ]},
      { kriterium: "Aussprache und Intonation", stufen: [
        "B2: Klar und natürlich, Akzent stört nicht",
        "B1: Gut verständlich, gelegentlich Mühe beim Zuhören",
        "unter B1: Verständnis häufig erschwert",
      ]},
      { kriterium: "Formale Richtigkeit", stufen: [
        "B2: Gute Beherrschung der Grammatik, Fehler führen nicht zu Missverständnissen",
        "B1: Häufige Strukturen weitgehend korrekt, Fehler bei komplexeren Strukturen",
        "unter B1: Fehler stören das Verständnis",
      ]},
      { kriterium: "Spektrum sprachlicher Mittel", stufen: [
        "B2: Breiter Wortschatz zu Berufsthemen, variiert Formulierungen, Nebensätze und Konnektoren",
        "B1: Ausreichender Wortschatz, manchmal Umschreibungen und Wiederholungen",
        "unter B1: Begrenzter Wortschatz, einfache Strukturen",
      ]},
    ],
  },
};
