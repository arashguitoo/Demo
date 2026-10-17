/* DTZ Lesen – eigener Übungssatz im Prüfungsformat (alle Texte selbst geschrieben) */
const ABC = (a, b) => [`a ${a}`, `b ${b}`, "c anderes Stockwerk"];
const BUCHSTABEN = ["a", "b", "c", "d", "e", "f", "g", "h", "x"];

export default {
  id: "pr-dtz-lesen",
  titel: "DTZ Lesen",
  pruefung: "DTZ",
  fertigkeit: "lesen",
  niveau: "B1",
  minuten: 45,
  teile: [
    /* ---------------- Teil 1 ---------------- */
    {
      titel: "Teil 1",
      ziel: "Wegweiser und Verzeichnisse verstehen",
      anweisung: "Sie sind im Gesundheitszentrum am Hafen. Lesen Sie die Aufgaben 21 bis 25 und den Wegweiser. In welches Stockwerk (a, b oder c) gehen Sie? Wenn Sie die Lösung nicht finden, wählen Sie c („anderes Stockwerk“).",
      material: `<h3>Gesundheitszentrum am Hafen – Wegweiser</h3>
<table>
<tr><th>4. Stock</th><td>Psychotherapeutische Praxis Dr. Albers · Ernährungsberatung · Hörakustik Möller (Hörtests, Hörgeräte) · Verwaltung des Zentrums</td></tr>
<tr><th>3. Stock</th><td>Zahnarztpraxis Dr. Haddad · Kieferorthopädie Dr. Ito · Augenarztpraxis Dr. Brandt (Sehtest, Brillenrezepte)</td></tr>
<tr><th>2. Stock</th><td>Kinder- und Jugendarztpraxis Dr. Okafor · Hebammenpraxis „Nestwärme“ · Frauenarztpraxis Dr. Lindqvist</td></tr>
<tr><th>1. Stock</th><td>Hausarztpraxis Dr. Petersen (Allgemeinmedizin) · Labor und Blutabnahme · Physiotherapie Nord (Krankengymnastik, Massage)</td></tr>
<tr><th>Erdgeschoss</th><td>Information · Hafen-Apotheke · Sanitätshaus Kruse (Rollatoren, Rollstühle, Bandagen) · Café „Pause“</td></tr>
</table>`,
      aufgaben: [
        { typ: "mc", nr: 21, fest: true, frage: "Ihr Sohn ist sechs Jahre alt und hat seit gestern Fieber.", optionen: ABC("Erdgeschoss", "2. Stock"), loesung: "b 2. Stock", erklaerung: "Die Kinder- und Jugendarztpraxis ist im 2. Stock." },
        { typ: "mc", nr: 22, fest: true, frage: "Sie sehen nicht mehr gut und brauchen vielleicht eine Brille.", optionen: ABC("1. Stock", "4. Stock"), loesung: "c anderes Stockwerk", erklaerung: "Die Augenarztpraxis (Sehtest, Brillenrezepte) ist im 3. Stock." },
        { typ: "mc", nr: 23, fest: true, frage: "Ihr Vater hört schlecht. Er möchte einen Hörtest machen.", optionen: ABC("3. Stock", "4. Stock"), loesung: "b 4. Stock", erklaerung: "Hörakustik Möller ist im 4. Stock." },
        { typ: "mc", nr: 24, fest: true, frage: "Sie haben Rückenschmerzen. Ihr Arzt hat Ihnen Krankengymnastik aufgeschrieben.", optionen: ABC("1. Stock", "2. Stock"), loesung: "a 1. Stock", erklaerung: "Physiotherapie Nord (Krankengymnastik) ist im 1. Stock." },
        { typ: "mc", nr: 25, fest: true, frage: "Ihre Mutter kann nach einer Operation schlecht laufen und braucht einen Rollator.", optionen: ABC("1. Stock", "3. Stock"), loesung: "c anderes Stockwerk", erklaerung: "Das Sanitätshaus mit Rollatoren ist im Erdgeschoss." },
      ],
    },

    /* ---------------- Teil 2 ---------------- */
    {
      titel: "Teil 2",
      ziel: "Anzeigen Situationen zuordnen",
      anweisung: "Lesen Sie die Situationen 26 bis 30 und die Anzeigen a bis h. Welche Anzeige passt zu welcher Situation? Jede Anzeige können Sie nur einmal wählen. Für eine Situation gibt es keine passende Anzeige. Dann wählen Sie x.",
      material: `<table>
<tr><th>a</th><td><b>Offene Fahrradwerkstatt im Stadtteilhaus</b><br>Ihr Rad quietscht, die Bremse geht nicht? Bei uns reparieren Sie Ihr Fahrrad selbst – mit unserem Werkzeug und mit Hilfe von Ehrenamtlichen. Die Nutzung ist kostenlos, Ersatzteile zum Einkaufspreis. Jeden Donnerstag 15–18 Uhr.</td></tr>
<tr><th>b</th><td><b>Intensivkurs Deutsch B1</b><br>Montag bis Freitag, 8:30–12:45 Uhr. Kleine Gruppen, erfahrene Lehrkräfte, Prüfung am Ende des Kurses. Beratung und Einstufung: Sprachschule Lindenhof, Zimmer 2.</td></tr>
<tr><th>c</th><td><b>Kinderwagen abzugeben</b><br>Gut erhalten, drei Jahre alt, mit Regenschutz und Einkaufskorb. Nur Abholung. 60 Euro. Bitte ab 17 Uhr anrufen: 0176 2291034.</td></tr>
<tr><th>d</th><td><b>Neueröffnung: Babywelt am Markt</b><br>Alles für Ihr Baby: Kleidung, Betten und die neuesten Kinderwagen-Modelle ab 199 Euro. In der Eröffnungswoche 10 % auf alles!</td></tr>
<tr><th>e</th><td><b>Sprachcafé in der Stadtbücherei</b><br>Sie lernen Deutsch und möchten mehr sprechen? Kommen Sie jeden Dienstag von 18 bis 20 Uhr. Wir unterhalten uns in kleinen Gruppen über Alltagsthemen. Kostenlos, ohne Anmeldung.</td></tr>
<tr><th>f</th><td><b>PC-Hilfe vor Ort</b><br>Ihr Computer ist langsam oder startet nicht mehr? Unser Techniker kommt zu Ihnen nach Hause. Schnell und zuverlässig. Anfahrt im Stadtgebiet kostenlos.</td></tr>
<tr><th>g</th><td><b>Tierpension Wiesengrund</b><br>Sie fahren weg und Ihr Tier soll gut versorgt sein? Wir nehmen Hunde und Katzen auf – für ein Wochenende oder mehrere Wochen. Großer Auslauf, liebevolle Betreuung.</td></tr>
<tr><th>h</th><td><b>Fahrradhaus Nord</b><br>Neue und gebrauchte Fahrräder, E-Bikes und Lastenräder. Große Auswahl, Probefahrt jederzeit möglich, Ratenzahlung möglich.</td></tr>
</table>`,
      aufgaben: [
        { typ: "mc", nr: 26, fest: true, frage: "Sie bekommen bald ein Baby und suchen einen gebrauchten Kinderwagen.", optionen: BUCHSTABEN, loesung: "c", erklaerung: "Anzeige c: gebrauchter Kinderwagen für 60 Euro. In d gibt es nur neue Modelle." },
        { typ: "mc", nr: 27, fest: true, frage: "Sie arbeiten tagsüber und möchten am Abend mit anderen Deutsch sprechen.", optionen: BUCHSTABEN, loesung: "e", erklaerung: "Das Sprachcafé ist dienstags am Abend. Der Kurs in b ist am Vormittag." },
        { typ: "mc", nr: 28, fest: true, frage: "Sie möchten einen Computerkurs für Anfänger besuchen.", optionen: BUCHSTABEN, loesung: "x", erklaerung: "Keine Anzeige bietet einen Computerkurs an. In f wird nur ein Computer repariert." },
        { typ: "mc", nr: 29, fest: true, frage: "Sie fahren drei Wochen in den Urlaub. Jemand soll sich in dieser Zeit um Ihren Hund kümmern.", optionen: BUCHSTABEN, loesung: "g", erklaerung: "Die Tierpension nimmt Hunde auch für mehrere Wochen auf." },
        { typ: "mc", nr: 30, fest: true, frage: "Die Bremse an Ihrem Fahrrad ist kaputt. Sie haben wenig Geld und möchten das Rad selbst reparieren.", optionen: BUCHSTABEN, loesung: "a", erklaerung: "In der offenen Werkstatt repariert man selbst und zahlt nur die Ersatzteile. In h kauft man Fahrräder." },
      ],
    },

    /* ---------------- Teil 3 ---------------- */
    {
      titel: "Teil 3",
      ziel: "Kurze Pressetexte und Mitteilungen verstehen",
      anweisung: "Lesen Sie die Texte und die Aufgaben 31 bis 36. Entscheiden Sie bei jedem Text: Ist die Aussage richtig oder falsch? Und welche Antwort (a, b oder c) passt am besten?",
      aufgaben: [
        {
          typ: "lesen",
          titel: "Text 1: Aus der Zeitung",
          text: `<p><b>Neue Buslinie zum Gewerbegebiet Nord</b></p>
<p>Ab dem 1. März fährt die neue Buslinie 47 vom Hauptbahnhof direkt zum Gewerbegebiet Nord. Viele Beschäftigte dort arbeiten im Schichtdienst und hatten bisher am frühen Morgen und am späten Abend keine gute Verbindung. Deshalb fahren die Busse von Montag bis Freitag zwischen 5 und 23 Uhr alle 20 Minuten, am Samstag und Sonntag einmal pro Stunde.</p>
<p>Es gelten die normalen Fahrkarten. Viele Firmen im Gewerbegebiet bieten ihren Mitarbeiterinnen und Mitarbeitern außerdem ein Jobticket an. In den ersten zwei Wochen können alle Fahrgäste die Linie 47 kostenlos testen.</p>`,
          fragen: [
            { typ: "rf", nr: 31, aussage: "Am Wochenende fährt die Linie 47 nicht.", richtig: false, erklaerung: "Am Samstag und Sonntag fährt der Bus einmal pro Stunde." },
            { typ: "mc", nr: 32, frage: "In den ersten zwei Wochen …", optionen: ["kann man ohne Fahrkarte mit der Linie 47 fahren.", "gibt es das Jobticket zu einem günstigeren Preis.", "fahren die Busse alle zehn Minuten."], erklaerung: "Man kann die Linie in dieser Zeit kostenlos testen." },
          ],
        },
        {
          typ: "lesen",
          titel: "Text 2: Mitteilung der Hausverwaltung",
          text: `<p><b>Hausverwaltung Ostufer GmbH – an alle Mieterinnen und Mieter im Haus Werftstraße 12</b></p>
<p>Sehr geehrte Damen und Herren,</p>
<p>am Donnerstag, dem 14. November, werden im Keller neue Wasserleitungen eingebaut. Deshalb gibt es an diesem Tag von 8 bis 13 Uhr im ganzen Haus kein Wasser. Bitte füllen Sie vorher genug Wasser zum Trinken und Kochen ab.</p>
<p>Nach den Arbeiten kann das Wasser am Anfang braun aussehen. Das ist nicht gefährlich. Lassen Sie es bitte ein paar Minuten laufen, bis es wieder klar ist. Bei Fragen erreichen Sie unseren Hausmeister, Herrn Kowalski, unter 0431 778210.</p>
<p>Vielen Dank für Ihr Verständnis!<br>Ihre Hausverwaltung</p>`,
          fragen: [
            { typ: "rf", nr: 33, aussage: "Am Donnerstagvormittag gibt es im Haus kein Wasser.", richtig: true, erklaerung: "Von 8 bis 13 Uhr ist das Wasser abgestellt." },
            { typ: "mc", nr: 34, frage: "Was sollen die Mieter tun, wenn das Wasser nach den Arbeiten braun ist?", optionen: ["Das Wasser einige Minuten laufen lassen.", "Sofort den Hausmeister anrufen.", "Das Wasser nicht zum Kochen benutzen."], erklaerung: "Man soll es laufen lassen, bis es wieder klar ist." },
          ],
        },
        {
          typ: "lesen",
          titel: "Text 3: Aus der Zeitung",
          text: `<p><b>Stadtbücherei: länger offen und mehr Service</b></p>
<p>Die Stadtbücherei hat seit dieser Woche neue Öffnungszeiten: Von Dienstag bis Samstag ist sie jetzt bis 19 Uhr geöffnet, am Montag bleibt sie wie bisher geschlossen. Neu sind auch drei Automaten im Eingangsbereich. Dort können Leserinnen und Leser Bücher und Filme selbst ausleihen und zurückgeben, ohne an der Theke zu warten.</p>
<p>Die Preise bleiben gleich: Kinder und Jugendliche bis 18 Jahre bekommen den Bibliotheksausweis kostenlos, Erwachsene zahlen 15 Euro im Jahr. Wer einen Sozialpass hat, zahlt die Hälfte.</p>`,
          fragen: [
            { typ: "rf", nr: 35, aussage: "Kinder müssen für den Bibliotheksausweis bezahlen.", richtig: false, erklaerung: "Bis 18 Jahre ist der Ausweis kostenlos." },
            { typ: "mc", nr: 36, frage: "Was ist neu in der Stadtbücherei?", optionen: ["Man kann Bücher selbst an einem Automaten ausleihen.", "Die Bücherei ist jetzt auch montags geöffnet.", "Erwachsene zahlen weniger für den Ausweis."], erklaerung: "Im Eingangsbereich stehen drei neue Automaten." },
          ],
        },
      ],
    },

    /* ---------------- Teil 4 ---------------- */
    {
      titel: "Teil 4",
      ziel: "Eine Informationsbroschüre verstehen",
      anweisung: "Lesen Sie den Text aus einer Broschüre und die Aufgaben 37 bis 39. Sind die Aussagen richtig oder falsch?",
      aufgaben: [
        {
          typ: "lesen",
          titel: "Broschüre: Freiwilligenagentur „Mitmachen!“",
          text: `<p><b>Sie möchten sich in Ihrer Freizeit engagieren?</b> Die Freiwilligenagentur „Mitmachen!“ hilft Ihnen, eine passende Aufgabe zu finden – zum Beispiel in Sportvereinen, Seniorenheimen, Kitas oder im Umweltschutz.</p>
<p><b>Wer kann mitmachen?</b> Alle Menschen ab 16 Jahren. Für viele Aufgaben reichen einfache Deutschkenntnisse. Oft ist Ihre Muttersprache sogar eine große Hilfe, zum Beispiel beim Übersetzen für neue Familien.</p>
<p><b>Wie viel Zeit brauche ich?</b> Das entscheiden Sie selbst. Schon zwei Stunden im Monat sind willkommen.</p>
<p><b>Was kostet das?</b> Die Vermittlung ist kostenlos. Viele Organisationen bezahlen Ihnen die Fahrtkosten. Während Ihrer Tätigkeit sind Sie über die Stadt versichert.</p>
<p><b>Wie finde ich die richtige Aufgabe?</b> In einem persönlichen Gespräch beraten wir Sie gern. Termine bekommen Sie montags und mittwochs von 10 bis 16 Uhr unter 0431 905566. Am Donnerstag von 16 bis 18 Uhr haben wir eine offene Sprechstunde – dafür brauchen Sie keinen Termin.</p>`,
          fragen: [
            { typ: "rf", nr: 37, aussage: "Man muss mindestens 18 Jahre alt sein, um mitzumachen.", richtig: false, erklaerung: "Man kann schon ab 16 Jahren mitmachen." },
            { typ: "rf", nr: 38, aussage: "Am Donnerstagnachmittag kann man ohne Termin zur Beratung kommen.", richtig: true, erklaerung: "Donnerstag von 16 bis 18 Uhr ist offene Sprechstunde ohne Termin." },
            { typ: "rf", nr: 39, aussage: "Man braucht sehr gute Deutschkenntnisse.", richtig: false, erklaerung: "Für viele Aufgaben reichen einfache Deutschkenntnisse." },
          ],
        },
      ],
    },

    /* ---------------- Teil 5 ---------------- */
    {
      titel: "Teil 5",
      ziel: "Einen Brief vervollständigen",
      anweisung: "Lesen Sie den Brief. Welches Wort (a, b oder c) passt in die Lücken 40 bis 45?",
      material: `<p>Sehr geehrte Frau Albers,</p>
<p>ich besuche seit Januar den Deutschkurs B1 am Vormittag. Leider kann ich ab nächstem Monat nicht mehr <b>(40)</b> ____ Unterricht kommen, <b>(41)</b> ____ ich eine neue Arbeitsstelle gefunden habe. Ich arbeite dann von acht bis vierzehn Uhr in einer Bäckerei.</p>
<p>Ich möchte den Kurs aber gern weitermachen. Gibt es einen Kurs am Nachmittag oder am Abend, <b>(42)</b> ____ ich wechseln kann? Ich <b>(43)</b> ____ auch gern einen Kurs am Samstag besuchen. Können Sie mir bitte sagen, <b>(44)</b> ____ ich mich dafür noch einmal anmelden muss?</p>
<p>Vielen Dank <b>(45)</b> ____ Ihre Hilfe.</p>
<p>Mit freundlichen Grüßen<br>Tarek Mansour</p>`,
      aufgaben: [
        { typ: "luecke", nr: 40, fest: true, satz: "Leider kann ich ab nächstem Monat nicht mehr ___ Unterricht kommen, …", optionen: ["a zum", "b beim", "c im"], loesung: "a zum", erklaerung: "Richtung: zu + dem = zum Unterricht kommen." },
        { typ: "luecke", nr: 41, fest: true, satz: "…, ___ ich eine neue Arbeitsstelle gefunden habe.", optionen: ["a weil", "b obwohl", "c deshalb"], loesung: "a weil", erklaerung: "Ein Grund mit Verb am Ende: weil." },
        { typ: "luecke", nr: 42, fest: true, satz: "Gibt es einen Kurs am Nachmittag oder am Abend, ___ ich wechseln kann?", optionen: ["a in den", "b in dem", "c an den"], loesung: "a in den", erklaerung: "in einen Kurs wechseln (Richtung, Akkusativ) → Relativsatz: in den." },
        { typ: "luecke", nr: 43, fest: true, satz: "Ich ___ auch gern einen Kurs am Samstag besuchen.", optionen: ["a würde", "b wurde", "c hätte"], loesung: "a würde", erklaerung: "Höflicher Wunsch: würde + gern + Infinitiv." },
        { typ: "luecke", nr: 44, fest: true, satz: "Können Sie mir bitte sagen, ___ ich mich dafür noch einmal anmelden muss?", optionen: ["a ob", "b dass", "c wenn"], loesung: "a ob", erklaerung: "Indirekte Ja/Nein-Frage: ob." },
        { typ: "luecke", nr: 45, fest: true, satz: "Vielen Dank ___ Ihre Hilfe.", optionen: ["a für", "b über", "c mit"], loesung: "a für", erklaerung: "Feste Verbindung: danken für / Dank für." },
      ],
    },
  ],
};
