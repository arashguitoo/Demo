/* DTB B2 Hören + Hören und Schreiben (Telefonnotiz) – eigener Übungssatz im Prüfungsformat */
const AF = ["a", "b", "c", "d", "e", "f"];

export default {
  id: "pr-dtb-hoeren",
  titel: "DTB B2 Hören",
  pruefung: "DTB",
  fertigkeit: "hoeren",
  niveau: "B2",
  minuten: 20,
  teile: [
    /* ---------------- Teil 1 ---------------- */
    {
      titel: "Teil 1",
      ziel: "Gespräche im Betrieb verstehen",
      anweisung: "Sie hören drei Gespräche. Zu jedem Gespräch gibt es zwei Aufgaben: Ist die Aussage richtig oder falsch? Und welche Antwort (a, b oder c) passt? Sie hören jedes Gespräch einmal.",
      hoertexte: [
        { titel: "Gespräch 1", wiederholen: 1, sprecher: [
          { wer: "Frau Brenner", stimme: "w", text: "Herr Yildiz, haben Sie kurz Zeit? Es geht um die Inventur nächste Woche." },
          { wer: "Herr Yildiz", stimme: "m", text: "Ja, klar. Ich dachte, die ist am Donnerstag?" },
          { wer: "Frau Brenner", stimme: "w", text: "Eigentlich schon, aber am Donnerstag kommt die große Lieferung für den Herbst. Wir haben deshalb beschlossen, die Inventur auf Samstag zu verlegen. Das wird natürlich als Überstunden angerechnet, und es gibt einen Zuschlag von fünfundzwanzig Prozent." },
          { wer: "Herr Yildiz", stimme: "m", text: "Samstag ist bei mir schwierig. Da habe ich meine Tochter, meine Frau arbeitet am Wochenende. Könnte ich stattdessen am Freitag länger bleiben und schon einmal das Lager im Erdgeschoss zählen?" },
          { wer: "Frau Brenner", stimme: "w", text: "Hm, das könnte funktionieren. Dann müssten Sie aber die Listen bis Freitagabend fertig haben, damit das Samstagsteam weiß, was schon erledigt ist." },
          { wer: "Herr Yildiz", stimme: "m", text: "Das schaffe ich. Ich trage alles direkt in die Tabelle ein." },
        ]},
        { titel: "Gespräch 2", wiederholen: 1, sprecher: [
          { wer: "Marta", stimme: "w", text: "Sag mal, Felix, du warst doch letzte Woche auf der Schulung zur neuen Software. Lohnt sich das?" },
          { wer: "Felix", stimme: "m", text: "Also, die Schulung selbst war ziemlich theoretisch. Am ersten Tag haben wir fast nur Folien gesehen. Aber am zweiten Tag gab es Übungen mit echten Kundendaten, und das war wirklich hilfreich." },
          { wer: "Marta", stimme: "w", text: "Ich soll nächsten Monat auch hin. Ehrlich gesagt habe ich Sorge, dass ich danach mehr Arbeit habe als vorher." },
          { wer: "Felix", stimme: "m", text: "Am Anfang dauert alles etwas länger, das stimmt. Aber die Angebote kann man jetzt in einem Bruchteil der Zeit erstellen, weil die Preise automatisch übernommen werden. Mein Tipp: Nimm dir vorher ein, zwei typische Fälle aus deinem Alltag mit. Dann kannst du die direkt mit dem Trainer durchgehen." },
          { wer: "Marta", stimme: "w", text: "Gute Idee, das mache ich." },
        ]},
        { titel: "Gespräch 3", wiederholen: 1, sprecher: [
          { wer: "Herr Schulte", stimme: "m", text: "Frau Adeyemi, schön, dass Sie da sind. Wie war Ihre erste Woche bei uns?" },
          { wer: "Frau Adeyemi", stimme: "w", text: "Sehr gut, danke. Das Team hat mich toll aufgenommen. Nur mit den vielen internen Abkürzungen habe ich noch Schwierigkeiten." },
          { wer: "Herr Schulte", stimme: "m", text: "Das geht allen so. Im Intranet gibt es übrigens eine Liste dazu, die schicke ich Ihnen gleich. Ich wollte noch etwas anderes besprechen: Ihre Patin, Frau Lorenz, ist ab Montag für zwei Wochen im Urlaub." },
          { wer: "Frau Adeyemi", stimme: "w", text: "Ach so. An wen soll ich mich dann wenden, wenn ich Fragen habe?" },
          { wer: "Herr Schulte", stimme: "m", text: "In der Zeit übernimmt Herr Petrov aus der Buchhaltung. Er sitzt zwei Türen weiter. Und unser Feedbackgespräch zur Probezeit verschieben wir auf die Woche, wenn Frau Lorenz wieder da ist. Sie soll ja auch etwas dazu sagen." },
          { wer: "Frau Adeyemi", stimme: "w", text: "Verstanden. Vielen Dank." },
        ]},
      ],
      aufgaben: [
        { typ: "rf", nr: 22, hoertext: 0, aussage: "Die Inventur findet wie geplant am Donnerstag statt.", richtig: false, erklaerung: "Die Inventur wird auf Samstag verlegt." },
        { typ: "mc", nr: 23, hoertext: 0, frage: "Worauf einigen sich Frau Brenner und Herr Yildiz?", optionen: ["Herr Yildiz zählt einen Teil schon am Freitag.", "Herr Yildiz arbeitet am Samstag mit Zuschlag.", "Die Lieferung wird auf Samstag verschoben."], erklaerung: "Er zählt am Freitag das Lager im Erdgeschoss und trägt alles in die Tabelle ein." },
        { typ: "rf", nr: 24, hoertext: 1, aussage: "Felix fand den zweiten Schulungstag nützlicher als den ersten.", richtig: true, erklaerung: "Am ersten Tag nur Folien, am zweiten hilfreiche Übungen." },
        { typ: "mc", nr: 25, hoertext: 1, frage: "Was rät Felix seiner Kollegin?", optionen: ["Eigene Beispiele aus der Arbeit mitzunehmen.", "Die Schulung auf später zu verschieben.", "Vorher die Folien im Intranet zu lesen."], erklaerung: "Sie soll typische Fälle aus ihrem Alltag mitnehmen." },
        { typ: "rf", nr: 26, hoertext: 2, aussage: "Frau Adeyemi hat Probleme mit ihren Kolleginnen und Kollegen.", richtig: false, erklaerung: "Das Team hat sie toll aufgenommen; nur die Abkürzungen sind schwierig." },
        { typ: "mc", nr: 27, hoertext: 2, frage: "Was ändert sich in den nächsten zwei Wochen für Frau Adeyemi?", optionen: ["Sie hat einen anderen Ansprechpartner.", "Sie wechselt in die Buchhaltung.", "Ihr Probezeitgespräch findet früher statt."], erklaerung: "Herr Petrov vertritt die Patin; das Gespräch wird nach hinten verschoben." },
      ],
    },

    /* ---------------- Teil 2 ---------------- */
    {
      titel: "Teil 2",
      ziel: "Kurze Gespräche Aussagen zuordnen",
      anweisung: "Sie hören vier Gespräche. Welche Aussage a bis f passt zu welchem Gespräch? Zwei Aussagen passen nicht. Lesen Sie zuerst die Aussagen. Sie hören jedes Gespräch einmal.",
      material: `<table>
<tr><th>a</th><td>Eine Person bittet darum, eine Aufgabe abgeben zu dürfen.</td></tr>
<tr><th>b</th><td>Zwei Personen tauschen ihre Dienste.</td></tr>
<tr><th>c</th><td>Eine Person beschwert sich über ein defektes Gerät.</td></tr>
<tr><th>d</th><td>Eine Person lobt die Arbeit eines Kollegen.</td></tr>
<tr><th>e</th><td>Eine Person lehnt eine Einladung ab.</td></tr>
<tr><th>f</th><td>Zwei Personen planen eine Veranstaltung für Kunden.</td></tr>
</table>`,
      hoertexte: [
        { titel: "Gespräch 1", wiederholen: 1, sprecher: [
          { wer: "Jana", stimme: "w", text: "Kevin, könntest du am Mittwoch meine Frühschicht übernehmen? Ich habe einen Termin beim Facharzt, den ich nicht verschieben kann." },
          { wer: "Kevin", stimme: "m", text: "Mittwoch früh geht, wenn du dafür meine Spätschicht am Freitag machst." },
          { wer: "Jana", stimme: "w", text: "Abgemacht. Ich sage der Schichtleitung Bescheid." },
        ]},
        { titel: "Gespräch 2", wiederholen: 1, sprecher: [
          { wer: "Frau Weber", stimme: "w", text: "Herr Okoro, ich wollte Ihnen nur sagen: Ihre Auswertung für die Geschäftsführung war hervorragend. Klar strukturiert und mit genau den richtigen Zahlen." },
          { wer: "Herr Okoro", stimme: "m", text: "Oh, das freut mich sehr. Ich war mir bei den Grafiken nicht ganz sicher." },
          { wer: "Frau Weber", stimme: "w", text: "Die waren gerade das Beste daran. Machen Sie weiter so." },
        ]},
        { titel: "Gespräch 3", wiederholen: 1, sprecher: [
          { wer: "Herr Lang", stimme: "m", text: "Frau Haas, ich muss leider etwas ansprechen. Ich bin mit dem Messestand im Moment völlig überlastet, und dazu noch die Monatsberichte. Wäre es möglich, dass jemand anderes die Berichte diesen Monat übernimmt?" },
          { wer: "Frau Haas", stimme: "w", text: "Ich verstehe. Ich frage Frau Morina, ob sie das übernehmen kann. Danke, dass Sie das so offen sagen." },
        ]},
        { titel: "Gespräch 4", wiederholen: 1, sprecher: [
          { wer: "Selin", stimme: "w", text: "Also, für den Tag der offenen Tür im Oktober: Was hältst du davon, wenn wir die Kunden durch die Produktion führen?" },
          { wer: "Tobias", stimme: "m", text: "Gute Idee. Dann brauchen wir aber Schutzbrillen für die Besucher und jemanden, der die Maschinen erklärt. Und danach vielleicht einen kleinen Imbiss in der Kantine." },
          { wer: "Selin", stimme: "w", text: "Prima, ich frage die Kantine nach einem Angebot." },
        ]},
      ],
      aufgaben: [
        { typ: "mc", nr: 28, hoertext: 0, fest: true, frage: "Gespräch 1", optionen: AF, loesung: "b", erklaerung: "Jana und Kevin tauschen Früh- und Spätschicht." },
        { typ: "mc", nr: 29, hoertext: 1, fest: true, frage: "Gespräch 2", optionen: AF, loesung: "d", erklaerung: "Frau Weber lobt die Auswertung von Herrn Okoro." },
        { typ: "mc", nr: 30, hoertext: 2, fest: true, frage: "Gespräch 3", optionen: AF, loesung: "a", erklaerung: "Herr Lang bittet, die Monatsberichte abgeben zu dürfen." },
        { typ: "mc", nr: 31, hoertext: 3, fest: true, frage: "Gespräch 4", optionen: AF, loesung: "f", erklaerung: "Selin und Tobias planen den Tag der offenen Tür für Kunden." },
      ],
    },

    /* ---------------- Teil 3 ---------------- */
    {
      titel: "Teil 3",
      ziel: "Eine Präsentation verstehen",
      anweisung: "Sie hören eine Präsentation bei einer Betriebsversammlung. Welche Antwort (a, b oder c) passt zu den Aufgaben 32 bis 35? Sie hören den Text einmal.",
      hoertexte: [
        { titel: "Präsentation", wiederholen: 1, sprecher: [
          { wer: "Frau Albrecht", stimme: "w", text: "Guten Morgen, liebe Kolleginnen und Kollegen. Ich möchte Ihnen heute die Ergebnisse unserer Mitarbeiterbefragung vorstellen. Zunächst einmal vielen Dank: Fast achtzig Prozent von Ihnen haben teilgenommen, das ist deutlich mehr als vor zwei Jahren. Die gute Nachricht zuerst: Die Zufriedenheit mit dem Arbeitsklima ist gestiegen, vor allem in den Teams, die regelmäßige Besprechungen eingeführt haben. Kritischer sehen viele von Ihnen die interne Kommunikation zwischen den Abteilungen. Oft erfahren Sie von wichtigen Änderungen erst sehr spät oder nur zufällig. Daraus ziehen wir eine erste Konsequenz: Ab dem nächsten Quartal erscheint jeden Monat ein kurzer Newsletter, in dem alle Abteilungen ihre wichtigsten Neuigkeiten mitteilen. Ein zweites Thema war die Arbeitszeit. Viele Eltern wünschen sich mehr Flexibilität am Nachmittag. Hier wollen wir gemeinsam mit dem Betriebsrat ein Modell entwickeln. Bevor wir etwas entscheiden, wird es dazu im Mai Workshops geben, an denen Sie freiwillig teilnehmen können. Die genauen Termine hängen ab nächster Woche am schwarzen Brett." },
        ]},
      ],
      aufgaben: [
        { typ: "mc", nr: 32, hoertext: 0, frage: "Was sagt Frau Albrecht über die Teilnahme an der Befragung?", optionen: ["Sie war höher als bei der letzten Befragung.", "Sie war ähnlich wie vor zwei Jahren.", "Nur wenige Teams haben mitgemacht."], erklaerung: "Fast achtzig Prozent – deutlich mehr als vor zwei Jahren." },
        { typ: "mc", nr: 33, hoertext: 0, frage: "Was kritisieren viele Beschäftigte?", optionen: ["Dass Informationen zwischen den Abteilungen schlecht fließen.", "Dass es zu viele Teambesprechungen gibt.", "Dass das Arbeitsklima schlechter geworden ist."], erklaerung: "Kritisiert wird die interne Kommunikation zwischen den Abteilungen." },
        { typ: "mc", nr: 34, hoertext: 0, frage: "Was wird als erste Maßnahme eingeführt?", optionen: ["Ein monatlicher Newsletter.", "Ein neues Arbeitszeitmodell.", "Eine jährliche Befragung."], erklaerung: "Ab dem nächsten Quartal erscheint jeden Monat ein Newsletter." },
        { typ: "mc", nr: 35, hoertext: 0, frage: "Wie geht es beim Thema Arbeitszeit weiter?", optionen: ["Zuerst finden Workshops statt.", "Der Betriebsrat entscheidet allein.", "Die Eltern können ab Mai früher gehen."], erklaerung: "Vor einer Entscheidung gibt es im Mai freiwillige Workshops." },
      ],
    },

    /* ---------------- Teil 4 ---------------- */
    {
      titel: "Teil 4",
      ziel: "Telefonische Mitteilungen verstehen",
      anweisung: "Sie hören fünf Nachrichten auf dem Anrufbeantworter. Zu jeder Nachricht gibt es eine Aufgabe. Welche Antwort (a, b oder c) passt? Sie hören jede Nachricht zweimal.",
      hoertexte: [
        { titel: "Nachricht 1", wiederholen: 2, sprecher: [
          { wer: "Herr Kaminski", stimme: "m", text: "Guten Tag, Kaminski von der Druckerei Hansen. Es geht um Ihre Bestellung der Broschüren. Die Druckdatei, die Sie uns geschickt haben, hat leider eine zu niedrige Auflösung. Die Bilder würden unscharf aussehen. Könnten Sie uns bitte bis morgen Mittag eine neue Datei schicken? Sonst verschiebt sich der Liefertermin um eine Woche." },
        ]},
        { titel: "Nachricht 2", wiederholen: 2, sprecher: [
          { wer: "Frau Lindholm", stimme: "w", text: "Hallo, hier ist Frau Lindholm vom Hotel Seeblick. Sie hatten für Ihre Tagung im Juni zwanzig Zimmer angefragt. Für die erste Nacht kann ich Ihnen alle zwanzig bestätigen, für die zweite Nacht leider nur fünfzehn. Ich könnte Ihnen aber die restlichen Zimmer in unserem Partnerhotel direkt nebenan reservieren. Geben Sie mir bitte Bescheid, ob das für Sie in Ordnung ist." },
        ]},
        { titel: "Nachricht 3", wiederholen: 2, sprecher: [
          { wer: "Frau Dietrich", stimme: "w", text: "Hallo, hier ist Ulrike Dietrich aus der Personalabteilung. Ich rufe wegen Ihres Antrags auf Bildungsurlaub an. Grundsätzlich ist alles in Ordnung, aber es fehlt noch die Bestätigung des Kursanbieters, dass der Kurs anerkannt ist. Sobald ich die habe, kann ich den Antrag an Ihre Vorgesetzte weitergeben. Vielen Dank." },
        ]},
        { titel: "Nachricht 4", wiederholen: 2, sprecher: [
          { wer: "Herr Ramos", stimme: "m", text: "Guten Tag, Ramos hier, Technischer Dienst. Wir hatten für morgen früh die Wartung der Klimaanlage in Ihrem Serverraum vereinbart. Unser Techniker ist leider krank geworden. Ich kann Ihnen als Ersatz Donnerstag um vierzehn Uhr oder Freitag um acht Uhr anbieten. Bitte rufen Sie mich zurück und sagen Sie mir, welcher Termin besser passt." },
        ]},
        { titel: "Nachricht 5", wiederholen: 2, sprecher: [
          { wer: "Frau Novak", stimme: "w", text: "Hallo, Ivana Novak hier. Ich bin für die Präsentation beim Kunden am Montag eingeplant, aber mein Zug ist gestrichen worden, und der nächste kommt erst am Nachmittag an. Ich kann aber per Video dazugeschaltet werden. Könntest du bitte prüfen, ob im Besprechungsraum die Kamera funktioniert? Danke dir!" },
        ]},
      ],
      aufgaben: [
        { typ: "mc", nr: 36, hoertext: 0, frage: "Was soll der Kunde der Druckerei tun?", optionen: ["Eine bessere Datei schicken.", "Die Bestellung um eine Woche verschieben.", "Andere Bilder auswählen."], erklaerung: "Er soll bis morgen Mittag eine neue Datei mit höherer Auflösung schicken." },
        { typ: "mc", nr: 37, hoertext: 1, frage: "Was bietet das Hotel an?", optionen: ["Einige Zimmer in einem anderen Hotel zu reservieren.", "Die Tagung auf eine Nacht zu verkürzen.", "Zwanzig Zimmer für beide Nächte."], erklaerung: "Für die zweite Nacht fehlen fünf Zimmer; die sollen im Partnerhotel reserviert werden." },
        { typ: "mc", nr: 38, hoertext: 2, frage: "Warum kann der Antrag noch nicht weitergegeben werden?", optionen: ["Ein Nachweis vom Kursanbieter fehlt.", "Die Vorgesetzte hat den Kurs abgelehnt.", "Der Kurs ist nicht anerkannt."], erklaerung: "Es fehlt die Bestätigung, dass der Kurs anerkannt ist." },
        { typ: "mc", nr: 39, hoertext: 3, frage: "Was ist das Ziel des Anrufs?", optionen: ["Einen neuen Termin für die Wartung zu finden.", "Die Wartung ganz abzusagen.", "Einen Defekt im Serverraum zu melden."], erklaerung: "Der Termin fällt aus; man soll einen von zwei Ersatzterminen wählen." },
        { typ: "mc", nr: 40, hoertext: 4, frage: "Worum bittet Frau Novak?", optionen: ["Die Videotechnik im Raum zu überprüfen.", "Die Präsentation auf den Nachmittag zu verschieben.", "Sie vom Bahnhof abzuholen."], erklaerung: "Sie bittet zu prüfen, ob die Kamera im Besprechungsraum funktioniert." },
      ],
    },
  ],

  /* ---------------- Hören und Schreiben: Telefonnotiz ---------------- */
  telefonnotiz: {
    titel: "Hören und Schreiben: Telefonnotiz",
    minuten: 5,
    anweisung: "Sie arbeiten im Kundenservice der Firma Bürowelt Kiel. Sie hören eine Nachricht auf dem Anrufbeantworter. Kreuzen Sie den Grund des Anrufs an und machen Sie Notizen. Sie hören die Nachricht zweimal.",
    felder: ["Grund des Anrufs", "Name", "Telefon", "Weitere Informationen", "Zu erledigen"],
    hoertext: { titel: "Nachricht", wiederholen: 2, sprecher: [
      { wer: "Herr Wieczorek", stimme: "m", text: "Guten Tag, hier spricht Marek Wieczorek von der Steuerberatung Holm und Partner. Ich buchstabiere: W – I – E – C – Z – O – R – E – K. Wir haben vor drei Tagen bei Ihnen zwölf neue Bürostühle bestellt, die Bestellnummer ist acht – vier – sieben – zwei. Geliefert wurden heute aber nur zehn Stühle, und bei zwei davon fehlen die Armlehnen. Das ist ärgerlich, weil am Montag zwei neue Kolleginnen bei uns anfangen. Bitte schicken Sie die fehlenden Stühle und die Armlehnen bis spätestens Freitag. Und rufen Sie mich bitte zurück, damit wir die Lieferzeit absprechen können. Meine Durchwahl ist null – vier – drei – eins, sechs – neun – zwei, fünf – null – acht. Vielen Dank." },
    ]},
    aufgaben: [
      { typ: "mc", nr: 41, fest: true, frage: "Grund des Anrufs", optionen: ["a Angebot", "b Bestellung/Buchung", "c Beschwerde"], loesung: "c Beschwerde", erklaerung: "Es fehlen Stühle und Armlehnen – Herr Wieczorek beschwert sich über die Lieferung." },
      { typ: "mc", nr: 42, frage: "Name", optionen: ["Wieczorek", "Wiezorek", "Wieczoreck"], erklaerung: "Buchstabiert: W – I – E – C – Z – O – R – E – K." },
      { typ: "mc", nr: 43, frage: "Telefon", optionen: ["0431 692 508", "0431 629 508", "0431 692 580"], erklaerung: "Null – vier – drei – eins, sechs – neun – zwei, fünf – null – acht." },
      { typ: "mc", nr: 44, frage: "Weitere Informationen", optionen: ["Bestellung 8472: zwei Stühle fehlen, bei zwei Stühlen fehlen Armlehnen", "Bestellung 8472: zwölf Stühle beschädigt geliefert", "Bestellung 8427: zehn Stühle zu viel geliefert"], erklaerung: "Zwölf bestellt, zehn geliefert, bei zwei fehlen die Armlehnen; Bestellnummer 8472." },
      { typ: "mc", nr: 45, frage: "Zu erledigen", optionen: ["Fehlende Stühle und Armlehnen bis Freitag schicken, Herrn Wieczorek zurückrufen", "Neue Bestellung bis Montag aufnehmen", "Zwei Stühle abholen und Geld zurücküberweisen"], erklaerung: "Er bittet um Lieferung bis Freitag und um Rückruf wegen der Lieferzeit." },
    ],
  },
};
