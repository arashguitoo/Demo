export default {
  id: "lp-b1-amt",
  titel: "Briefe vom Amt",
  niveau: "B1",
  module: [
    {
      id: "woerter",
      titel: "Wörter: Behörden und Formulare",
      fertigkeit: "wortschatz",
      aufgaben: [
        {
          typ: "paare",
          anweisung: "Was bedeutet das Wort? Tippe links und dann rechts.",
          paare: [
            ["der Antrag", "ein Formular, mit dem man etwas beantragt"],
            ["die Frist", "der letzte Tag, bis zu dem man etwas tun muss"],
            ["die Unterlagen", "die Dokumente, die man einreichen muss"],
            ["der Bescheid", "die schriftliche Entscheidung einer Behörde"],
            ["die Unterschrift", "der eigene Name, mit der Hand geschrieben"],
            ["das Aktenzeichen", "die Nummer, unter der ein Vorgang geführt wird"],
          ],
        },
        {
          typ: "luecke",
          satz: "Bitte reichen Sie die fehlenden ___ bis zum 15. März ein.",
          optionen: ["Unterlagen", "Termine", "Schalter"],
          erklaerung: "Unterlagen (Dokumente) reicht man bei einer Stelle ein.",
        },
        {
          typ: "luecke",
          satz: "Das Kindergeld beantragt man bei der ___.",
          optionen: ["Familienkasse", "Krankenkasse", "Hausverwaltung"],
          erklaerung: "Für das Kindergeld ist die Familienkasse zuständig.",
        },
        {
          typ: "mc",
          frage: "Wo meldet man nach einem Umzug die neue Adresse an?",
          optionen: ["beim Bürgeramt", "bei der Familienkasse", "bei der Krankenkasse", "beim Vermieter"],
          erklaerung: "Die Anmeldung der Wohnung macht man beim Bürgeramt.",
        },
        {
          typ: "luecke",
          satz: "Die Frist ___ am 30. April ab.",
          optionen: ["läuft", "geht", "fällt"],
          erklaerung: "Man sagt: Die Frist läuft ab – sie endet.",
        },
        {
          typ: "mc",
          frage: `Im Brief steht: „Bitte geben Sie bei Rückfragen immer Ihr Aktenzeichen an.“ Was sollen Sie tun?`,
          optionen: ["die Nummer meines Vorgangs nennen", "meine Telefonnummer nennen", "sofort einen Termin vereinbaren", "eine Kopie meines Ausweises schicken"],
          erklaerung: "Das Aktenzeichen ist die Nummer, unter der die Behörde Ihren Fall findet.",
        },
        {
          typ: "sortieren",
          anweisung: "Wer ist zuständig? Sortiere die Wörter.",
          gruppen: {
            "Bürgeramt": ["Wohnungsanmeldung", "Personalausweis", "Meldebescheinigung"],
            "Familienkasse": ["Kindergeld", "Kinderzuschlag"],
            "Krankenkasse": ["Versichertenkarte", "Krankengeld"],
            "Vermieter": ["Mietvertrag", "Nebenkostenabrechnung", "Kaution"],
          },
        },
        {
          typ: "luecke",
          satz: "Ich kann am Montag nicht kommen. Ich möchte den Termin leider ___.",
          optionen: ["verschieben", "vergeben", "verlassen"],
          erklaerung: "Einen Termin verschiebt man auf einen anderen Tag.",
        },
        {
          typ: "paare",
          anweisung: "Welches Verb passt? Tippe links und dann rechts.",
          paare: [
            ["ein Formular", "ausfüllen"],
            ["einen Termin", "vereinbaren"],
            ["eine Frist", "verlängern"],
            ["Widerspruch", "einlegen"],
            ["die Miete", "überweisen"],
            ["die Wohnung", "anmelden"],
          ],
        },
        {
          typ: "luecke",
          satz: "Dieses Schreiben wurde maschinell erstellt und ist ohne ___ gültig.",
          optionen: ["Unterschrift", "Antrag", "Frist"],
          erklaerung: "Viele Briefe vom Amt sind ohne Unterschrift gültig, weil ein Computer sie erstellt.",
        },
        {
          typ: "mc",
          frage: "Was ist eine Meldebescheinigung?",
          optionen: ["ein Dokument, das zeigt, wo man wohnt", "ein Brief vom Arbeitgeber", "eine Rechnung der Krankenkasse", "ein Formular für das Kindergeld"],
          erklaerung: "Die Meldebescheinigung bekommt man beim Bürgeramt nach der Anmeldung.",
        },
        {
          typ: "luecke",
          satz: "Leider kann ich am 5. Mai nicht kommen. Können Sie mir einen ___ vorschlagen?",
          optionen: ["Ersatztermin", "Bescheid", "Antrag"],
          erklaerung: "Ein Ersatztermin ist ein neuer Termin statt des alten.",
        },
      ],
    },
    {
      id: "konnektoren",
      titel: "weil, obwohl, deshalb, trotzdem",
      fertigkeit: "grammatik",
      aufgaben: [
        {
          typ: "info",
          titel: "Sätze verbinden: Wo steht das Verb?",
          html: `<p><b>weil</b> (Grund) und <b>obwohl</b> (Gegensatz) leiten einen Nebensatz ein: Das Verb steht <b>am Ende</b>.</p>
<p><b>deshalb</b> (Folge) und <b>trotzdem</b> (Gegensatz) stehen im Hauptsatz auf Position 1: Das Verb kommt <b>direkt danach</b>.</p>
<table>
<tr><th>Wort</th><th>Bedeutung</th><th>Verbstellung</th><th>Beispiel</th></tr>
<tr><td>weil</td><td>Grund</td><td>Verb am Ende</td><td>Ich rufe an, <b>weil</b> ich krank <b>bin</b>.</td></tr>
<tr><td>obwohl</td><td>Gegensatz</td><td>Verb am Ende</td><td>Ich komme, <b>obwohl</b> ich krank <b>bin</b>.</td></tr>
<tr><td>deshalb</td><td>Folge</td><td>Verb auf Position 2</td><td>Ich bin krank, <b>deshalb bleibe</b> ich zu Hause.</td></tr>
<tr><td>trotzdem</td><td>Gegensatz</td><td>Verb auf Position 2</td><td>Ich bin krank, <b>trotzdem komme</b> ich.</td></tr>
</table>
<p>Steht der Nebensatz vorne, beginnt der Hauptsatz mit dem Verb: <b>Weil ich krank bin, bleibe ich</b> zu Hause.</p>`,
        },
        {
          typ: "satzbau",
          woerter: ["Ich", "kann", "nicht kommen,", "weil", "ich", "krank", "bin."],
          alternativen: ["Weil ich krank bin, kann ich nicht kommen.", "Ich kann, weil ich krank bin, nicht kommen."],
          hinweis: "Im weil-Satz steht das Verb am Ende.",
          erklaerung: "weil + Verb am Ende: … weil ich krank bin.",
        },
        {
          typ: "satzbau",
          woerter: ["Obwohl", "die Frist", "abgelaufen", "ist,", "bearbeitet", "die Behörde", "den Antrag."],
          alternativen: [
            "Die Behörde bearbeitet den Antrag, obwohl die Frist abgelaufen ist.",
            "Den Antrag bearbeitet die Behörde, obwohl die Frist abgelaufen ist.",
            "Die Behörde bearbeitet, obwohl die Frist abgelaufen ist, den Antrag.",
          ],
          erklaerung: "Nach dem obwohl-Satz kommt im Hauptsatz zuerst das Verb.",
        },
        {
          typ: "satzbau",
          woerter: ["Ich", "habe", "den Brief", "nicht verstanden,", "deshalb", "rufe", "ich", "an."],
          alternativen: [
            "Ich habe den Brief nicht verstanden, ich rufe deshalb an.",
            "Den Brief habe ich nicht verstanden, deshalb rufe ich an.",
            "Den Brief habe ich nicht verstanden, ich rufe deshalb an.",
          ],
          erklaerung: "deshalb auf Position 1, dann das Verb: deshalb rufe ich an.",
        },
        {
          typ: "satzbau",
          woerter: ["Der Termin", "war", "sehr früh,", "trotzdem", "war", "ich", "pünktlich."],
          alternativen: [
            "Der Termin war sehr früh, ich war trotzdem pünktlich.",
            "Sehr früh war der Termin, trotzdem war ich pünktlich.",
            "Sehr früh war der Termin, ich war trotzdem pünktlich.",
          ],
          erklaerung: "trotzdem auf Position 1, dann das Verb: trotzdem war ich pünktlich.",
        },
        {
          typ: "luecke",
          satz: "Ich schicke Ihnen die Kopie heute, ___ Sie sie bis Freitag brauchen.",
          optionen: ["weil", "deshalb", "trotzdem"],
          erklaerung: "Das Verb (brauchen) steht am Ende – das passt nur zu weil.",
        },
        {
          typ: "luecke",
          satz: "Die Familienkasse hat noch nicht geantwortet. ___ rufe ich morgen dort an.",
          optionen: ["Deshalb", "Weil", "Obwohl"],
          erklaerung: "Das Verb (rufe) kommt direkt danach, und es ist eine Folge: deshalb.",
        },
        {
          typ: "luecke",
          satz: "___ ich alle Unterlagen eingereicht habe, ist mein Antrag noch nicht bearbeitet.",
          optionen: ["Obwohl", "Weil", "Trotzdem"],
          erklaerung: "Gegensatz und Verb am Ende (habe): obwohl.",
        },
        {
          typ: "luecke",
          satz: "Ich habe den Vermieter schon zweimal angerufen. ___ ist die Heizung noch kaputt.",
          optionen: ["Trotzdem", "Deshalb", "Obwohl"],
          erklaerung: "Gegensatz, und das Verb (ist) folgt direkt: trotzdem.",
        },
        {
          typ: "mc",
          frage: "Welcher Satz ist richtig?",
          optionen: [
            "Ich bleibe zu Hause, weil mein Kind krank ist.",
            "Ich bleibe zu Hause, weil mein Kind ist krank.",
            "Ich bleibe zu Hause, deshalb mein Kind ist krank.",
            "Weil mein Kind krank ist, ich bleibe zu Hause.",
          ],
          erklaerung: "Im weil-Satz steht das Verb am Ende; danach beginnt der Hauptsatz mit dem Verb.",
        },
        {
          typ: "mc",
          frage: "Welcher Satz ist richtig?",
          optionen: [
            "Der Bus kam zu spät, trotzdem war ich pünktlich beim Termin.",
            "Der Bus kam zu spät, trotzdem ich war pünktlich beim Termin.",
            "Obwohl der Bus kam zu spät, war ich pünktlich beim Termin.",
            "Der Bus kam zu spät, obwohl war ich pünktlich beim Termin.",
          ],
          erklaerung: "Nach trotzdem kommt sofort das Verb: trotzdem war ich …",
        },
      ],
    },
    {
      id: "brief",
      titel: "Lesen: Ein Brief vom Amt",
      fertigkeit: "lesen",
      aufgaben: [
        {
          typ: "lesen",
          titel: "Brief der Familienkasse",
          text: `<p><b>Familienkasse</b><br>Kiel, 20.10.2026<br>Aktenzeichen: FK-2026-48173</p>
<p><b>Kindergeld für Ihre Tochter Leyla Haddad</b></p>
<p>Sehr geehrte Frau Haddad,</p>
<p>Ihre Tochter Leyla ist im Mai 18 Jahre alt geworden. Für Kinder über 18 Jahre zahlen wir Kindergeld nur, wenn sie zum Beispiel eine Ausbildung machen oder studieren.</p>
<p>Sie haben uns mitgeteilt, dass Leyla seit dem 1. August eine Ausbildung zur Kauffrau im Einzelhandel macht. Damit wir Ihren Anspruch prüfen können, benötigen wir noch folgende Unterlagen:</p>
<ul><li>eine Kopie des Ausbildungsvertrags</li><li>das ausgefüllte und unterschriebene Formular „Erklärung zum Kindergeldanspruch“ (liegt diesem Brief bei)</li></ul>
<p>Bitte reichen Sie die Unterlagen bis zum <b>14. November 2026</b> ein. Sie können sie per Post schicken oder online über unser Kundenportal hochladen. Geben Sie dabei immer das oben genannte Aktenzeichen an.</p>
<p>Wenn wir die Unterlagen bis zu diesem Datum nicht erhalten, müssen wir die Zahlung des Kindergeldes ab Dezember einstellen.</p>
<p>Bei Fragen erreichen Sie uns telefonisch montags bis freitags von 8 bis 18 Uhr.</p>
<p>Mit freundlichen Grüßen<br>Ihre Familienkasse</p>
<p><i>Dieses Schreiben wurde maschinell erstellt und ist ohne Unterschrift gültig.</i></p>`,
          fragen: [
            {
              typ: "mc",
              frage: "Warum schreibt die Familienkasse an Frau Haddad?",
              optionen: [
                "Leyla ist 18 geworden, und es fehlen noch Unterlagen.",
                "Frau Haddad ist umgezogen.",
                "Leyla hat ihre Ausbildung beendet.",
                "Das Kindergeld wird erhöht.",
              ],
              erklaerung: "Für Kinder über 18 braucht die Familienkasse einen Nachweis über die Ausbildung.",
            },
            {
              typ: "rf",
              aussage: "Frau Haddad muss das Formular selbst im Internet suchen.",
              richtig: false,
              erklaerung: "Das Formular liegt dem Brief bei.",
            },
            {
              typ: "mc",
              frage: "Bis wann muss Frau Haddad die Unterlagen einreichen?",
              optionen: ["bis zum 14. November", "bis zum 1. August", "bis Ende Dezember", "bis zum 20. Oktober"],
              erklaerung: "Im Brief steht: bis zum 14. November 2026.",
            },
            {
              typ: "rf",
              aussage: "Frau Haddad kann die Unterlagen auch online hochladen.",
              richtig: true,
              erklaerung: "Sie kann sie per Post schicken oder über das Kundenportal hochladen.",
            },
            {
              typ: "mc",
              frage: "Was passiert, wenn die Unterlagen zu spät ankommen?",
              optionen: [
                "Ab Dezember wird kein Kindergeld mehr gezahlt.",
                "Frau Haddad muss eine Gebühr bezahlen.",
                "Leyla verliert ihren Ausbildungsplatz.",
                "Die Familienkasse schickt einen Mitarbeiter vorbei.",
              ],
              erklaerung: "Die Familienkasse stellt dann die Zahlung ab Dezember ein.",
            },
          ],
        },
        {
          typ: "lesen",
          titel: "Mitteilung der Hausverwaltung",
          text: `<p><b>An alle Mieterinnen und Mieter der Holtenauer Straße 52</b></p>
<p>Am Donnerstag, dem 6. November, werden zwischen 8 und 12 Uhr in allen Wohnungen die Rauchmelder geprüft. Bitte sorgen Sie dafür, dass die Techniker in Ihre Wohnung kommen können.</p>
<p>Wenn Sie an diesem Vormittag nicht zu Hause sind, können Sie Ihren Schlüssel bei Nachbarn abgeben. Ist das nicht möglich, rufen Sie uns bitte bis zum 3. November an. Wir vereinbaren dann einen Ersatztermin mit Ihnen.</p>
<p>Vielen Dank!<br>Ihre Hausverwaltung Petersen</p>`,
          fragen: [
            {
              typ: "mc",
              frage: "Was passiert am 6. November?",
              optionen: ["Die Rauchmelder werden geprüft.", "Die Heizung wird repariert.", "Die Schlösser werden ausgetauscht."],
            },
            {
              typ: "rf",
              aussage: "Man muss am 6. November den ganzen Tag zu Hause bleiben.",
              richtig: false,
              erklaerung: "Die Prüfung ist nur zwischen 8 und 12 Uhr.",
            },
            {
              typ: "mc",
              frage: "Was soll man tun, wenn man nicht zu Hause ist und den Schlüssel nicht abgeben kann?",
              optionen: [
                "bis zum 3. November bei der Hausverwaltung anrufen",
                "einen Zettel an die Wohnungstür hängen",
                "nichts – die Techniker kommen einfach später wieder",
              ],
              erklaerung: "Dann vereinbart die Hausverwaltung einen Ersatztermin.",
            },
          ],
        },
      ],
    },
    {
      id: "antworten",
      titel: "Formell antworten",
      fertigkeit: "schreiben",
      aufgaben: [
        {
          typ: "paare",
          anweisung: "Formell und informell: Was bedeutet ungefähr dasselbe?",
          paare: [
            ["Sehr geehrte Damen und Herren,", "Hallo zusammen,"],
            ["Mit freundlichen Grüßen", "Liebe Grüße"],
            ["Könnten Sie mir bitte helfen?", "Kannst du mir mal helfen?"],
            ["Leider ist es mir nicht möglich zu kommen.", "Ich kann leider nicht."],
            ["Im Anhang finden Sie die Kopie.", "Ich schick dir die Kopie mit."],
            ["Ich bitte um Entschuldigung.", "Sorry!"],
          ],
        },
        {
          typ: "paare",
          anweisung: "Was wollen Sie sagen? Ordnen Sie den passenden Satz zu.",
          paare: [
            ["auf einen Brief Bezug nehmen", "Ich beziehe mich auf Ihr Schreiben vom 3. März."],
            ["einen Termin verschieben", "Könnten wir den Termin auf einen anderen Tag verlegen?"],
            ["Unterlagen nachreichen", "Die fehlende Bescheinigung reiche ich bis Freitag nach."],
            ["sich entschuldigen", "Bitte entschuldigen Sie die späte Antwort."],
            ["höflich um etwas bitten", "Ich wäre Ihnen dankbar, wenn Sie mir das Formular schicken könnten."],
            ["etwas nachfragen", "Könnten Sie mir bitte erklären, was Sie damit meinen?"],
          ],
        },
        {
          typ: "luecke",
          satz: "Sehr geehrte Damen und Herren, ich ___ mich auf Ihr Schreiben vom 12. Oktober.",
          optionen: ["beziehe", "frage", "wende"],
          erklaerung: "Die feste Wendung heißt: sich auf etwas beziehen.",
        },
        {
          typ: "luecke",
          satz: "Im ___ finden Sie die Kopie meines Mietvertrags.",
          optionen: ["Anhang", "Anfang", "Antrag"],
          erklaerung: "Dateien, die man mit einer E-Mail schickt, sind im Anhang.",
        },
        {
          typ: "luecke",
          satz: "Leider kann ich den Termin am 5. Mai nicht ___.",
          optionen: ["wahrnehmen", "übernehmen", "aufnehmen"],
          erklaerung: "Formell sagt man: einen Termin wahrnehmen (= hingehen).",
        },
        {
          typ: "luecke",
          satz: "Ich wäre Ihnen sehr dankbar, wenn Sie mir einen neuen Termin ___ könnten.",
          optionen: ["vorschlagen", "vorschlägt", "vorgeschlagen"],
          erklaerung: "Mit dem Modalverb könnten steht der Infinitiv: vorschlagen könnten.",
        },
        {
          typ: "satzbau",
          woerter: ["Bitte", "entschuldigen", "Sie", "die späte Antwort."],
          alternativen: ["Entschuldigen Sie bitte die späte Antwort.", "Entschuldigen Sie die späte Antwort bitte."],
        },
        {
          typ: "satzbau",
          woerter: ["Die fehlenden Unterlagen", "reiche", "ich", "bis Freitag", "nach."],
          alternativen: [
            "Ich reiche die fehlenden Unterlagen bis Freitag nach.",
            "Ich reiche bis Freitag die fehlenden Unterlagen nach.",
            "Bis Freitag reiche ich die fehlenden Unterlagen nach.",
          ],
          hinweis: "nachreichen ist trennbar: nach steht am Ende.",
        },
        {
          typ: "mc",
          frage: "Was passt in einer formellen E-Mail?",
          optionen: ["Mit freundlichen Grüßen", "Viele Küsse", "Bis dann!", "Tschüss"],
          erklaerung: "Mit freundlichen Grüßen ist der Standardgruß in formellen Briefen und E-Mails.",
        },
        {
          typ: "mc",
          frage: "Was passt in einer formellen E-Mail an die Krankenkasse?",
          optionen: [
            "Könnten Sie mir bitte mitteilen, welche Unterlagen noch fehlen?",
            "Was fehlt denn noch?",
            "Schick mir mal die Liste!",
            "Sag mal, was brauchst du noch?",
          ],
          erklaerung: "Formell: Sie, Konjunktiv (könnten) und bitte.",
        },
      ],
    },
    {
      id: "test",
      titel: "Abschlusstest",
      fertigkeit: "grammatik",
      aufgaben: [
        {
          typ: "luecke",
          satz: "Ich rufe Sie an, ___ ich eine Frage zu meinem Bescheid habe.",
          optionen: ["weil", "deshalb", "trotzdem"],
          erklaerung: "Grund mit Verb am Ende (habe): weil.",
        },
        {
          typ: "luecke",
          satz: "Das Formular war kompliziert. ___ habe ich es allein ausgefüllt.",
          optionen: ["Trotzdem", "Deshalb", "Weil"],
          erklaerung: "Gegensatz, Verb direkt danach: trotzdem.",
        },
        {
          typ: "luecke",
          satz: "Ich war zwei Wochen im Urlaub. ___ antworte ich erst heute.",
          optionen: ["Deshalb", "Trotzdem", "Obwohl"],
          erklaerung: "Folge, Verb direkt danach: deshalb.",
        },
        {
          typ: "luecke",
          satz: "___ ich pünktlich war, musste ich lange warten.",
          optionen: ["Obwohl", "Weil", "Deshalb"],
          erklaerung: "Gegensatz mit Verb am Ende (war): obwohl.",
        },
        {
          typ: "luecke",
          satz: "Ich kann nicht kommen, weil mein Sohn heute einen Arzttermin ___.",
          optionen: ["hat", "haben", "habe"],
          erklaerung: "Im weil-Satz steht das konjugierte Verb am Ende: mein Sohn … hat.",
        },
        {
          typ: "mc",
          frage: "Welcher Satz ist richtig?",
          optionen: [
            "Deshalb schicke ich Ihnen die Kopie noch einmal.",
            "Deshalb ich schicke Ihnen die Kopie noch einmal.",
            "Ich deshalb schicke Ihnen die Kopie noch einmal.",
            "Deshalb schicken ich Ihnen die Kopie noch einmal.",
          ],
          erklaerung: "deshalb auf Position 1, dann das Verb, dann das Subjekt.",
        },
        {
          typ: "satzbau",
          woerter: ["Ich", "antworte", "erst heute,", "weil", "ich", "krank", "war."],
          alternativen: [
            "Weil ich krank war, antworte ich erst heute.",
            "Erst heute antworte ich, weil ich krank war.",
            "Ich antworte, weil ich krank war, erst heute.",
          ],
          erklaerung: "Im weil-Satz steht das Verb (war) am Ende.",
        },
        {
          typ: "luecke",
          satz: "Bitte reichen Sie die Unterlagen ___ zum 30. November ein.",
          optionen: ["bis", "ab", "seit"],
          erklaerung: "Für eine Frist sagt man: bis zum …",
        },
        {
          typ: "luecke",
          satz: "Ich beziehe mich ___ Ihr Schreiben vom 2. Juni.",
          optionen: ["auf", "an", "für"],
          erklaerung: "sich beziehen auf + Akkusativ.",
        },
        {
          typ: "mc",
          frage: `Was bedeutet: „Die Frist endet am 1. Dezember“?`,
          optionen: [
            "Man muss bis zum 1. Dezember reagieren.",
            "Man muss erst ab dem 1. Dezember reagieren.",
            "Am 1. Dezember ist das Amt geschlossen.",
            "Am 1. Dezember bekommt man einen Termin.",
          ],
          erklaerung: "Die Frist endet = der letzte Tag ist der 1. Dezember.",
        },
        {
          typ: "luecke",
          satz: "Ich bitte Sie, den Termin auf nächste Woche zu ___.",
          optionen: ["verschieben", "verschiebe", "verschoben"],
          erklaerung: "Nach zu steht der Infinitiv: zu verschieben.",
        },
        {
          typ: "mc",
          frage: "Welcher Satz passt in einen formellen Brief?",
          optionen: [
            "Ich wäre Ihnen dankbar, wenn Sie mir bald antworten könnten.",
            "Antworte mir bitte schnell!",
            "Schreib mal zurück.",
            "Ich will schnell eine Antwort.",
          ],
          erklaerung: "Formelle Bitten: Sie + Konjunktiv (wäre, könnten).",
        },
      ],
    },
  ],
};
